
const assert = require('node:assert');
const { classifyDefault, isLiteralUnionType } = require('./annotation_core');

// --- classifyDefault ---
assert.strictEqual(classifyDefault(null), 'none');
assert.strictEqual(classifyDefault('null'), 'null');
assert.strictEqual(classifyDefault('undefined'), 'undefined');
assert.strictEqual(classifyDefault('false'), 'concrete');
assert.strictEqual(classifyDefault('\'text\''), 'concrete');
assert.strictEqual(classifyDefault('{}'), 'concrete');

// --- isLiteralUnionType (mock TS type objects) ---
const strLit = { isStringLiteral: () => true, isNumberLiteral: () => false };
const numLit = { isStringLiteral: () => false, isNumberLiteral: () => true };
const nonLit = { isStringLiteral: () => false, isNumberLiteral: () => false };
const union = (types) => ({ isUnion: () => true, types });

assert.strictEqual(isLiteralUnionType(union([strLit, strLit])), true, '\'a\'|\'b\'');
assert.strictEqual(isLiteralUnionType(union([strLit, numLit])), true, '\'a\'|1');
assert.strictEqual(isLiteralUnionType(union([strLit, nonLit])), false, '\'a\'|string');
assert.strictEqual(isLiteralUnionType(union([strLit])), false, 'single-member union');
assert.strictEqual(isLiteralUnionType({ isUnion: () => false }), false, 'not a union');
assert.strictEqual(isLiteralUnionType({}), false, 'no isUnion method');

// eslint-disable-next-line no-console
console.log('default-annotation helper tests passed');
