# Fix `@default` / type mismatches in a `.d.ts` file

## Your task

Fix every `@default` / type mismatch in the `.d.ts` file you are given. The request may name a
file or paste a few error lines, but treat those as a starting point only — Step 0 tells you how
to pull the file's COMPLETE current error list and fix it in one pass.
The full convention is in `.github/instructions/optional-fields-typing.instructions.md`.

**The loop (everything below is reference for these steps):**
1. Pull the file's **complete** error list (Step 0).
2. For **each** flagged property: read what `_getDefaultOptions()` stores (Step 2) — `@default` is
   a claim about that value — then apply the matching row of the Step 3 tables (type + `@default`,
   plus `@type` and stale `@ts-expect-error`).
3. Re-run the Step 0 command; repeat 2 until it prints nothing.
4. Run both verifications and emit the table report (Step 6). New runtime `tsc` errors are
   **reported, not fixed**.

`@default` is **not a hint** — it is a claim about the value actually stored in the
component's `_getDefaultOptions()`. So every fix starts by reading that runtime value;
you never decide a fix from the `.d.ts` alone.

Two kinds of default to keep distinct:
- **Stored default** — the value written in `_getDefaultOptions()`. This is what `.option()`
  returns and the only thing `@default` may describe.
- **Point-of-use default** — a value applied where the option is consumed (a `switch`/`case`
  default, a destructuring default `const { foo = 'bar' } = …`, `??`). The stored default is
  still `undefined`; this value is **not** a stored default, so it does not belong in
  `@default` and is documented by tech writers instead (Step 5).

**Scope of edits:**
- The `.d.ts` file: only the flagged properties.
- The runtime `.ts` file: **only** to remove `@ts-expect-error` directives that become
  unused as a direct result of widening a type here (Step 4). Nothing else in runtime.
- Never change a stored default value, a `switch`/`case`, or any other runtime logic.
- If your change surfaces a NEW `tsc` error elsewhere (a consumer, a now-required cast),
  **report it — do NOT fix it.** Resolving it needs runtime judgment the developer owns; a
  silent fix can hide a real design problem. The only runtime edit you make is the stale
  `@ts-expect-error` removal above.

---

## Step 0 — Get the COMPLETE error list first (then fix in one pass)

Where the list comes from:
- **If the request includes an error list** (lines pasted, or a report file), use it as the
  starting point — but treat line numbers as approximate (they drift the moment you edit) and key
  off the **property name**.
- **If the request gives only a file name or path**, get the list yourself.

Either way, you must end on the file's full, current set — a partial list makes you fix a subset
and stop. The single source of truth is eslint on the file. Use the file's **real path** — `.d.ts`
files live under `js/ui/`, `js/viz/`, `js/common/`, `js/core/`, and subfolders; do not assume
`js/ui/`. From `packages/devextreme`:

```bash
pnpm exec eslint js/<path-to>/<file>.d.ts | grep 'jsdoc-default-matches-type'
```

Every violation is one line ending in the rule id, so this prints **all** of them. Avoid the
traps that silently hide errors:
- **Never use `--quiet`.** This rule reports `warning`s; `--quiet` drops warnings and you get
  empty output — the file looks clean when it is not.
- **Never `grep -A N` or grep by the file name.** The file name prints once at the top, so
  `grep -A 2 "<file>"` shows only the first couple of errors and truncates the rest. Grep by the
  **rule id** instead.
- Run eslint on the **single file**, not the `./js/**/*.d.ts` glob.

Identify each flagged property by **name** (not by the line number, which will shift). Fix the
whole list (Steps 1-6), then **re-run the command above**. Repeat until it prints nothing — an
empty result is the only signal that the `.d.ts` is done. Do not stop after the first batch.

---

## Step 1 — Determine the field category

- **Category A — component option**: a key that appears in the component's
  `_getDefaultOptions()` (search `packages/devextreme/js/__internal/**` for the component).
  Has a stored default; `@default` must reflect exactly what is stored there.
- **Category B — data-object / config-item field**: a sub-property of a plain data type
  (e.g. `Message`, `TextEditorButton`, `Column`) or a config-item type. The default is a
  point-of-use default, never stored in `_getDefaultOptions()`. Category B fields must
  have **no `@default` tag at all**.

---

## Step 2 — Read the ground truth in `_getDefaultOptions()`

For each flagged property, find what `_getDefaultOptions()` actually stores. Five findings:

| Finding | Meaning |
|---------|---------|
| Absent, or explicitly `undefined` | stored default is `undefined` |
| Set to `null` | stored default is `null` |
| Set to a concrete value (`false`, `0`, `'auto'`, `[]`, `{}`, …) | stored default is that value |
| Stored `undefined`, but a real effective default is applied at point of use (a `switch`/`case` default, a destructuring default `const { foo = 'bar' } = …`, `??`) | stored default is `undefined`; the concrete value is a **point-of-use default** (see Step 5) |
| Category B field (never in `_getDefaultOptions()`) | no `@default` belongs here |

The `@default` tag in the `.d.ts` is a claim about this value. If the tag disagrees with
what is stored, **both** the tag and the type must be corrected — never trust the tag.

---

## Step 3 — Apply the fix

The **"finding"** column is what Step 2 told you is actually stored.

### `null-missing` — `@default null` but type has no `| null`

| Finding | Fix |
|---------|-----|
| Stored `null` | Add `\| null` to the type. Keep `@default null`. |
| Stored `undefined` | Change `@default` to `undefined`. Add `\| undefined` to the type. |
| Stored concrete | Change `@default` to that value. Do not add `\| null` / `\| undefined`. |
| Point-of-use default | Change `@default` to `undefined`, add `\| undefined`. **Emit a tech-writer note (Step 5).** |
| Category B | Remove `@default` entirely. Leave the type unchanged. |

### `undefined-missing` — `@default undefined` but type has no `| undefined`

| Finding | Fix |
|---------|-----|
| Stored `undefined` | Add `\| undefined` to the type. Keep `@default undefined`. |
| Stored `null` | Change `@default` to `null`. Add `\| null` to the type instead. |
| Stored concrete | Change `@default` to that value. Do not add `\| undefined`. |
| Point-of-use default | Keep `@default undefined`, add `\| undefined`. (`@default` is already correct.) |
| Category B | Remove `@default` entirely. Leave the type unchanged. |

### `concrete+undefined` — concrete `@default` but type has `| undefined`

| Finding | Fix |
|---------|-----|
| Stored value matches `@default` | Remove `\| undefined` from the type. Keep `@default`. |
| Stored `undefined` | Change `@default` to `undefined`. Keep `\| undefined`. |
| Stored `null` | Change `@default` to `null`. Replace `\| undefined` with `\| null`. |
| Stored a different concrete value | Change `@default` to that value. Remove `\| undefined`. |
| Point-of-use default | Change `@default` to `undefined`, keep `\| undefined`. **Emit a tech-writer note (Step 5).** |
| Category B | Remove `@default` entirely. Leave `\| undefined` if it was already there. |

### Also: handle `@type` (wrapper-generator directive)

A property's JSDoc may carry a `@type`. It is a **hand-authored declaration consumed by the
Angular/React/Vue wrapper generators** — it is NOT derived from the TS type and does NOT mirror
it. It often differs on purpose: it uses wrapper-facing names (`dxButtonOptions` vs
`ButtonProperties`), expands aliases (`@type Store|DataSource|DataSourceOptions|string|Array<any>|null`
for a TS `DataSourceLike<any> | null`), collapses callbacks to `function`, writes `Object` for
`any`, and so on. Do **not** rewrite `@type` to match the TS type.

Two cases when you widen a type:

- **Keyword `@type function`** — marks an event/callback for the generators. **Never change it.**
  The TS type may grow to `((e: SelectionChangedEvent) => void) | string | null`, but `@type`
  stays exactly `function`. Adding `| null` / `| undefined` here would break Angular generation.
- **Type-expression `@type`** — adding the new `\| null` / `\| undefined` to `@type` is a
  **judgment call, not automatic**. Do it only when `@type` is a structural representation of the
  same value where the new nullability clearly belongs (e.g. DropDownButton `items` below). Many
  `@type` deliberately omit the nullability their TS type has, so a missing `| null` / `| undefined`
  is not a bug to "fix". When in doubt, leave `@type` unchanged and flag it for the developer —
  it drives wrapper generation, which the developer owns (Step 7).

Example (DropDownButton — both forms live in the same file):
```ts
// type-expression @type — the developer chose to widen it alongside the TS type
/** @type Array<dxDropDownButtonItem | any> | null */
items?: Array<Item | any> | null;

// keyword @type function — leave @type untouched even though the TS union grew
/** @type function */
onSelectionChanged?: ((e: SelectionChangedEvent) => void) | string | null;
```

---

## Step 4 — Remove now-stale `@ts-expect-error` directives

When a `.d.ts` type was too narrow, the runtime assignment of `null`/`undefined` in
`_getDefaultOptions()` (or in another option write) was a TypeScript error, suppressed with
`// @ts-expect-error`. Once you widen the type, that suppression becomes unused and the
compiler reports `Unused '@ts-expect-error' directive`.

For every type you widen:
- Look at the corresponding line in the runtime `.ts` (the stored-default assignment for the
  same option). If it carries a `@ts-expect-error` that existed **only because** the type was
  too narrow (the directive text often says so, e.g. `undefined is not allowed`, `ts-error`),
  remove that directive.
- Remove **only** directives made stale by this fix. Leave every `@ts-expect-error` that
  suppresses an unrelated error (e.g. `DataExpressionMixin must be typed`, protected-property
  access). When unsure whether a directive is now stale, leave it and list it as "verify" in
  the report rather than deleting it.

Example (Draggable):
```ts
// .d.ts — before
/** @default null */ onDragStart?: ((e: DragStartEvent) => void);
// .d.ts — after (widened)
/** @default null */ onDragStart?: ((e: DragStartEvent) => void) | null;

// m_draggable.ts — before
// @ts-expect-error
onDragStart: null,
// m_draggable.ts — after (directive removed)
onDragStart: null,
```

---

## Step 5 — Tech-writer notes for changed `@default`

Whenever you change a concrete `@default` to `undefined` (or remove a `@default`) because the
concrete value was a **point-of-use default** (Step 2) rather than a stored default, the user-facing
"what happens when you omit this option" information disappears from the `.d.ts`. That behavior
must be documented by a technical writer in the separate documentation repository (the `.d.ts`
deliberately does not carry it — see the convention).

Collect every such case and report it so a tech writer can act. Do **not** invent or restore
prose in the `.d.ts`.

---

## Step 6 — Verify, then report

Before reporting, run **both** checks from `packages/devextreme`:

1. **`.d.ts` is clean** — the Step 0 command prints nothing:
   ```bash
   pnpm exec eslint js/<path-to>/<file>.d.ts | grep 'jsdoc-default-matches-type'
   ```
2. **Runtime still type-checks** — removing a `@ts-expect-error` that was NOT actually stale, or
   widening/narrowing a type, surfaces a `tsc` error that `lint-dts` cannot see (an unused-directive
   error, or a consumer that no longer assigns — e.g. List's `items` becoming `dxListItem[] | undefined`
   breaks a caller passing `any[] | null`). Catch these with:
   ```bash
   pnpm run check-types        # tsc --noEmit -p js/__internal/tsconfig.json (NOT the dev build)
   ```

`check-types` type-checks the **whole** internal project, so its output mixes pre-existing errors
with yours. To attribute correctly, capture a baseline **before editing** (`git stash` → run
`check-types` → note the errors → `git stash pop`), or count an error as yours only when it
references a symbol/file you touched or a direct consumer of a type you changed. Pre-existing
unrelated errors are not yours — do not report or fix them.

The **New type errors introduced** table may say `none` **only if `check-types` actually ran and
passed (or added no errors over the baseline)**. If you did not / could not run it, do not write
`none` — write `not verified — developer must run check-types`. Never report a clean runtime you
did not check.

Report **every** section below as a table, even when there is one row. If a section has no rows,
keep the heading and write a single `none` row. Removing a `@default` gets its own table so it
is never buried inside the type edits.

### `.d.ts` type / `@default` edits

| Line | Property | Before | After | Finding |
|------|----------|--------|-------|---------|
| L200 | `items` | `Array<Item \| any>` | `Array<Item \| any> \| null` | stored `null` |

### Removed `@default`

| Line | Property | Removed tag | Reason |
|------|----------|-------------|--------|
| L370 | `onClick` | `@default null` | Category B — field is not in `_getDefaultOptions()` |

### Removed `@ts-expect-error` (runtime)

| Location | Property | Action | Reason |
|----------|----------|--------|--------|
| `m_draggable.ts:332` | `onDragStart` | removed | stale after widening to `\| null` |
| `foo.ts:120` | `bar` | VERIFY (left in place) | could not confirm it is now stale |

### New type errors introduced — REPORT ONLY, do not fix

These are surfaced by `check-types`. You do **not** fix them (out of scope — see Scope of edits);
list each one so the developer can resolve it before commit.

| Location | Symbol | Error | Suggested fix (for the developer) |
|----------|--------|-------|-----------------------------------|
| `list.ts:501` | `items` | `null` not assignable to `dxListItem[] \| undefined` | widen consumer, or narrow at call site — developer to decide |

### Tech-writer action items (on-omission behavior to document)

| Property | Point-of-use default | Applied at | Action |
|----------|----------------------|------------|--------|
| `foo` | `'bar'` | `m_foo.ts:88` (destructuring) | `@default` changed to `undefined`; document in docs repo |

### Next step for the developer

| Step | Command | Owner |
|------|---------|-------|
| Regenerate wrappers (Step 7) | `pnpm run regenerate-all` | developer |

### If the run was interrupted or you exchanged messages mid-task

A stop-and-resume, or any back-and-forth with the user, may leave you with stale line numbers
or a half-applied fix. Before you declare the file done, run **both Step 6 checks again from
scratch** (the Step 0 eslint command until it is empty, then `pnpm run check-types`) and rebuild
the report from the actual current state — do not trust your earlier in-progress notes.

---

## Step 7 — Regenerate the wrappers

After the `.d.ts` edits are in, the Angular/React/Vue wrappers must be regenerated so the new
types reach them. End your report by reminding the developer to run, from the repo root:

```bash
pnpm run regenerate-all
```

The **developer is responsible for correct wrapper generation** — that the command succeeds,
that the regenerated `src/` is consistent, and that reexports are up to date (see CLAUDE.md).
Do not skip this: a widened type that is not regenerated will fail the `wrapper_tests.yml` /
reexport CI checks.

---

## Additional rules

- **Widening is always safe; narrowing needs justification.** Adding `| null` / `| undefined`
  matches the runtime. Only remove `| null` / `| undefined` when the stored default is concrete
  and the union member was clearly a mistake.
- **Existing fields: no breaking changes.** Never migrate a stored `null` to `undefined` and
  never remove an existing `| null`. Only widen.
- **`null` is rare and intentional.** It means the runtime does a meaningful `=== null` check.
  If `_getDefaultOptions()` stores `null`, keep it.
- **Object-valued options** (`editing`, `paging`, `dropDownOptions`, …): type is plain `T`
  without `| undefined`. Add `@default` only when `_getDefaultOptions()` stores a value that
  overrides the referenced type's own defaults (e.g. `{ showTitle: false }`). An empty seed
  (`{}`) or an inline object whose sub-properties carry their own `@default` needs none.
- **Callbacks / events** are category A with stored `undefined`:
  `((e: EventInfo) => void) | undefined`, `@default undefined` — unless the field is an
  existing one that stores `null` (then widen to `| null`, as in the Draggable example).
