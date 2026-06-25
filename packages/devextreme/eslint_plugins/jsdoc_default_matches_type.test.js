/* eslint-disable spellcheck/spell-checker */
const { RuleTester } = require('eslint');
const tsParser = require('@typescript-eslint/parser');
const rule = require('./jsdoc_default_matches_type');

const ruleTester = new RuleTester({
    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: 'module',
    },
});

ruleTester.run('jsdoc-default-matches-type', rule, {
    valid: [
        // R1: @default null with null in the type.
        {
            code: 'interface dxFooOptions { /** @default null */ foo?: string | null; }',
            filename: 'foo.d.ts',
        },
        // R2: concrete default without | undefined.
        {
            code: 'interface dxFooOptions { /** @default false */ foo?: boolean; }',
            filename: 'foo.d.ts',
        },
        // R6: @default undefined with | undefined.
        {
            code: 'interface dxFooOptions { /** @default undefined */ foo?: string | undefined; }',
            filename: 'foo.d.ts',
        },
        // No @default → nothing to check (object-option @default is not linted — handled at review).
        {
            code: 'interface dxFooOptions { /** @docid */ bar?: PopupProperties; }',
            filename: 'foo.d.ts',
        },
        {
            code: 'interface dxFooOptions { /** @docid */ foo?: string; }',
            filename: 'foo.d.ts',
        },
        // R6 boundary: object-typed option with | undefined + @default undefined is consistent.
        {
            code: 'interface dxFooOptions { /** @default undefined */ bar?: PopupProperties | undefined; }',
            filename: 'foo.d.ts',
        },
    ],

    invalid: [
        // R1: @default null but no null in the type.
        {
            code: 'interface dxFooOptions { /** @default null */ foo?: string; }',
            filename: 'foo.d.ts',
            errors: [{ messageId: 'defaultNullNeedsNull' }],
        },
        // R2: concrete default but | undefined present.
        {
            code: 'interface dxFooOptions { /** @default false */ foo?: boolean | undefined; }',
            filename: 'foo.d.ts',
            errors: [{ messageId: 'concreteDefaultNoUndefined' }],
        },
        // R6: @default undefined but no | undefined (scalar).
        {
            code: 'interface dxFooOptions { /** @default undefined */ foo?: string; }',
            filename: 'foo.d.ts',
            errors: [{ messageId: 'defaultUndefinedNeedsUndefined' }],
        },
        // R6 on an object-typed option: @default undefined but no | undefined.
        {
            code: 'interface dxFooOptions { /** @default undefined */ bar?: { x?: number; }; }',
            filename: 'foo.d.ts',
            errors: [{ messageId: 'defaultUndefinedNeedsUndefined' }],
        },
    ],
});
