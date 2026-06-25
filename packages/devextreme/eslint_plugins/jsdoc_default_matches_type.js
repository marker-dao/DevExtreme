/**
 * Enforces the optional-field typing convention for public `.d.ts` files: a
 * property's JSDoc `@default` tag must agree with the shape of its TypeScript
 * type. Four checks (R3 and R5 are intentionally not enforced by lint):
 *
 *   R1 — `@default null` requires `null` in the type.
 *   R2 — a concrete `@default` (not null/undefined) forbids `| undefined` in the
 *        type (an option with a real default never holds `undefined`).
 *   R4 — an object-valued option declared inside a `*Options` interface must
 *        carry a `@default` (mirroring the value stored in `defaultOptions`).
 *   R6 — `@default undefined` requires `| undefined` in the type (the Angular
 *        wrapper generator drops `?`, so the unset state must be explicit).
 *
 * Purely syntactic: it inspects the TSESTree type node and the leading JSDoc
 * comment, so it needs no type information and runs per file.
 */

const OPTIONS_TYPE_NAME = /(Properties|Options|Base)$/;
// Utility types whose object-ness follows their first type argument
// (`Omit<XProperties, …>`, `Partial<{ … }>`, …).
const PASSTHROUGH_UTILITY = /^(Omit|Pick|Partial|Required|Readonly)$/;

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

/** Returns the rightmost identifier of a type reference name. */
function getTypeReferenceName(typeName) {
    if(typeName.type === 'Identifier') {
        return typeName.name;
    }
    if(typeName.type === 'TSQualifiedName') {
        return typeName.right.name;
    }
    return '';
}

/** First type argument of a type reference, across @typescript-eslint versions. */
function getFirstTypeArgument(typeRefNode) {
    const args = typeRefNode.typeArguments || typeRefNode.typeParameters;
    return args && args.params && args.params[0];
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

/**
 * Whether a single type node is object-valued: an inline object literal, a
 * `*Properties`/`*Options`/`*Base` reference, `Record<…>`, or a pass-through
 * utility (`Omit`/`Pick`/`Partial`/`Required`/`Readonly`) whose first argument
 * is itself object-valued (e.g. `Omit<FileUploaderProperties, 'value'>`).
 */
function isObjectMember(member) {
    if(member.type === 'TSTypeLiteral') {
        return true;
    }
    if(member.type !== 'TSTypeReference') {
        return false;
    }
    const name = getTypeReferenceName(member.typeName);
    if(OPTIONS_TYPE_NAME.test(name) || name === 'Record') {
        return true;
    }
    if(PASSTHROUGH_UTILITY.test(name)) {
        const arg = getFirstTypeArgument(member);
        return !!arg && isObjectMember(arg);
    }
    return false;
}

/**
 * An object-valued option: every top-level member (after dropping `null`/`undefined`)
 * is an inline object type or a `*Properties`/`*Options`/`*Base` reference. Looks
 * through unions, so `PopupProperties | undefined` and `{ ... } | null` count too.
 */
function isObjectOptionType(typeNode) {
    const members = getTopLevelMembers(typeNode).filter(
        (member) => member.type !== 'TSNullKeyword' && member.type !== 'TSUndefinedKeyword',
    );
    return members.length > 0 && members.every(isObjectMember);
}

function isOptionsInterface(interfaceNode) {
    if(OPTIONS_TYPE_NAME.test(interfaceNode.id.name)) {
        return true;
    }
    const heritage = interfaceNode.extends || [];
    return heritage.some((clause) => clause.expression.type === 'Identifier'
        && OPTIONS_TYPE_NAME.test(clause.expression.name));
}

/** Whether the property is declared (at any depth) inside a component `*Options` interface. */
function isInsideOptionsInterface(node) {
    for(let current = node.parent; current; current = current.parent) {
        if(current.type === 'TSInterfaceDeclaration') {
            return isOptionsInterface(current);
        }
    }
    return false;
}

function getPropertyName(node) {
    if(node.key.type === 'Identifier') {
        return node.key.name;
    }
    if(node.key.type === 'Literal') {
        return String(node.key.value);
    }
    return 'property';
}

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Keep a property\'s JSDoc @default consistent with the shape of its type',
            recommended: false,
        },
        schema: [
            {
                type: 'object',
                properties: {
                    // Toggles R4 (object option must declare @default). On by default.
                    requireObjectOptionDefault: { type: 'boolean' },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            defaultNullNeedsNull: '`@default null` is set, but the type has no `null`. Add `| null` to the type, or correct the @default.',
            concreteDefaultNoUndefined: '`@default {{value}}` is concrete, but the type includes `| undefined`. Remove `| undefined` — an option with a real default never holds `undefined`.',
            defaultUndefinedNeedsUndefined: '`@default undefined` is set, but the type has no `| undefined`. Either add `| undefined` (the value is genuinely unset by default — the wrapper generator drops `?`), or correct `@default` to the real stored value (e.g. `{}` for an always-present object option).',
            objectOptionNeedsDefault: 'Object-valued option `{{name}}` has no `@default`. Add one mirroring the `defaultOptions` seed (`{}` if the seed is empty).',
        },
    },
    create(context) {
        const sourceCode = context.sourceCode ?? context.getSourceCode();
        const options = (context.options && context.options[0]) || {};
        const requireObjectOptionDefault = options.requireObjectOptionDefault !== false;

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

                if(
                    kind === 'none'
                    && requireObjectOptionDefault
                    && isObjectOptionType(typeNode)
                    && isInsideOptionsInterface(node)
                ) {
                    context.report({
                        node: node.key,
                        messageId: 'objectOptionNeedsDefault',
                        data: { name: getPropertyName(node) },
                    });
                }
            },
        };
    },
};
