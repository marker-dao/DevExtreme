/**
 * Shared helpers for the optional-field convention rules
 * (see docs/UNDEFINED_NULL_CONVENTION.md). Used by:
 *   - jsdoc_default_matches_type.js     (syntactic — R1/R2/R4/R6)
 *   - literal_union_needs_default_doc.js (type-aware — R5)
 */

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

/**
 * True for a TS type that is a union of >= 2 string/number literal members —
 * i.e. a fixed-value "choice" type such as `'text' | 'image'`. Resolves type
 * aliases (cross-file) via the checker, so `MessageType` counts too.
 */
function isLiteralUnionType(type) {
    if(!type.isUnion || !type.isUnion()) {
        return false;
    }
    return type.types.length >= 2 && type.types.every(
        (member) => (member.isStringLiteral && member.isStringLiteral())
            || (member.isNumberLiteral && member.isNumberLiteral()),
    );
}

/**
 * Returns the parser services with a TS program, or `null` when type
 * information is unavailable (no `parserOptions.project`). Type-aware rules
 * must bail out gracefully in that case.
 */
function getTypeAwareServices(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();
    const services = sourceCode.parserServices;
    if(!services || !services.program || !services.esTreeNodeToTSNodeMap) {
        return null;
    }
    return services;
}

module.exports = {
    readDefaultToken,
    classifyDefault,
    isLiteralUnionType,
    getTypeAwareServices,
};
