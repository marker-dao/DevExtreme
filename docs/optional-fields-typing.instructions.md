---
applyTo: "**/packages/devextreme/js/**/*.d.ts"
---

# Optional field typing (`?`, `| undefined`, `| null`, `@default`)

When you write, complete, or review an optional field in a public `.d.ts`, apply the rules
below. The shape of an optional field is decided by two independent axes.

## Two axes

- **Type axis (`| undefined`).** Add `| undefined` only if the field is an OPTION whose
  stored default in `defaultOptions` is `undefined`. Otherwise use a bare `?`.
- **`@default` axis (JSDoc).** Write `@default <X>` only when `X` is actually STORED as the
  default — in `defaultOptions` for an option, or as the seed object for an object-valued
  option. A point-of-use default (a `switch` default, a destructuring default, `??`) is NOT
  stored: do not write `@default`; describe the on-omission behavior in the type's text
  description instead.

Across the board: in `defaultOptions`, "no value" is `undefined`, not `null`. Use `null`
only when the runtime performs a meaningful `=== null` check.

## New vs existing fields (breaking-change policy)

- **New field:** the default in `defaultOptions` is `undefined`; the type and `@default`
  follow `undefined`. `null` (as a type member or as a value) is allowed ONLY with explicit
  justification — the runtime genuinely distinguishes it with `=== null`. Without that
  justification, reject `null` in review. This is the decision the linter cannot make, so it
  must be enforced here.
- **Existing field:** never introduce a breaking change. Do not migrate a runtime `null` to
  `undefined`, and do not remove an existing `| null`. Fix a type-vs-`@default` mismatch only
  by WIDENING the type to match the runtime (for example, add `| null`); leave the runtime
  default and the `@default` tag unchanged.

## Categories

- **A — scalar/collection option** (a key in `defaultOptions`): concrete stored default
  -> `T`; stored `undefined` -> `T | undefined`; meaningful `null` -> `T | null`.
  Callbacks/events are the `undefined` case: `((e) => void) | undefined`, `@default
  undefined`, never `| null`.
- **A-obj — object-valued option** (the value is a config the runtime merges, e.g.
  `editing`, `paging`, `tooltip`, `dropDownOptions`): type is `T` without `| undefined`;
  `@default` mirrors the stored default object. Avoid the "optional feature, off by default"
  pattern (`fooOptions?: ... | undefined`) in new design — it overloads one option with both
  the config and the on/off flag; prefer a separate boolean flag plus a config option
  (`fooEnabled: boolean` + `fooOptions: NestedProperties`).
- **B — object property** (a data-object field such as `Message`, or a config-item
  sub-property such as `TextEditorButton`): bare `foo?: T` without `| undefined`; NO
  `@default`. The default is a point-of-use fallback that is never stored, so reading the
  option via `.option()` would not return it — describe the on-omission behavior in the
  type's text description (written by a technical writer).

## Correct vs incorrect examples

```ts
// A — option whose stored default is undefined: the type must carry | undefined
/** @default undefined */
filterValues?: Array<any> | undefined;        // correct
/** @default undefined */
filterValues?: Array<any>;                     // incorrect: @default undefined, but no | undefined in the type

// A — @default null requires null in the type
/** @default null */
editRowKey?: TKey | null;                      // correct
/** @default null */
editRowKey?: TKey;                             // incorrect: @default null, but the type allows neither null nor undefined

// A-obj — an object-valued option must declare @default mirroring its stored object
/** @default {} */
dropDownOptions?: PopupProperties;             // correct
popup?: PopupProperties;                       // incorrect: object-valued option without @default

// B — a literal-union data field: no @default; behavior goes in the description
/**
 * The message type. If not specified, the message is rendered as a text message.
 */
type?: MessageType;                            // correct
deviceType?: 'phone' | 'tablet' | 'desktop';   // incorrect: literal union with no @default and no described behavior
```

## Review checklist

- `@default null` present -> the type must include `null`.
- `@default undefined` present -> the type must include `| undefined`.
- A concrete `@default` (not `null`/`undefined`) -> the type must NOT include `| undefined`.
- An object-valued option -> it must have a `@default` that mirrors its stored default object.
- A literal-union field with default-on-omission behavior -> no `@default`; the behavior must
  be documented in the description.
- A new field meaning "no value" -> default to `undefined`, not `null`; flag any `null` that
  has no `=== null` justification.
- An existing field -> never propose migrating a runtime `null` to `undefined` or removing
  `| null` (both are breaking changes); only widen the type.

Apply these consistently to every `.d.ts` field you write, complete, or review.
