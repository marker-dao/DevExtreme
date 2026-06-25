# Proposal: optional-field typing convention for the public API

## Links

- **Convention — RU:** https://wiki.devexpress.devx/en/devextreme/product/api/optional-fields-convention
- **Convention — EN:** https://wiki.devexpress.devx/en/devextreme/product/api/optional-fields-convention-en
- **ESLint rule (PR):** [#34137](https://github.com/DevExpress/DevExtreme/pull/34137)
- **Copilot instructions (PR):** [#34134](https://github.com/DevExpress/DevExtreme/pull/34134)
- **Sample PRs:** [#34126](https://github.com/DevExpress/DevExtreme/pull/34126), [#34048](https://github.com/DevExpress/DevExtreme/pull/34048)

---

## In one line

Public `.d.ts` types, JSDoc `@default`, and runtime defaults drift apart — with no single rule.

---

## The problem (why bother)

Every configurable field of a component has three "layers" that should say the same thing:

- **the type** in the public `.d.ts` — what a user is allowed to assign to the field;
- **`@default`** in JSDoc — the default value shown in the docs;
- **the runtime default** (`defaultOptions`) — what the component actually applies when the field isn't set.

There's no single rule for keeping them aligned, so they drift apart. Measured: **630**
mismatches between them. Consequences:

- **The docs don't always match reality:** the public-API `@default` comes from JSDoc — where it
  diverged from the runtime, the user reads a wrong default value.
- **The type isn't always right** — it doesn't reflect how the component actually behaves.
- **No rule for new code:** every new field re-decides "`null` or `undefined`".

## Precedents

1. [T1093403](https://isc.devexpress.com/internal/ticket/details/T1093403)
(I. Kharchenko, 2022): without `| undefined` in the type, the Angular wrapper wouldn't let you
assign `undefined` to the field — `[width]="undefined"`.
2. [T1327930](https://isc.devexpress.com/internal/ticket/details/T1327930)
3. [T1282901](https://isc.devexpress.com/internal/ticket/details/T1282901)

---

## The solution — convention + tooling

1. **Convention** ([RU](https://wiki.devexpress.devx/en/devextreme/product/api/optional-fields-convention)
   / [EN](https://wiki.devexpress.devx/en/devextreme/product/api/optional-fields-convention-en)) —
   a short mechanical rule: how to declare an optional field in the type and what to write in
   `@default`. The answer **follows unambiguously from the component's behavior**. Mandatory for
   **new** code; existing code is not broken (see the next section). The exact wording is at the link.

2. **The tooling is the key part.** You **don't need to keep the convention in your head** — it is
   checked automatically, on two levels:
   - the **linter** ([PR #34137](https://github.com/DevExpress/DevExtreme/pull/34137)) flags
     type-vs-`@default` mismatches right in the editor and on build (`lint-dts`);
   - **review with GitHub Copilot** (the `optional-fields-typing.instructions.md` instructions,
     [PR #34134](https://github.com/DevExpress/DevExtreme/pull/34134)) catches what the linter
     can't: the `undefined`-vs-`null` choice for a new field.

   This isn't "yet another convention to memorize" — it's a tool that **reduces the load**: write a
   field the wrong way and you see the hint right away.

---

## What this means for the public API

In short: **0 breaking changes.**

Strictly by the convention, `null` should be replaced with `undefined` almost everywhere — in the
vast majority of places it isn't justified and is just a historical artifact. But such a
replacement **would break** existing users: it changes both the type's shape and the value the
component returns. So for existing code we **don't do it**. Existing types are changed only
safely — with no changes that break anyone's code. The rule applies in full to **new** code.

> This is already reflected in practice: [PR #34126](https://github.com/DevExpress/DevExtreme/pull/34126)
> reverted not-approved breaking changes (from [#33784](https://github.com/DevExpress/DevExtreme/pull/33784)) —
> **in the common case you don't need to change `null` to `undefined`.** A mass replacement is out
> of scope of this proposal.

---

## The ask

What's needed now: **agree on the convention as common to all teams.** Then:

- the rule and the linter are already done — [ESLint PR #34137](https://github.com/DevExpress/DevExtreme/pull/34137),
  [Copilot instructions PR #34134](https://github.com/DevExpress/DevExtreme/pull/34134);
- a reference for how it's applied — sample PRs
  [#34126](https://github.com/DevExpress/DevExtreme/pull/34126),
  [#34048](https://github.com/DevExpress/DevExtreme/pull/34048);
- each team brings its own fields in order at its own pace;
- new violations show up immediately in the linter; the semantic layer (`undefined`-vs-`null`,
  object options) is held by Copilot review.
