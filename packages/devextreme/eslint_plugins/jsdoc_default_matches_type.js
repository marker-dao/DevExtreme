/**
 * Enforces the optional-field typing convention for public `.d.ts` files
 * (see docs/UNDEFINED_NULL_CONVENTION.md). The rule checks that a property's
 * JSDoc `@default` tag agrees with the shape of its TypeScript type:
 *
 *   R1 — `@default null`      requires `null` in the type.
 *   R2 — a concrete `@default` (not null/undefined) forbids `| undefined`
 *        in the type (an option with a real default never holds `undefined`).
 *   R6 — `@default undefined` requires `| undefined` in the type (the Angular
 *        wrapper generator drops `?`, so the unset state must be explicit).
 *   R4 — an object-valued option declared inside a `*Options` interface must
 *        carry a `@default` (mirroring its `defaultOptions` seed).
 *
 * The rule is purely syntactic: it inspects the TSESTree type node and the
 * leading JSDoc comment, so it needs no type information and runs per file.
 *
 * Out of scope (kept in the burn-down script docs/check-default-type.js, which
 * has cross-file/runtime context): R3 (concrete default + `null` — the
 * check_box tri-state exception) and R5 (literal-union without `@default`,
 * a noisy review heuristic that needs cross-file alias resolution).
 */

const OPTIONS_TYPE_NAME = /(Properties|Options|Base)$/;

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

/** An object-valued option: an inline object type or a reference to a `*Properties`/`*Options`/`*Base` type. */
function isObjectOptionType(typeNode) {
    if(typeNode.type === 'TSTypeLiteral') {
        return true;
    }
    if(typeNode.type === 'TSTypeReference') {
        return OPTIONS_TYPE_NAME.test(getTypeReferenceName(typeNode.typeName));
    }
    return false;
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

/**
 * Reads the `@default` value from the property's own JSDoc block.
 * Returns the raw token (e.g. `null`, `undefined`, `false`, `{}`), or `null`
 * when the nearest leading block comment has no `@default` tag.
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

function classifyDefault(token) {
    if(token === null) {
        return 'none';
    }
    if(token === 'null' || token === 'undefined') {
        return token;
    }
    return 'concrete';
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
            description: 'Keep a property\'s JSDoc @default consistent with the shape of its type (see docs/UNDEFINED_NULL_CONVENTION.md)',
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
            defaultUndefinedNeedsUndefined: '`@default undefined` is set, but the type has no `| undefined`. Add `| undefined` (the wrapper generator drops `?`, so the unset state must be explicit).',
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

                if(kind === 'undefined' && !hasUndefinedMember(typeNode) && !isObjectOptionType(typeNode)) {
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
