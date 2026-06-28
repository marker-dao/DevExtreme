# Optional Field Typing Convention in the Public API (`?`, `| undefined`, `| null`, `@default`)

> * **Enforced version for Copilot review** in the repository:
>   [.github/instructions/optional-fields-typing.instructions.md](https://github.com/DevExpress/DevExtreme/blob/26_1/.github/instructions/optional-fields-typing.instructions.md).
> * This page and that file are synchronized copies of the same rule. If you update the rule, update both files.

---

## TL;DR

The shape of an optional field is defined by **two independent axes**:

* **The `| undefined` axis (type).** Add `| undefined` **only** when the field is
  an **option** whose stored default in `defaultOptions` is `undefined`. In all other cases,
  use a bare `?`.
* **The `@default` axis (JSDoc).** Write `@default <X>` **only when `X` is actually STORED**
  as the default: in `defaultOptions` for an option, or in the default object for an object-valued option.
  **Important:** A point-of-use default, such as `switch (x) { default }`,
  `const { x = 'after' } = …`, or `x ?? …`, is **not stored**. Do **not** write `@default`
  for such cases. Document this behavior in the textual description of the type or field instead.

In general, “no value” in `defaultOptions` means `undefined`. Use `null` only when runtime logic
semantically relies on `=== null`.

**New vs existing fields (backward compatibility policy).** For **new** code, use the convention
directly: every new field should default to `undefined`; use `null` only when there is a logical reason
and the runtime truly needs a strict comparison with `null`. For an existing field, do **not** introduce
breaking changes: do not migrate runtime `null` values. Instead, extend the type to match the runtime behavior
where necessary. See the section below.

---

## Three Categories

| Category | What it is | Type | `@default` |
|---|---|---|---|
| **A** - scalar/collection option | A key in `defaultOptions` | Concrete default → <code>T</code>; `undefined` default → <code>T &#124; undefined</code>; semantic `null` → <code>T &#124; null</code> | Stored default value |
| **A-obj** - object-valued option | A key in `defaultOptions` whose value is a config object | <code>T</code> without <code>&#124; undefined</code> | Stored default object |
| **B** - object property | A data-object field (`Message`) **or** a config-item sub-property (`TextEditorButton`) - **not** an option | <code>T</code> without <code>&#124; undefined</code> | **None**. Behavior goes into the description if the property is not set in `defaultOptions` |

---

### How to determine the category

```text
Is the field a key in defaultOptions (component option)?
   ├─ Is the value a config object (*Properties / *Options / inline)? → A-obj
   └─ Is the value a scalar / collection / callback?                  → A

Otherwise, the field is inside an option value:
   • Data-object field (Message, User, Alert)           → B
   • Config-item sub-property (TextEditorButton, etc.)  → B
```

---

### How to determine the stored default

`@default` describes **the stored default — what `.option(path)` returns on a fresh instance.**
Often that is an entry in `_getDefaultOptions()`, but in many components the default lives elsewhere,
and grepping only `_getDefaultOptions` yields a false "undefined". Verify against the runtime:

* **Callbacks registered via `createAction` / `_eventsMap`** (Grids, Scheduler, FileManager, viz):
  registration does **not** set an option default — the action wrapper is stored in an internal
  field, and `.option('onX')` stays `undefined` until a default explicitly sets it. Such a callback
  stores `undefined` (not `null`) even when the `.d.ts` says `@default null`. It stores `null` only
  if some module's `_getDefaultOptions` literally contains `onX: null`.
* **Visualization (`js/viz/**`):** defaults live in theme files (`viz/core/themes/generic/light/*`),
  not in `_getDefaultOptions`. A themed value round-trips through `.option()` (a stored default);
  a value applied only at render time (`x ?? 'solid'`) is **not** stored → `undefined`.
* **Grids:** `_getDefaultOptions` is assembled from many modules (`grid_core/*`, `data_grid/*`,
  `tree_list/*`) — search the whole widget tree, not a single file.
* A `null as undefined` cast at the assignment still stores `null`.
* A function default (`noop`, `defaultScreenFactorFunc`, `defaultOnIncidentOccurred`) — the type is
  already correct (a function); `@default null` is inaccurate → the developer decides.

Check each field atomically against the runtime; "same as the neighboring field" is not evidence.

---

## A - Scalar/Collection Option

| Default in `defaultOptions` | Type | `@default` |
|---|---|---|
| Concrete value (`false` / number / string / `[]`) | `foo?: T` | `@default <value>` |
| `undefined` (“not set”) | <code>foo?: T &#124; undefined</code> | `@default undefined` |
| `null` with semantic `=== null` behavior | <code>foo?: T &#124; null</code> | `@default null` |

---

Callbacks/events are a special case where the default is `undefined`:
`onFoo?: ((e) => void) | undefined`, `@default undefined`. **Never use `| null` for callbacks/events.**

**`any` fields.** `any` is **not** nullable — it *disables* type checking (`any ≠ unknown`); it does
not "contain `null`". For `@default null` on an `any` field, **add `| null`**: this documents the
actually stored value, and `any | null` collapses to `any` for the compiler (the
`no-redundant-type-constituents` rule is not enabled, so there is no new warning). Do not confuse
this with an alias that already includes `null` (`DateLike = Date | number | string | null`) — that
type is already correct, so leave it (see "Linter blind spots").

**Why `undefined` default ⇒ `| undefined`:** wrapper generation loses `?`. Without `| undefined`
in the source type, a wrapper cannot express “not set”, and `strictTemplates` breaks legitimate usages such as
`[input]="undefined"`, `[input]="obs$ | async"`, and `[input]="signal()"`. This was confirmed by bug report
[T1093403](https://isc.devexpress.com/internal/ticket/details/T1093403) (I. Kharchenko, 2022):
without `| undefined`, the wrapper generated `set width(value: number | Function | string)`,
so `[width]="undefined"` did not compile.

**Correct / incorrect examples**. The `@default` JSDoc tag immediately shows whether the type is consistent:

```ts
// Correct: @default undefined, and the type includes | undefined:
/** @default undefined */
filterValues?: Array<any> | undefined;

// Incorrect: same @default undefined, but the type does not include | undefined:
/** @default undefined */
filterValues?: Array<any>;
```

**R3** · current incorrect example in the codebase:
[filterValues - common/grids.d.ts:607](https://github.com/DevExpress/DevExtreme/blob/26_1/packages/devextreme/js/common/grids.d.ts#L607)

```ts
// Correct: @default null, and the type includes null:
/** @default null */
editRowKey?: TKey | null;

// Incorrect: @default null, but the type includes neither null nor undefined:
/** @default null */
editRowKey?: TKey;
```

**R1** · current incorrect example in the codebase:
[editRowKey - common/grids.d.ts:1255](https://github.com/DevExpress/DevExtreme/blob/26_1/packages/devextreme/js/common/grids.d.ts#L1255)

## A-obj - Object-Valued Option

The value is a partial config that the runtime **merges** with sub-property defaults.
There are two variants. They differ by the default in `defaultOptions`; lint does not distinguish between them.

| Variant | Examples | Default | Type | `@default` |
|---|---|---|---|---|
| “Always enabled” (merged with defaults; accessible by path, for example `option('editing.mode')`) | `editing`, `paging`, `tooltip`, `dropDownOptions`, `sendButtonOptions` | Object / `{}` | `foo?: NestedProperties` | Default object |
| “Optional feature, disabled” | `fileUploaderOptions`, `speechToTextOptions` | `undefined` | <code>foo?: NestedProperties &#124; undefined</code> | `undefined` |

---

**Examples of A-obj configs from the codebase**. All are “always enabled”:
`foo?: NestedProperties` without `| undefined`; `@default` mirrors the default object.

* **Grid** (sub-options addressed by paths such as `option('paging.pageSize')`): `editing`, `paging`,
  `scrolling`, `selection`, `columnChooser`, `filterRow`, `headerFilter`, `pager`, `searchPanel`,
  `stateStoring`, `loadPanel` -
  [common/grids.d.ts:2621](https://github.com/DevExpress/DevExtreme/blob/26_1/packages/devextreme/js/common/grids.d.ts#L2621).
* **Viz:** `tooltip`, `legend`, `argumentAxis`, `valueAxis`, `commonSeriesSettings` -
  [viz/chart.d.ts:1525](https://github.com/DevExpress/DevExtreme/blob/26_1/packages/devextreme/js/viz/chart.d.ts#L1525).
* **Editors:** `dropDownOptions` (`PopupProperties`), `calendarOptions` (`dxCalendarOptions`) -
  [ui/date_box.d.ts:313](https://github.com/DevExpress/DevExtreme/blob/26_1/packages/devextreme/js/ui/date_box.d.ts#L313).
* **Chat:** `sendButtonOptions`.

> **The “optional feature, disabled” pattern is not recommended for new designs.**
> It gives one option a **double responsibility**: both feature configuration and the flag that enables it
> (`undefined` means disabled). Prefer splitting this into two options: a flag and a config,
> for example `speechToTextEnabled: boolean` + `speechToTextOptions: NestedProperties`.
> Then `speechToTextOptions` becomes a regular A-obj option without `| undefined`.

**For object-valued options, `@default` is needed only when the option overrides type defaults.**
A type reference such as `PopupProperties` already documents the defaults of its sub-properties.
The `@default` tag on the option itself is meaningful only when `_getDefaultOptions` provides values
that **differ from the defaults of the referenced type**. In that case, `@default` documents the override.
If there is no override and `_getDefaultOptions` contains `{}`, `@default` is not needed.
For an **inline object**, sub-properties carry their own `@default` tags, so the container does not need one.
This is **R4**: the linter does **not** check object-valued options; review and Copilot enforce this.

| Field                              | Value in `_getDefaultOptions`            | Differs from type defaults? | `@default`                                        |
| ---------------------------------- | ---------------------------------------- | --------------------------- | ------------------------------------------------- |
| `drop_down_button.dropDownOptions` | `{}`                                     | No                          | Not needed                                        |
| `autocomplete.dropDownOptions`     | `{ showTitle: false }`                   | Yes, overrides `showTitle`  | `@default { showTitle: false }`                   |
| `chat.sendButtonOptions`           | `{ icon: 'arrowright', action: 'send' }` | Yes                         | `@default { icon: 'arrowright', action: 'send' }` |

```ts
// Override of the type default → @default documents it:
/** @default { showTitle: false } */
dropDownOptions?: PopupProperties;

// No override (_getDefaultOptions contains {}) → @default is not needed:
dropDownOptions?: PopupProperties;

// Inline object → @default belongs to sub-properties, not to the container:
editing?: {
  /**
   * @default false
   */
  allowDeleting?: boolean;
  /**
   * @default false
   */
  allowUpdating?: boolean;
};
```

## B - Object Property: Data Objects and Config Items

`Message` / `User` / `Alert` and sub-properties of `TextEditorButton` / `Column` are **not options**.
They are not present in `defaultOptions`.

| Rule | Type | `@default` |
|---|---|---|
| Always | <code>foo?: T</code> without <code>&#124; undefined</code> | **None**. Behavior when omitted goes into the description |

---

**Why bare `?`:** the field is not set in `defaultOptions`, and there is no need to pass `undefined`
to it. The value is either provided or omitted, which is exactly what `?` means.
With `exactOptionalPropertyTypes: true` in `tsconfig`, `foo?: T` allows the field to be **omitted**,
but does not allow assigning `undefined` directly (`{ foo: undefined }` is a compile-time error).
This matches the rule: either provide a value or omit the field.

**Why there is no `@default`:** the default here is a point-of-use fallback. It is not stored anywhere.
Therefore, if the option is read through `.option()`, that fallback value will not be returned
because it does not exist in the storage. Writing it in `@default` would incorrectly document a runtime default
that is not actually present. Behavior “when omitted” should be documented by **technical writers
in the separate documentation repository, not in `.d.ts`**. The field itself remains without `@default`.
Examples of such descriptions:

* `Message.type` → *“If not specified, the message is rendered as a text message.”*
* `TextEditorButton.location` → *“If not specified, the button is placed after the input field.”*

**Correct / incorrect examples:**

```ts
// Correct: no @default. Behavior when omitted is described in the type description
// in the documentation repository.
/**
 * @docid
 * @public
 */
type?: MessageType;

// Incorrect: union with @default for a value that is not stored anywhere:
/**
 * @public
 * @docid
 * @default "after"
 */
location?: TextEditorButtonLocation;
```

Correct:
[type - ui/chat.d.ts:275](https://github.com/DevExpress/DevExtreme/blob/26_1/packages/devextreme/js/ui/chat.d.ts#L275)

Current incorrect example:
[location - js/common.d.ts:816](https://github.com/DevExpress/DevExtreme/blob/26_1/packages/devextreme/js/common.d.ts#L816)

---

## New vs Existing Fields: Backward Compatibility Policy

The A / A-obj / B tables above are normative for **new** code. Existing code must be handled
without breaking changes. This creates two modes:

**1. New field: apply the rule immediately**

* In `defaultOptions`, the default should be `undefined`, not `null`.
* The type and `@default` should match `undefined`.
* `null` is allowed only with an explicit rationale: when the runtime truly performs `=== null`.
  Most code treats `null` and `undefined` the same way via `isDefined`, so a new field usually
  does not need `null`. Without a rationale, review rejects it. This is part of the semantic layer
  described in “How this is enforced”.

**2. Existing field: bring it closer to the rule without breaking compatibility**

* Do **not** change runtime behavior. If the runtime stores `null`, changing it to `undefined`
  would break consumers: `option()` would start returning `undefined` instead of `null`,
  and `[x]="null"` would stop compiling.
* Fix mismatches between type and `@default` only by **extending the type to match the runtime**.

> Rule: if `@default null` is present, the runtime stores `null`, and the type does not allow `null`,
> then **add `| null` to the type**. Leave `@default` and the runtime unchanged.

Example: `dxDropDownButtonOptions.selectedItemKey`

```ts
// The runtime stores null, but the public type did not allow it,
// which caused a suppressed error:
//
//   _getDefaultOptions: { /* @ts-expect-error public API needs to be fixed */ selectedItemKey: null }

selectedItemKey?: string | number;          // before: @default null, type without null
selectedItemKey?: string | number | null;   // after: type extended; runtime NOT changed
```

After the type is extended, the `@ts-expect-error` above `selectedItemKey: null` is no longer needed.

> This is a compatibility compromise, **not a model to follow**. According to the convention axes,
> the field still deviates from the rule for new code. **New code** should use `undefined`.

---

## Summary: Type ↔ `@default`

| Type | Allowed `@default` |
|---|---|
| `T` (option with a concrete default) | Default value |
| <code>T &#124; undefined</code> (option with `undefined` default) | `undefined` |
| <code>T &#124; null</code> | `null` |
| `any` (option, `null` default) | `null` — add <code>&#124; null</code> (collapses to `any` for the compiler) |
| `NestedProperties` (A-obj) | Default object |
| `T` (category B) | **No tag**. Behavior goes into the description |

---

## How This Is Enforced: Two Layers

**Rule catalog**. The table below defines the rule codes used in the text:

| Rule | Check | Where it is enforced |
|---|---|---|
| **R1** | `@default null` ⇒ the type includes `null` | Linter |
| **R2** | Concrete `@default` other than `null` / `undefined` ⇒ the type does not include <code>&#124; undefined</code> | Linter |
| **R3** | `@default undefined` ⇒ the type includes <code>&#124; undefined</code> | Linter |
| **R4** | Object-valued option: `@default` is needed only when type defaults are overridden | Review / Copilot |

---

In addition to the R-catalog, there is the general **BC policy**:
new field → `undefined`; existing field → no breaking changes. See “New vs Existing Fields”.
This is also enforced during review.

**Linter (R1 / R2 / R3).** The eslint plugin `devextreme-custom`, rule
`jsdoc-default-matches-type`, runs for `js/**/*.d.ts` with `warn` severity. It is visible in the
editor and in `lint-dts`. You do not need to keep the details in your head.

Implementation is located in `packages/devextreme/eslint_plugins/`.

**Linter blind spots** (predictable false flags — do not "fix" them blindly):
* it does **not** resolve type aliases: `DateLike` (= `Date | number | string | null`) is flagged as
  "no `null`" even though `null` is already in the type → no edit needed (the proper fix is to
  resolve aliases in the rule itself);
* it does **not** special-case `any`: it flags `any + @default null` — which is correct (see the
  `any` rule), but be aware that `any` is effectively invisible to it.

**Review (Copilot).** This is the semantic layer: **R4** and the BC policy. These depend on runtime
behavior or design intent, which the linter cannot reliably detect. The rule is documented in
`optional-fields-typing.instructions.md` so that Copilot can apply it during PR review.
