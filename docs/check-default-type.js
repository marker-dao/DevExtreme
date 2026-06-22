/*
 * Prototype lint rule + burn-down counter for the optional-field convention.
 *
 * Invariant checked (runtime-independent, pure .d.ts + JSDoc):
 *   "JSDoc @default must agree with the type form."
 *
 *   R1 (hard):   @default null              => type MUST contain `null`.
 *   R2 (hard):   @default <concrete>        => type MUST NOT contain `| undefined`.
 *                (concrete = anything other than null / undefined)
 *   R3 (review): @default <concrete> AND type contains `null`
 *                => review (could be legit tri-state, e.g. check_box value).
 *   R4 (hard):   object-valued option (in *Options iface) WITHOUT @default.
 *   R5 (review): literal-union field WITHOUT @default (candidate undocumented default).
 *   R6 (hard):   @default undefined         => type MUST contain `| undefined`.
 *
 * Run (typescript lives in apps/demos / .pnpm, so point NODE_PATH at it):
 *   cd <repo-root>
 *   NODE_PATH="node_modules/.pnpm/typescript@4.9.5/node_modules" \
 *     node docs/check-default-type.js packages/devextreme/js
 */
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const ROOT = process.argv[2] || 'packages/devextreme/js';

function walk(dir, acc) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.d.ts')) acc.push(p);
  }
  return acc;
}

// Inspect ONLY top-level union members (ignore nested object-literal members),
// so `{ inner?: number | undefined }` does not count as the property having `| undefined`.
function topLevelMembers(typeNode) {
  return ts.isUnionTypeNode(typeNode) ? typeNode.types : [typeNode];
}
function hasNull(typeNode) {
  return topLevelMembers(typeNode).some(
    (m) => ts.isLiteralTypeNode(m) && m.literal.kind === ts.SyntaxKind.NullKeyword,
  );
}
function hasUndefined(typeNode) {
  return topLevelMembers(typeNode).some((m) => m.kind === ts.SyntaxKind.UndefinedKeyword);
}

function readDefault(tag) {
  const c = tag.comment;
  if (typeof c === 'string') return c.trim();
  if (Array.isArray(c)) return c.map((p) => p.text).join('').trim();
  return '';
}

// Object-valued option: nested *Properties type or an inline object literal.
function isObjectOption(typeNode, sf) {
  if (ts.isTypeLiteralNode(typeNode)) return true;
  if (ts.isTypeReferenceNode(typeNode)) return /(Properties|Options|Base)$/.test(typeNode.typeName.getText(sf));
  return false;
}

// Is a node a string/number literal type member?
function isLiteralMember(m) {
  return ts.isLiteralTypeNode(m)
    && (m.literal.kind === ts.SyntaxKind.StringLiteral || m.literal.kind === ts.SyntaxKind.NumericLiteral);
}
// Pure literal union: every top-level member is a string/number literal.
function isPureLiteralUnion(typeNode) {
  if (isLiteralMember(typeNode)) return true;
  return ts.isUnionTypeNode(typeNode) && typeNode.types.length > 0 && typeNode.types.every(isLiteralMember);
}

const files = walk(ROOT, []);

// PASS 1: collect type-alias names that are pure literal unions (e.g. `type MessageType = 'text' | 'image'`).
const litUnionAliases = new Set();
for (const file of files) {
  const sf = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  ts.forEachChild(sf, function scan(node) {
    if (ts.isTypeAliasDeclaration(node) && isPureLiteralUnion(node.type)) litUnionAliases.add(node.name.text);
    ts.forEachChild(node, scan);
  });
}
// A field whose type is a literal union (inline) or references a literal-union alias.
function isLiteralUnionType(typeNode, sf) {
  if (isPureLiteralUnion(typeNode)) return true;
  return ts.isTypeReferenceNode(typeNode) && litUnionAliases.has(typeNode.typeName.getText(sf));
}
const v = { R1: [], R2: [], R3: [], R4: [], R5: [], R6: [] };

for (const file of files) {
  const sf = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  (function visit(node, inOptionsIface) {
    let inOptions = inOptionsIface;
    if (ts.isInterfaceDeclaration(node)) {
      const heritage = (node.heritageClauses || []).map((h) => h.getText(sf)).join(' ');
      inOptions = /(Options|Properties|Base)$/.test(node.name.text) || /WidgetOptions|ComponentOptions|Options</.test(heritage);
    }
    if (ts.isPropertySignature(node) && node.type) {
      const defTag = ts.getJSDocTags(node).find((t) => t.tagName && t.tagName.escapedText === 'default');
      const typeText = node.type.getText(sf).replace(/\s+/g, ' ').slice(0, 60);
      const name = node.name.getText(sf);
      const line = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
      const rec = { loc: `${file}:${line}`, name, typeText, def: defTag ? readDefault(defTag) : '' };

      if (defTag) {
        if (rec.def === 'null' && !hasNull(node.type)) v.R1.push(rec);
        const concrete = rec.def && rec.def !== 'null' && rec.def !== 'undefined';
        if (concrete && hasUndefined(node.type)) v.R2.push(rec);
        if (concrete && hasNull(node.type)) v.R3.push(rec);
        if (rec.def === 'undefined' && !hasUndefined(node.type) && !isObjectOption(node.type, sf)) v.R6.push(rec);
      } else if (inOptions && isObjectOption(node.type, sf)) {
        v.R4.push(rec); // object-valued option without @default
      } else if (isLiteralUnionType(node.type, sf)) {
        v.R5.push(rec); // literal-union field without @default — candidate "undocumented default" (review)
      }
    }
    ts.forEachChild(node, (c) => visit(c, inOptions));
  })(sf, false);
}

function dump(label, list, limit) {
  console.log(`\n${label}: ${list.length}`);
  list.slice(0, limit).forEach((r) => console.log(`  ${r.name.padEnd(22)} type: ${r.typeText.padEnd(40)} @default ${r.def}\n    ${r.loc}`));
  if (list.length > limit) console.log(`  … +${list.length - limit} more`);
}

console.log(`Scanned ${files.length} .d.ts files under ${ROOT}`);
dump('R1  @default null but type lacks `null`     (HARD)', v.R1, 8);
dump('R2  concrete @default but type has `| undefined` (HARD)', v.R2, 8);
dump('R3  concrete @default but type has `null`   (REVIEW)', v.R3, 8);
dump('R4  object-valued option without @default   (HARD)', v.R4, 8);
dump('R5  literal-union field WITHOUT @default      (REVIEW — candidate undocumented default)', v.R5, 8);
dump('R6  @default undefined but type lacks `| undefined`  (HARD — category A needs | undefined)', v.R6, 12);
console.log(`\nMessage.type in R5? ${v.R5.some((r) => r.name === 'type' && r.loc.includes('chat.d.ts'))}`);
console.log(`buttons in R6? ${v.R6.some((r) => r.name === 'buttons' && r.loc.includes('drop_down_editor'))}`);
console.log(`BURN-DOWN total hard (R1+R2+R4+R6): ${v.R1.length + v.R2.length + v.R4.length + v.R6.length}`);
