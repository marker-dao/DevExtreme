/**
 * Enforces the optional-field typing convention for public `.d.ts` files: a
 * property's JSDoc `@default` tag must agree with the shape of its TypeScript
 * type. Three checks (R3/R4/R5 are intentionally not enforced by lint — they
 * need runtime/semantic judgment and are handled at code review):
 *
 *   R1 — `@default null` requires `null` in the type.
 *   R2 — a concrete `@default` (not null/undefined) forbids `| undefined` in the
 *        type (an option with a real default never holds `undefined`).
 *   R6 — `@default undefined` requires `| undefined` in the type (the Angular
 *        wrapper generator drops `?`, so the unset state must be explicit).
 *
 * Purely syntactic: it inspects the TSESTree type node and the leading JSDoc
 * comment, so it needs no type information and runs per file.
 */

/**
 * Reads the `@default` value from the property's nearest leading JSDoc block.
 * Returns the raw token (e.g. `null`, `undefined`, `false`, `{}`), or `null`
 * when that block has no `@default` tag.
 */
function readDefaultToken(node, sourceCode) {
    const comments = sourceCode.getCommentsBefore(node);
    for(let i = comments.length - 1; i >= 0; i -= 1) {
        if(comments[i].type === 'Block') {
            const match = /@default\s+(\S+)/.exec(comments[i].value);
            return match ? match[1] : null;
        }
    }
    return null;
}

/** Classifies a `@default` token: `none` (absent), `null`, `undefined`, or `concrete`. */
function classifyDefault(token) {
    if(token === null) {
        return 'none';
    }
    if(token === 'null' || token === 'undefined') {
        return token;
    }
    return 'concrete';
}

/** Top-level members of a (possibly union) type — never descends into nested object literals. */
function getTopLevelMembers(typeNode) {
    return typeNode.type === 'TSUnionType' ? typeNode.types : [typeNode];
}

function hasNullMember(typeNode) {
    return getTopLevelMembers(typeNode).some((member) => member.type === 'TSNullKeyword');
}

function hasUndefinedMember(typeNode) {
    return getTopLevelMembers(typeNode).some((member) => member.type === 'TSUndefinedKeyword');
}

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Keep a property\'s JSDoc @default consistent with the shape of its type',
            recommended: false,
        },
        schema: [],
        messages: {
            defaultNullNeedsNull: '`@default null` is set, but the type has no `null`. Add `| null` to the type, or correct the @default.',
            concreteDefaultNoUndefined: '`@default {{value}}` is concrete, but the type includes `| undefined`. Remove `| undefined` — an option with a real default never holds `undefined`.',
            defaultUndefinedNeedsUndefined: '`@default undefined` is set, but the type has no `| undefined`. Either add `| undefined` (the value is genuinely unset by default — the wrapper generator drops `?`), or correct `@default` to the real stored value (e.g. `{}` for an always-present object option).',
        },
    },
    create(context) {
        const sourceCode = context.sourceCode ?? context.getSourceCode();

        return {
            TSPropertySignature(node) {
                const typeNode = node.typeAnnotation && node.typeAnnotation.typeAnnotation;
                if(!typeNode) {
                    return;
                }

                const token = readDefaultToken(node, sourceCode);
                const kind = classifyDefault(token);

                if(kind === 'null' && !hasNullMember(typeNode)) {
                    context.report({ node: node.key, messageId: 'defaultNullNeedsNull' });
                }

                if(kind === 'concrete' && hasUndefinedMember(typeNode)) {
                    context.report({
                        node: node.key,
                        messageId: 'concreteDefaultNoUndefined',
                        data: { value: token },
                    });
                }

                if(kind === 'undefined' && !hasUndefinedMember(typeNode)) {
                    context.report({ node: node.key, messageId: 'defaultUndefinedNeedsUndefined' });
                }
            },
        };
    },
};
