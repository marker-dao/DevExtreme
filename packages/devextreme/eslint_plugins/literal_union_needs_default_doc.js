/**
 * R5 (review) of the optional-field convention (docs/UNDEFINED_NULL_CONVENTION.md).
 *
 * Flags an optional property whose type is a fixed-value literal union
 * (e.g. `'text' | 'image'`, including via a cross-file alias like `MessageType`)
 * but that has NO `@default` JSDoc tag. Such a field very likely has a default
 * behaviour on omission; under principle P2 that behaviour belongs in the type's
 * prose description ("If not specified, …") rather than in a `@default` tag.
 *
 * This is a REVIEW heuristic, not a hard rule — it is intentionally noisy
 * (also matches enum-like constants that legitimately have no default), so it
 * runs at `warn` to surface candidates, never to block.
 *
 * Type-aware: it resolves the property type through the TypeChecker, so it
 * needs `parserOptions.project` (already set for `.d.ts` in this repo). Without
 * type information it bails out and reports nothing.
 */

const {
    readDefaultToken,
    classifyDefault,
    isLiteralUnionType,
    getTypeAwareServices,
} = require('./annotation_core');

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Flag fixed-value (literal-union) optional fields that have no documented default (see docs/UNDEFINED_NULL_CONVENTION.md, R5)',
            recommended: false,
        },
        schema: [],
        messages: {
            literalUnionNeedsDoc: 'Fixed-value field `{{name}}` (a literal union) has no `@default`. If it has a default behaviour on omission, document it in the type description ("If not specified, …").',
        },
    },
    create(context) {
        const services = getTypeAwareServices(context);
        if(!services) {
            return {};
        }

        const sourceCode = context.sourceCode ?? context.getSourceCode();
        const checker = services.program.getTypeChecker();

        return {
            TSPropertySignature(node) {
                const typeNode = node.typeAnnotation && node.typeAnnotation.typeAnnotation;
                if(!typeNode) {
                    return;
                }
                if(classifyDefault(readDefaultToken(node, sourceCode)) !== 'none') {
                    return;
                }

                const tsNode = services.esTreeNodeToTSNodeMap.get(typeNode);
                if(!tsNode) {
                    return;
                }

                if(isLiteralUnionType(checker.getTypeAtLocation(tsNode))) {
                    const name = node.key.type === 'Identifier' ? node.key.name : 'property';
                    context.report({ node: node.key, messageId: 'literalUnionNeedsDoc', data: { name } });
                }
            },
        };
    },
};
