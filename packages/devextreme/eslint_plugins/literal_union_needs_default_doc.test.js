/* eslint-disable spellcheck/spell-checker */
const { RuleTester } = require('eslint');
const tsParser = require('@typescript-eslint/parser');
const rule = require('./literal_union_needs_default_doc');

// Type-aware: needs a TS program. `projectService` with `allowDefaultProject`
// lets RuleTester's inline code be type-checked without an on-disk fixture.
const ruleTester = new RuleTester({
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            projectService: {
                allowDefaultProject: ['*.ts'],
            },
            tsconfigRootDir: __dirname,
        },
    },
});

ruleTester.run('literal-union-needs-default-doc', rule, {
    valid: [
        // Literal union but @default present → documented.
        {
            code: 'type T = \'a\' | \'b\'; interface Foo { /** @default \'a\' */ x?: T; }',
            filename: 'file.ts',
        },
        // Not a literal union → out of scope.
        {
            code: 'interface Foo { /** @docid */ x?: string; }',
            filename: 'file.ts',
        },
        // Single literal (not a union) → out of scope.
        {
            code: 'interface Foo { /** @docid */ x?: \'only\'; }',
            filename: 'file.ts',
        },
    ],
    invalid: [
        // Inline literal union, no @default → report.
        {
            code: 'interface Foo { /** @docid */ x?: \'a\' | \'b\'; }',
            filename: 'file.ts',
            errors: [{ messageId: 'literalUnionNeedsDoc' }],
        },
        // Cross-alias literal union (resolved via checker), no @default → report.
        {
            code: 'type T = \'a\' | \'b\'; interface Foo { /** @docid */ x?: T; }',
            filename: 'file.ts',
            errors: [{ messageId: 'literalUnionNeedsDoc' }],
        },
    ],
});

// eslint-disable-next-line no-console
console.log('literal-union-needs-default-doc rule tests passed');
