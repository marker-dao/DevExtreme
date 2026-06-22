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
        // R4: object option carries @default.
        {
            code: 'interface dxFooOptions { /** @default {} */ bar?: PopupProperties; }',
            filename: 'foo.d.ts',
        },
        // Category B: object-typed property in a data type (not *Options) → R4 does not apply.
        {
            code: 'type Message = { /** @docid */ bar?: PopupProperties; };',
            filename: 'foo.d.ts',
        },
        // No default, scalar type → nothing to check.
        {
            code: 'interface dxFooOptions { /** @docid */ foo?: string; }',
            filename: 'foo.d.ts',
        },
        // R4 disabled via option.
        {
            code: 'interface dxFooOptions { /** @docid */ bar?: PopupProperties; }',
            filename: 'foo.d.ts',
            options: [{ requireObjectOptionDefault: false }],
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
        // R6: @default undefined but no | undefined.
        {
            code: 'interface dxFooOptions { /** @default undefined */ foo?: string; }',
            filename: 'foo.d.ts',
            errors: [{ messageId: 'defaultUndefinedNeedsUndefined' }],
        },
        // R4: object option in an *Options interface without @default.
        {
            code: 'interface dxFooOptions { /** @docid */ bar?: PopupProperties; }',
            filename: 'foo.d.ts',
            errors: [{ messageId: 'objectOptionNeedsDefault' }],
        },
        // R4 via inheritance: interface extends WidgetOptions, inline object type without @default.
        {
            code: 'interface Foo extends WidgetOptions<Foo> { /** @docid */ bar?: { x?: number; }; }',
            filename: 'foo.d.ts',
            errors: [{ messageId: 'objectOptionNeedsDefault' }],
        },
    ],
});
