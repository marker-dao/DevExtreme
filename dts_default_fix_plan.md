# DTS `@default` / type mismatch

## Summary by team

| Team | Files | Warnings |
|------|------:|---------:|
| Platforms Squad | 3 | 6 |
| Editors & Navigation Squad | 58 | 271 |
| Grids Squad | 7 | 88 |
| Scheduler Squad | 4 | 52 |
| ASP Tribe | 3 | 72 |
| **Total** | **75** | **489** |

> Platforms is the curated subset (only the 6 callbacks we plan to fix). The other 6 source warnings — `GlobalConfig` (5) + `searchValue` (1) — are excluded as a linter-level concern, not `.d.ts` edits. Full source scope: 77 files / 495 warnings ([dts_default_errors.md](dts_default_errors.md)).

## Summary by verdict

| Verdict | Count | Meaning |
|---------|------:|---------|
| Add `\| null` | 202 | runtime stores `null`; widen type, keep `@default null` |
| Change `@default null` → `undefined` (+ `\| undefined`) | 175 | runtime stores `undefined` (createAction/eventsMap-only, not in defaults, or render-fallback) — `@default null` is wrong |
| Remove `@default` | 51 | Category B (collection/config-item sub-property) or A-obj container that stores a config object — value not retrievable via `.option()` |
| Add `\| undefined` | 32 | runtime stores `undefined`; `@default undefined` already correct, widen type |
| Remove `\| undefined` | 22 | concrete/theme-stored default (incl. 4 sankey value corrections, 1 checkbox three-state) — narrowing |
| False positive — no `.d.ts` edit | 4 | type already includes `null` via `DateLike` alias (linter should resolve aliases) |
| Special — developer decides | 3 | runtime stores a function (`noop` / `defaultScreenFactorFunc` / `defaultOnIncidentOccurred`) |
| **Total** | **489** | |

---

# Platforms Squad  
_6 warnings · 3 files_

### [`js/core/component.d.ts`](packages/devextreme/js/core/component.d.ts) — 3

| Line | Kind | Detail |
|------|------|--------|
| [15](packages/devextreme/js/core/component.d.ts#L15) | null-missing | `@default null` is set, but the type has no `null` |
| [25](packages/devextreme/js/core/component.d.ts#L25) | null-missing | `@default null` is set, but the type has no `null` |
| [37](packages/devextreme/js/core/component.d.ts#L37) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/core/dom_component.d.ts`](packages/devextreme/js/core/dom_component.d.ts) — 2

| Line | Kind | Detail |
|------|------|--------|
| [54](packages/devextreme/js/core/dom_component.d.ts#L54) | null-missing | `@default null` is set, but the type has no `null` |
| [63](packages/devextreme/js/core/dom_component.d.ts#L63) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/widget/ui.widget.d.ts`](packages/devextreme/js/ui/widget/ui.widget.d.ts) — 1

| Line | Kind | Detail |
|------|------|--------|
| [58](packages/devextreme/js/ui/widget/ui.widget.d.ts#L58) | null-missing | `@default null` is set, but the type has no `null` |

---

# Editors & Navigation Squad — Batch 1 (editors/inputs: bases + dropdown/text)

_18 files · 56 warnings · 46 add `\| null` · 3 add `\| undefined` · 1 → `undefined` · 1 narrowing · 1 special · 4 false positives (`DateLike`)_

### [`js/ui/editor/editor.d.ts`](packages/devextreme/js/ui/editor/editor.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [56](packages/devextreme/js/ui/editor/editor.d.ts#L56) | null-missing | `onValueChanged` | Add `\| null` | runtime stores `null` ([editor.ts:120](packages/devextreme/js/__internal/ui/editor/editor.ts#L120)) |
| [69](packages/devextreme/js/ui/editor/editor.d.ts#L69) | null-missing | `validationError`, type `any` | Add `\| null` (`any` field) | runtime stores `null` ([editor.ts:123](packages/devextreme/js/__internal/ui/editor/editor.ts#L123)); `any` hides `null` from linter |
| [75](packages/devextreme/js/ui/editor/editor.d.ts#L75) | null-missing | `validationErrors`, type `Array<any>` | Add `\| null` | runtime stores `null` ([editor.ts:124](packages/devextreme/js/__internal/ui/editor/editor.ts#L124)) |
| [100](packages/devextreme/js/ui/editor/editor.d.ts#L100) | null-missing | `value`, type `any` | Add `\| null` (`any` field) | runtime stores `null` ([editor.ts:118](packages/devextreme/js/__internal/ui/editor/editor.ts#L118)); `any` hides `null` from linter |

### [`js/ui/editor/ui.data_expression.d.ts`](packages/devextreme/js/ui/editor/ui.data_expression.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [55](packages/devextreme/js/ui/editor/ui.data_expression.d.ts#L55) | null-missing | `value`, type `any` | Add `\| null` (`any` field) | runtime stores `null` ([m_data_expression.ts:26](packages/devextreme/js/__internal/ui/editor/m_data_expression.ts#L26)) |

### [`js/ui/text_box/ui.text_editor.base.d.ts`](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [31](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L31) | undefined-missing | `buttons` | Add `\| undefined` | runtime stores `void 0` ([text_editor.base.ts:147](packages/devextreme/js/__internal/ui/text_box/text_editor.base.ts#L147)) |
| [101](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L101) | null-missing | `onChange` | Add `\| null` | runtime stores `null` ([text_editor.base.ts:158](packages/devextreme/js/__internal/ui/text_box/text_editor.base.ts#L158)) |
| [109](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L109) | null-missing | `onCopy` | Add `\| null` | runtime stores `null` ([text_editor.base.ts:161](packages/devextreme/js/__internal/ui/text_box/text_editor.base.ts#L161)) |
| [117](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L117) | null-missing | `onCut` | Add `\| null` | runtime stores `null` ([text_editor.base.ts:160](packages/devextreme/js/__internal/ui/text_box/text_editor.base.ts#L160)) |
| [125](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L125) | null-missing | `onEnterKey` | Add `\| null` | runtime stores `null` ([text_editor.base.ts:163](packages/devextreme/js/__internal/ui/text_box/text_editor.base.ts#L163)) |
| [133](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L133) | null-missing | `onFocusIn` | Add `\| null` | runtime stores `null` ([text_editor.base.ts:154](packages/devextreme/js/__internal/ui/text_box/text_editor.base.ts#L154)) |
| [141](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L141) | null-missing | `onFocusOut` | Add `\| null` | runtime stores `null` ([text_editor.base.ts:155](packages/devextreme/js/__internal/ui/text_box/text_editor.base.ts#L155)) |
| [149](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L149) | null-missing | `onInput` | Add `\| null` | runtime stores `null` ([text_editor.base.ts:159](packages/devextreme/js/__internal/ui/text_box/text_editor.base.ts#L159)) |
| [157](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L157) | null-missing | `onKeyDown` | Add `\| null` | runtime stores `null` ([text_editor.base.ts:156](packages/devextreme/js/__internal/ui/text_box/text_editor.base.ts#L156)) |
| [165](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L165) | null-missing | `onKeyUp` | Add `\| null` | runtime stores `null` ([text_editor.base.ts:157](packages/devextreme/js/__internal/ui/text_box/text_editor.base.ts#L157)) |
| [173](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L173) | null-missing | `onPaste` | Add `\| null` | runtime stores `null` ([text_editor.base.ts:162](packages/devextreme/js/__internal/ui/text_box/text_editor.base.ts#L162)) |

### [`js/ui/collection/ui.collection_widget.base.d.ts`](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [83](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts#L83) | null-missing | `keyExpr` | Add `\| null` | runtime stores `null` ([collection_widget.edit.ts:117](packages/devextreme/js/__internal/ui/collection/collection_widget.edit.ts#L117)) |
| [101](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts#L101) | null-missing | `onItemClick` | Add `\| null` to TS type; keep `@type function` | runtime stores `null` ([collection_widget.base.ts:259](packages/devextreme/js/__internal/ui/collection/collection_widget.base.ts#L259)) |
| [112](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts#L112) | null-missing | `onItemContextMenu` | Add `\| null` | runtime stores `null` ([collection_widget.base.ts:262](packages/devextreme/js/__internal/ui/collection/collection_widget.base.ts#L262)) |
| [123](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts#L123) | null-missing | `onItemHold` | Add `\| null` | runtime stores `null` ([collection_widget.base.ts:260](packages/devextreme/js/__internal/ui/collection/collection_widget.base.ts#L260)) |
| [133](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts#L133) | null-missing | `onItemRendered` | Add `\| null` | runtime stores `null` ([collection_widget.base.ts:258](packages/devextreme/js/__internal/ui/collection/collection_widget.base.ts#L258)) |
| [145](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts#L145) | null-missing | `onSelectionChanging` | Add `\| null` | runtime stores `null` ([collection_widget.edit.ts:121](packages/devextreme/js/__internal/ui/collection/collection_widget.edit.ts#L121)) |
| [156](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts#L156) | null-missing | `onSelectionChanged` | Add `\| null` | runtime stores `null` ([collection_widget.edit.ts:122](packages/devextreme/js/__internal/ui/collection/collection_widget.edit.ts#L122)) |
| [171](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts#L171) | null-missing | `selectedItem`, type `TItem` | Add `\| null` | runtime stores `null` ([collection_widget.edit.ts:120](packages/devextreme/js/__internal/ui/collection/collection_widget.edit.ts#L120)) |

### [`js/ui/widget/ui.search_box_mixin.d.ts`](packages/devextreme/js/ui/widget/ui.search_box_mixin.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [34](packages/devextreme/js/ui/widget/ui.search_box_mixin.d.ts#L34) | null-missing | `searchExpr` | Add `\| null` | mixin defines no own default; consumers store `null` ([list.edit.search.ts:42](packages/devextreme/js/__internal/ui/list/list.edit.search.ts#L42), [drop_down_list.ts:136](packages/devextreme/js/__internal/ui/drop_down_editor/drop_down_list.ts#L136)) |

### [`js/ui/drop_down_editor/ui.drop_down_editor.d.ts`](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_editor.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [95](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_editor.d.ts#L95) | undefined-missing | `buttons` | Add `\| undefined` | runtime stores `void 0` ([drop_down_editor.ts:251](packages/devextreme/js/__internal/ui/drop_down_editor/drop_down_editor.ts#L251)) |
| [122](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_editor.d.ts#L122) | null-missing | `onClosed` | Add `\| null` | runtime stores `null` ([drop_down_editor.ts:239](packages/devextreme/js/__internal/ui/drop_down_editor/drop_down_editor.ts#L239)) |
| [129](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_editor.d.ts#L129) | null-missing | `onOpened` | Add `\| null` | runtime stores `null` ([drop_down_editor.ts:238](packages/devextreme/js/__internal/ui/drop_down_editor/drop_down_editor.ts#L238)) |
| [161](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_editor.d.ts#L161) | null-missing | `value`, type `any` | Add `\| null` (`any` field) | own default `value: null` ([drop_down_editor.ts:237](packages/devextreme/js/__internal/ui/drop_down_editor/drop_down_editor.ts#L237)) |

### [`js/ui/drop_down_editor/ui.drop_down_list.d.ts`](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_list.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [99](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_list.d.ts#L99) | null-missing | `onItemClick` | SPECIAL: do NOT add `\| null`; type already correct, `@default null` is inaccurate (developer to decide) | runtime stores `noop` (a function), not `null` ([drop_down_list.ts:142](packages/devextreme/js/__internal/ui/drop_down_editor/drop_down_list.ts#L142)) |
| [109](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_list.d.ts#L109) | null-missing | `onSelectionChanged` | Add `\| null` | runtime stores `null` ([drop_down_list.ts:141](packages/devextreme/js/__internal/ui/drop_down_editor/drop_down_list.ts#L141)) |
| [121](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_list.d.ts#L121) | null-missing | `onValueChanged` | Add `\| null` | not overridden in drop_down_list; inherited `null` from Editor base ([editor.ts:120](packages/devextreme/js/__internal/ui/editor/editor.ts#L120)) |
| [134](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_list.d.ts#L134) | null-missing | `searchExpr` | Add `\| null` | runtime stores `null` ([drop_down_list.ts:136](packages/devextreme/js/__internal/ui/drop_down_editor/drop_down_list.ts#L136)) |
| [154](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_list.d.ts#L154) | null-missing | `selectedItem`, type `any` | Add `\| null` (`any` field) | runtime stores `null` ([drop_down_list.ts:138](packages/devextreme/js/__internal/ui/drop_down_editor/drop_down_list.ts#L138)) |

### [`js/ui/select_box.d.ts`](packages/devextreme/js/ui/select_box.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [237](packages/devextreme/js/ui/select_box.d.ts#L237) | null-missing | `fieldTemplate` | Add `\| null` | runtime stores `null` ([select_box.ts:215](packages/devextreme/js/__internal/ui/select_box.ts#L215)) |

### [`js/ui/color_box.d.ts`](packages/devextreme/js/ui/color_box.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [202](packages/devextreme/js/ui/color_box.d.ts#L202) | null-missing | `fieldTemplate` | Add `\| null` | runtime stores `null` ([color_box.ts:120](packages/devextreme/js/__internal/ui/color_box/color_box.ts#L120)) |

### [`js/ui/drop_down_box.d.ts`](packages/devextreme/js/ui/drop_down_box.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [216](packages/devextreme/js/ui/drop_down_box.d.ts#L216) | null-missing | `fieldTemplate` | Add `\| null` | not overridden in drop_down_box; inherited `null` ([drop_down_editor.ts:246](packages/devextreme/js/__internal/ui/drop_down_editor/drop_down_editor.ts#L246)) |

### [`js/ui/lookup.d.ts`](packages/devextreme/js/ui/lookup.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [188](packages/devextreme/js/ui/lookup.d.ts#L188) | null-missing | `fieldTemplate` | Add `\| null` | not overridden in lookup; inherited `null` ([drop_down_editor.ts:246](packages/devextreme/js/__internal/ui/drop_down_editor/drop_down_editor.ts#L246)) |
| [223](packages/devextreme/js/ui/lookup.d.ts#L223) | null-missing | `onPageLoading` | Add `\| null` | runtime stores `null` ([lookup.ts:143](packages/devextreme/js/__internal/ui/lookup.ts#L143)) |
| [231](packages/devextreme/js/ui/lookup.d.ts#L231) | null-missing | `onPullRefresh` | Add `\| null` | runtime stores `null` ([lookup.ts:141](packages/devextreme/js/__internal/ui/lookup.ts#L141)) |
| [239](packages/devextreme/js/ui/lookup.d.ts#L239) | null-missing | `onScroll` | Add `\| null` | runtime stores `null` ([lookup.ts:139](packages/devextreme/js/__internal/ui/lookup.ts#L139)) |
| [247](packages/devextreme/js/ui/lookup.d.ts#L247) | null-missing | `onValueChanged` | Add `\| null` | not overridden in lookup; inherited `null` from Editor base ([editor.ts:120](packages/devextreme/js/__internal/ui/editor/editor.ts#L120)) |

### [`js/ui/tag_box.d.ts`](packages/devextreme/js/ui/tag_box.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [246](packages/devextreme/js/ui/tag_box.d.ts#L246) | null-missing | `onMultiTagPreparing` | Add `\| null` | runtime stores `null` ([tag_box.ts:435](packages/devextreme/js/__internal/ui/tag_box.ts#L435)) |
| [254](packages/devextreme/js/ui/tag_box.d.ts#L254) | null-missing | `onSelectAllValueChanged` | Add `\| null` | runtime stores `null` ([tag_box.ts:429](packages/devextreme/js/__internal/ui/tag_box.ts#L429)) |
| [262](packages/devextreme/js/ui/tag_box.d.ts#L262) | null-missing | `onSelectionChanged` | Add `\| null` | not overridden in tag_box; inherited `null` ([drop_down_list.ts:141](packages/devextreme/js/__internal/ui/drop_down_editor/drop_down_list.ts#L141)) |

### [`js/ui/text_box.d.ts`](packages/devextreme/js/ui/text_box.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [155](packages/devextreme/js/ui/text_box.d.ts#L155) | null-missing | `maxLength`, type `string \| number` | Add `\| null` | runtime stores `null` ([text_box.ts:41](packages/devextreme/js/__internal/ui/text_box/text_box.ts#L41)) |

### [`js/ui/number_box.d.ts`](packages/devextreme/js/ui/number_box.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [164](packages/devextreme/js/ui/number_box.d.ts#L164) | undefined-missing | `buttons` | Add `\| undefined` | runtime stores `void 0` ([m_number_box.base.ts:84](packages/devextreme/js/__internal/ui/number_box/m_number_box.base.ts#L84)) |

### [`js/ui/date_box.d.ts`](packages/devextreme/js/ui/date_box.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [215](packages/devextreme/js/ui/date_box.d.ts#L215) | null-missing | `disabledDates` | Add `\| null` | runtime stores `null` ([date_box.base.ts:111](packages/devextreme/js/__internal/ui/date_box/date_box.base.ts#L111)) |
| [245](packages/devextreme/js/ui/date_box.d.ts#L245) | null-missing | `maxLength`, type `string \| number` | Change `@default` to `undefined` + add `\| undefined` (NOT `\| null`) | not stored: no `maxLength` in `date_box.base.ts` or the DropDownEditor chain → `.option('maxLength')` is `undefined` |
| [331](packages/devextreme/js/ui/date_box.d.ts#L331) | null-missing | `displayFormat`, type `Format` | Add `\| null` | runtime stores `null` ([date_box.base.ts:108](packages/devextreme/js/__internal/ui/date_box/date_box.base.ts#L108)) |

### [`js/ui/calendar.d.ts`](packages/devextreme/js/ui/calendar.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [128](packages/devextreme/js/ui/calendar.d.ts#L128) | null-missing | `disabledDates` | Add `\| null` | runtime stores `null` ([calendar.ts:184](packages/devextreme/js/__internal/ui/calendar/calendar.ts#L184)) |

### [`js/ui/check_box.d.ts`](packages/devextreme/js/ui/check_box.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [107](packages/devextreme/js/ui/check_box.d.ts#L107) | concrete+undefined | `value`, type `boolean \| null \| undefined` | Remove `\| undefined` → `boolean \| null` (`null` = three-state). NARROWING of two-way `value` — verify `[value]="undefined"` after wrapper regen | runtime stores `false` ([check_box.tsx:60](packages/devextreme/js/__internal/ui/check_box/check_box.tsx#L60) `defaultValue: false`) |

### False positive — do not edit `.d.ts`

Runtime stores `null`, and the type **already includes `null`** via the `DateLike` alias (= `Date | number | string | null`) → `@default null` is correct. The linter flags these only because it does not resolve aliases — the fix belongs in the linter rule.

| Line | Field | Type | Reason |
|------|-------|------|--------|
| [290](packages/devextreme/js/ui/date_box.d.ts#L290) | `value` | `DateLike` | runtime `null` ([date_box.base.ts:106](packages/devextreme/js/__internal/ui/date_box/date_box.base.ts#L106)); alias already includes `null` |
| [192](packages/devextreme/js/ui/date_range_box.d.ts#L192) | `endDate` | `DateLike` | runtime `null` ([m_date_range_box.ts:100](packages/devextreme/js/__internal/ui/date_range_box/m_date_range_box.ts#L100)); alias already includes `null` |
| [262](packages/devextreme/js/ui/date_range_box.d.ts#L262) | `startDate` | `DateLike` | runtime `null` ([m_date_range_box.ts:133](packages/devextreme/js/__internal/ui/date_range_box/m_date_range_box.ts#L133)); alias already includes `null` |
| [221](packages/devextreme/js/ui/calendar.d.ts#L221) | `value` | `DateLike \| DateLike[]` | runtime `null` ([calendar.ts:170](packages/devextreme/js/__internal/ui/calendar/calendar.ts#L170)); alias already includes `null` |

---

# Editors & Navigation Squad — Batch 2 (navigation & collections)

_10 files · 40 warnings · 38 add `\| null` · 2 → `undefined`_

### [`js/ui/list.d.ts`](packages/devextreme/js/ui/list.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [409](packages/devextreme/js/ui/list.d.ts#L409) | null-missing | `onGroupRendered` | Add `\| null` | runtime stores `null` ([list.base.ts:290](packages/devextreme/js/__internal/ui/list/list.base.ts#L290)) |
| [418](packages/devextreme/js/ui/list.d.ts#L418) | null-missing | `onItemClick` | Add `\| null` to TS type; keep `@type function` | not overridden in list; inherited `null` from collection base ([collection_widget.base.ts:259](packages/devextreme/js/__internal/ui/collection/collection_widget.base.ts#L259)) |
| [426](packages/devextreme/js/ui/list.d.ts#L426) | null-missing | `onItemContextMenu` | Add `\| null` | inherited `null` ([collection_widget.base.ts:262](packages/devextreme/js/__internal/ui/collection/collection_widget.base.ts#L262)) |
| [435](packages/devextreme/js/ui/list.d.ts#L435) | null-missing | `onItemDeleted` | Add `\| null` | inherited `null` ([collection_widget.edit.ts:125](packages/devextreme/js/__internal/ui/collection/collection_widget.edit.ts#L125)) |
| [444](packages/devextreme/js/ui/list.d.ts#L444) | null-missing | `onItemDeleting` | Add `\| null` | inherited `null` ([collection_widget.edit.ts:124](packages/devextreme/js/__internal/ui/collection/collection_widget.edit.ts#L124)) |
| [452](packages/devextreme/js/ui/list.d.ts#L452) | null-missing | `onItemHold` | Add `\| null` | inherited `null` ([collection_widget.base.ts:260](packages/devextreme/js/__internal/ui/collection/collection_widget.base.ts#L260)) |
| [461](packages/devextreme/js/ui/list.d.ts#L461) | null-missing | `onItemReordered` | Add `\| null` | inherited `null` ([collection_widget.edit.ts:123](packages/devextreme/js/__internal/ui/collection/collection_widget.edit.ts#L123)) |
| [469](packages/devextreme/js/ui/list.d.ts#L469) | null-missing | `onItemSwipe` | Add `\| null` | runtime stores `null` ([list.base.ts:287](packages/devextreme/js/__internal/ui/list/list.base.ts#L287)) |
| [477](packages/devextreme/js/ui/list.d.ts#L477) | null-missing | `onPageLoading` | Add `\| null` | runtime stores `null` ([list.base.ts:283](packages/devextreme/js/__internal/ui/list/list.base.ts#L283)) |
| [485](packages/devextreme/js/ui/list.d.ts#L485) | null-missing | `onPullRefresh` | Add `\| null` | runtime stores `null` ([list.base.ts:281](packages/devextreme/js/__internal/ui/list/list.base.ts#L281)) |
| [493](packages/devextreme/js/ui/list.d.ts#L493) | null-missing | `onScroll` | Add `\| null` | runtime stores `null` ([list.base.ts:279](packages/devextreme/js/__internal/ui/list/list.base.ts#L279)) |
| [501](packages/devextreme/js/ui/list.d.ts#L501) | null-missing | `onSelectAllValueChanged` | Add `\| null` | runtime stores `null` ([list.edit.ts:159](packages/devextreme/js/__internal/ui/list/list.edit.ts#L159)) |

### [`js/ui/tree_view.d.ts`](packages/devextreme/js/ui/tree_view.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [266](packages/devextreme/js/ui/tree_view.d.ts#L266) | null-missing | `onItemClick` | Add `\| null` | inherited `null` ([collection_widget.base.ts:259](packages/devextreme/js/__internal/ui/collection/collection_widget.base.ts#L259)) |
| [274](packages/devextreme/js/ui/tree_view.d.ts#L274) | null-missing | `onItemCollapsed` | Add `\| null` | runtime stores `null` ([tree_view.base.ts:285](packages/devextreme/js/__internal/ui/tree_view/tree_view.base.ts#L285)) |
| [282](packages/devextreme/js/ui/tree_view.d.ts#L282) | null-missing | `onItemContextMenu` | Add `\| null` | inherited `null` ([collection_widget.base.ts:262](packages/devextreme/js/__internal/ui/collection/collection_widget.base.ts#L262)) |
| [290](packages/devextreme/js/ui/tree_view.d.ts#L290) | null-missing | `onItemExpanded` | Add `\| null` | runtime stores `null` ([tree_view.base.ts:284](packages/devextreme/js/__internal/ui/tree_view/tree_view.base.ts#L284)) |
| [298](packages/devextreme/js/ui/tree_view.d.ts#L298) | null-missing | `onItemHold` | Add `\| null` | inherited `null` ([collection_widget.base.ts:260](packages/devextreme/js/__internal/ui/collection/collection_widget.base.ts#L260)) |
| [306](packages/devextreme/js/ui/tree_view.d.ts#L306) | null-missing | `onItemRendered` | Add `\| null` | inherited `null` ([collection_widget.base.ts:258](packages/devextreme/js/__internal/ui/collection/collection_widget.base.ts#L258)) |
| [314](packages/devextreme/js/ui/tree_view.d.ts#L314) | null-missing | `onItemSelectionChanged` | Add `\| null` | runtime stores `null` ([tree_view.base.ts:283](packages/devextreme/js/__internal/ui/tree_view/tree_view.base.ts#L283)) |
| [322](packages/devextreme/js/ui/tree_view.d.ts#L322) | null-missing | `onSelectAllValueChanged` | Add `\| null` | runtime stores `null` ([tree_view.base.ts:295](packages/devextreme/js/__internal/ui/tree_view/tree_view.base.ts#L295)) |
| [331](packages/devextreme/js/ui/tree_view.d.ts#L331) | null-missing | `onSelectionChanged` | Add `\| null` | not overridden in tree_view; inherited `null` from collection edit ([collection_widget.edit.ts:122](packages/devextreme/js/__internal/ui/collection/collection_widget.edit.ts#L122)) |

### [`js/ui/menu.d.ts`](packages/devextreme/js/ui/menu.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [218](packages/devextreme/js/ui/menu.d.ts#L218) | null-missing | `onSubmenuHidden` | Add `\| null` | runtime stores `null` ([menu.ts:176](packages/devextreme/js/__internal/ui/menu/menu.ts#L176)) |
| [226](packages/devextreme/js/ui/menu.d.ts#L226) | null-missing | `onSubmenuHiding` | Add `\| null` | runtime stores `null` ([menu.ts:174](packages/devextreme/js/__internal/ui/menu/menu.ts#L174)) |
| [234](packages/devextreme/js/ui/menu.d.ts#L234) | null-missing | `onSubmenuShowing` | Add `\| null` | runtime stores `null` ([menu.ts:170](packages/devextreme/js/__internal/ui/menu/menu.ts#L170)) |
| [242](packages/devextreme/js/ui/menu.d.ts#L242) | null-missing | `onSubmenuShown` | Add `\| null` | runtime stores `null` ([menu.ts:172](packages/devextreme/js/__internal/ui/menu/menu.ts#L172)) |

### [`js/ui/context_menu.d.ts`](packages/devextreme/js/ui/context_menu.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [187](packages/devextreme/js/ui/context_menu.d.ts#L187) | null-missing | `onHidden` | Add `\| null` | runtime stores `null` ([context_menu.ts:190](packages/devextreme/js/__internal/ui/context_menu/context_menu.ts#L190)) |
| [195](packages/devextreme/js/ui/context_menu.d.ts#L195) | null-missing | `onHiding` | Add `\| null` | runtime stores `null` ([context_menu.ts:189](packages/devextreme/js/__internal/ui/context_menu/context_menu.ts#L189)) |
| [203](packages/devextreme/js/ui/context_menu.d.ts#L203) | null-missing | `onPositioning` | Add `\| null` | runtime stores `null` ([context_menu.ts:191](packages/devextreme/js/__internal/ui/context_menu/context_menu.ts#L191)) |
| [211](packages/devextreme/js/ui/context_menu.d.ts#L211) | null-missing | `onShowing` | Add `\| null` | runtime stores `null` ([context_menu.ts:186](packages/devextreme/js/__internal/ui/context_menu/context_menu.ts#L186)) |
| [219](packages/devextreme/js/ui/context_menu.d.ts#L219) | null-missing | `onShown` | Add `\| null` | runtime stores `null` ([context_menu.ts:187](packages/devextreme/js/__internal/ui/context_menu/context_menu.ts#L187)) |

### [`js/ui/accordion.d.ts`](packages/devextreme/js/ui/accordion.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [204](packages/devextreme/js/ui/accordion.d.ts#L204) | null-missing | `onItemTitleClick` | Add `\| null` to TS type; keep `@type function` | runtime stores `null` ([accordion.ts:66](packages/devextreme/js/__internal/ui/accordion.ts#L66)) |

### [`js/ui/tab_panel.d.ts`](packages/devextreme/js/ui/tab_panel.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [227](packages/devextreme/js/ui/tab_panel.d.ts#L227) | null-missing | `onTitleClick` | Add `\| null` to TS type; keep `@type function` | runtime stores `null` ([tab_panel.ts:119](packages/devextreme/js/__internal/ui/tab_panel/tab_panel.ts#L119)) |
| [235](packages/devextreme/js/ui/tab_panel.d.ts#L235) | null-missing | `onTitleHold` | Add `\| null` | runtime stores `null` ([tab_panel.ts:121](packages/devextreme/js/__internal/ui/tab_panel/tab_panel.ts#L121)) |
| [243](packages/devextreme/js/ui/tab_panel.d.ts#L243) | null-missing | `onTitleRendered` | Add `\| null` | runtime stores `null` ([tab_panel.ts:123](packages/devextreme/js/__internal/ui/tab_panel/tab_panel.ts#L123)) |

### [`js/ui/button.d.ts`](packages/devextreme/js/ui/button.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [117](packages/devextreme/js/ui/button.d.ts#L117) | null-missing | `onClick` | Change `@default` to `undefined` + add `\| undefined` (NOT `\| null`) | not in `defaultButtonProps` ([button.tsx:104-116](packages/devextreme/js/__internal/ui/button/button.tsx#L104)) → stored `undefined` |

### [`js/ui/button_group.d.ts`](packages/devextreme/js/ui/button_group.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [129](packages/devextreme/js/ui/button_group.d.ts#L129) | null-missing | `onItemClick` | Add `\| null` | runtime stores `null` ([button_group.ts:183](packages/devextreme/js/__internal/ui/button_group.ts#L183)) |
| [137](packages/devextreme/js/ui/button_group.d.ts#L137) | null-missing | `onSelectionChanged` | Add `\| null` | runtime stores `null` ([button_group.ts:181](packages/devextreme/js/__internal/ui/button_group.ts#L181)) |

### [`js/ui/action_sheet.d.ts`](packages/devextreme/js/ui/action_sheet.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [147](packages/devextreme/js/ui/action_sheet.d.ts#L147) | null-missing | `onCancelClick` | Add `\| null` to TS type; keep `@type function`; remove now-stale `@ts-expect-error` | runtime stores `null` w/ `@ts-expect-error` ([action_sheet.ts:55-56](packages/devextreme/js/__internal/ui/action_sheet.ts#L55)) |
| [242](packages/devextreme/js/ui/action_sheet.d.ts#L242) | null-missing | `onClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | not in `_getDefaultOptions` ([action_sheet.ts:45-70](packages/devextreme/js/__internal/ui/action_sheet.ts#L45), only `onCancelClick`) → stored `undefined` |

### [`js/ui/speed_dial_action.d.ts`](packages/devextreme/js/ui/speed_dial_action.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [100](packages/devextreme/js/ui/speed_dial_action.d.ts#L100) | null-missing | `onContentReady` | Add `\| null` | runtime stores `null` ([m_speed_dial_action.ts:23](packages/devextreme/js/__internal/ui/speed_dial_action/m_speed_dial_action.ts#L23)) |

---

# Editors & Navigation Squad — Batch 3 (overlays, layout & heavy editors)

_15 files · 66 warnings · 48 add `\| null` · 10 → `undefined` (splitter, resizable, html_editor focus) · 7 remove `@default` (not stored) · 1 special_

> "Remove `@default`" rows = the field is **not stored** in runtime (parent config is `null`/absent, so `.option()` never returns it) → the tag is invalid (Category B). "→ undefined" rows = runtime stores `undefined`, not `null`. Where a runtime `null` assignment carries a now-stale `@ts-expect-error` after widening, remove it and re-run `check-types`.

### [`js/ui/overlay.d.ts`](packages/devextreme/js/ui/overlay.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [87](packages/devextreme/js/ui/overlay.d.ts#L87) | null-missing | `maxHeight`, type `number \| string` | Add `\| null` | runtime stores `null` ([overlay.ts:261](packages/devextreme/js/__internal/ui/overlay/overlay.ts#L261)) |
| [93](packages/devextreme/js/ui/overlay.d.ts#L93) | null-missing | `maxWidth`, type `number \| string` | Add `\| null` | runtime stores `null` ([overlay.ts:258](packages/devextreme/js/__internal/ui/overlay/overlay.ts#L258)) |
| [99](packages/devextreme/js/ui/overlay.d.ts#L99) | null-missing | `minHeight`, type `number \| string` | Add `\| null` | runtime stores `null` ([overlay.ts:260](packages/devextreme/js/__internal/ui/overlay/overlay.ts#L260)) |
| [105](packages/devextreme/js/ui/overlay.d.ts#L105) | null-missing | `minWidth`, type `number \| string` | Add `\| null` | runtime stores `null` ([overlay.ts:257](packages/devextreme/js/__internal/ui/overlay/overlay.ts#L257)) |
| [112](packages/devextreme/js/ui/overlay.d.ts#L112) | null-missing | `onHidden` | Add `\| null` | runtime stores `null` ([overlay.ts:287](packages/devextreme/js/__internal/ui/overlay/overlay.ts#L287)) |
| [122](packages/devextreme/js/ui/overlay.d.ts#L122) | null-missing | `onHiding` | Add `\| null` | runtime stores `null` ([overlay.ts:286](packages/devextreme/js/__internal/ui/overlay/overlay.ts#L286)) |
| [132](packages/devextreme/js/ui/overlay.d.ts#L132) | null-missing | `onShowing` | Add `\| null` | runtime stores `null` ([overlay.ts:284](packages/devextreme/js/__internal/ui/overlay/overlay.ts#L284)) |
| [139](packages/devextreme/js/ui/overlay.d.ts#L139) | null-missing | `onShown` | Add `\| null` | runtime stores `null` ([overlay.ts:285](packages/devextreme/js/__internal/ui/overlay/overlay.ts#L285)) |

### [`js/ui/popup.d.ts`](packages/devextreme/js/ui/popup.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [156](packages/devextreme/js/ui/popup.d.ts#L156) | null-missing | `onResize` | Add `\| null` | runtime stores `null` ([popup.ts:264](packages/devextreme/js/__internal/ui/popup/popup.ts#L264)) |
| [166](packages/devextreme/js/ui/popup.d.ts#L166) | null-missing | `onResizeEnd` | Add `\| null` | runtime stores `null` ([popup.ts:265](packages/devextreme/js/__internal/ui/popup/popup.ts#L265)) |
| [176](packages/devextreme/js/ui/popup.d.ts#L176) | null-missing | `onResizeStart` | Add `\| null` | runtime stores `null` ([popup.ts:263](packages/devextreme/js/__internal/ui/popup/popup.ts#L263)) |
| [185](packages/devextreme/js/ui/popup.d.ts#L185) | null-missing | `onTitleRendered` | Add `\| null` | runtime stores `null` ([popup.ts:258](packages/devextreme/js/__internal/ui/popup/popup.ts#L258)) |

### [`js/ui/drawer.d.ts`](packages/devextreme/js/ui/drawer.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [86](packages/devextreme/js/ui/drawer.d.ts#L86) | null-missing | `maxSize`, type `number` | Add `\| null` | runtime stores `null` ([drawer.ts:82](packages/devextreme/js/__internal/ui/drawer/drawer.ts#L82)) |
| [92](packages/devextreme/js/ui/drawer.d.ts#L92) | null-missing | `minSize`, type `number` | Add `\| null` | runtime stores `null` ([drawer.ts:80](packages/devextreme/js/__internal/ui/drawer/drawer.ts#L80)) |

### [`js/ui/splitter.d.ts`](packages/devextreme/js/ui/splitter.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [188](packages/devextreme/js/ui/splitter.d.ts#L188) | null-missing | `onResize` | Change `@default` to `undefined` + add `\| undefined` (NOT `\| null`) | runtime stores `undefined` ([splitter.ts:160](packages/devextreme/js/__internal/ui/splitter/splitter.ts#L160)) |
| [196](packages/devextreme/js/ui/splitter.d.ts#L196) | null-missing | `onResizeEnd` | Change `@default` to `undefined` + add `\| undefined` | runtime stores `undefined` ([splitter.ts:161](packages/devextreme/js/__internal/ui/splitter/splitter.ts#L161)) |
| [204](packages/devextreme/js/ui/splitter.d.ts#L204) | null-missing | `onResizeStart` | Change `@default` to `undefined` + add `\| undefined` | runtime stores `undefined` ([splitter.ts:162](packages/devextreme/js/__internal/ui/splitter/splitter.ts#L162)) |
| [212](packages/devextreme/js/ui/splitter.d.ts#L212) | null-missing | `onItemExpanded` | Change `@default` to `undefined` + add `\| undefined` | runtime stores `undefined` ([splitter.ts:159](packages/devextreme/js/__internal/ui/splitter/splitter.ts#L159)) |
| [220](packages/devextreme/js/ui/splitter.d.ts#L220) | null-missing | `onItemCollapsed` | Change `@default` to `undefined` + add `\| undefined` | runtime stores `undefined` ([splitter.ts:158](packages/devextreme/js/__internal/ui/splitter/splitter.ts#L158)) |

### [`js/ui/load_panel.d.ts`](packages/devextreme/js/ui/load_panel.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [137](packages/devextreme/js/ui/load_panel.d.ts#L137) | null-missing | `animation`, object option | Add `\| null` | runtime stores `null` ([load_panel.ts:50](packages/devextreme/js/__internal/ui/load_panel.ts#L50)) |
| [238](packages/devextreme/js/ui/load_panel.d.ts#L238) | null-missing | `animation.hide` | Remove `@default` | not stored: parent `animation` is `null` ([load_panel.ts:50](packages/devextreme/js/__internal/ui/load_panel.ts#L50)), so `.option('animation.hide')` never returns `null` (Category B) |
| [244](packages/devextreme/js/ui/load_panel.d.ts#L244) | null-missing | `animation.show` | Remove `@default` | not stored: parent `animation` is `null` ([load_panel.ts:50](packages/devextreme/js/__internal/ui/load_panel.ts#L50)) (Category B) |

### [`js/ui/scroll_view.d.ts`](packages/devextreme/js/ui/scroll_view.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [85](packages/devextreme/js/ui/scroll_view.d.ts#L85) | null-missing | `onPullDown` | Add `\| null` | runtime stores `null` ([scroll_view.ts:109](packages/devextreme/js/__internal/ui/scroll_view/scroll_view.ts#L109)) |
| [93](packages/devextreme/js/ui/scroll_view.d.ts#L93) | null-missing | `onReachBottom` | Add `\| null` | runtime stores `null` ([scroll_view.ts:111](packages/devextreme/js/__internal/ui/scroll_view/scroll_view.ts#L111)) |

### [`js/ui/scroll_view/ui.scrollable.d.ts`](packages/devextreme/js/ui/scroll_view/ui.scrollable.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [73](packages/devextreme/js/ui/scroll_view/ui.scrollable.d.ts#L73) | null-missing | `onScroll` | Add `\| null` | runtime stores `null` ([scrollable.ts:90](packages/devextreme/js/__internal/ui/scroll_view/scrollable.ts#L90)) |
| [81](packages/devextreme/js/ui/scroll_view/ui.scrollable.d.ts#L81) | null-missing | `onUpdated` | Add `\| null` | runtime stores `null` ([scrollable.ts:97](packages/devextreme/js/__internal/ui/scroll_view/scrollable.ts#L97)) |

### [`js/ui/resizable.d.ts`](packages/devextreme/js/ui/resizable.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [136](packages/devextreme/js/ui/resizable.d.ts#L136) | null-missing | `onResize` | Change `@default` to `undefined` + add `\| undefined` (NOT `\| null`) | not in `_getDefaultOptions` ([resizable.ts:113-126](packages/devextreme/js/__internal/ui/resizable/resizable.ts#L113)); registered via `_createActionByOption` ([resizable.ts:147](packages/devextreme/js/__internal/ui/resizable/resizable.ts#L147)) → stored `undefined` |
| [144](packages/devextreme/js/ui/resizable.d.ts#L144) | null-missing | `onResizeEnd` | Change `@default` to `undefined` + add `\| undefined` | not in `_getDefaultOptions`; registered via `_createActionByOption` ([resizable.ts:146](packages/devextreme/js/__internal/ui/resizable/resizable.ts#L146)) → stored `undefined` |
| [152](packages/devextreme/js/ui/resizable.d.ts#L152) | null-missing | `onResizeStart` | Change `@default` to `undefined` + add `\| undefined` | not in `_getDefaultOptions`; registered via `_createActionByOption` ([resizable.ts:145](packages/devextreme/js/__internal/ui/resizable/resizable.ts#L145)) → stored `undefined` |

### [`js/ui/responsive_box.d.ts`](packages/devextreme/js/ui/responsive_box.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [178](packages/devextreme/js/ui/responsive_box.d.ts#L178) | null-missing | `screenByWidth`, type `Function` | Add `\| null` | runtime stores `null` ([responsive_box.ts:101](packages/devextreme/js/__internal/ui/responsive_box.ts#L101)) |

### [`js/ui/range_slider.d.ts`](packages/devextreme/js/ui/range_slider.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [91](packages/devextreme/js/ui/range_slider.d.ts#L91) | null-missing | `onValueChanged` | Add `\| null` | not overridden in `m_range_slider.ts`; inherited `null` from Editor base ([editor.ts:120](packages/devextreme/js/__internal/ui/editor/editor.ts#L120)) |

### [`js/ui/progress_bar.d.ts`](packages/devextreme/js/ui/progress_bar.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [77](packages/devextreme/js/ui/progress_bar.d.ts#L77) | null-missing | `onComplete` | Add `\| null` | runtime stores `null` ([m_progress_bar.ts:47](packages/devextreme/js/__internal/ui/m_progress_bar.ts#L47)) |

### [`js/ui/file_uploader.d.ts`](packages/devextreme/js/ui/file_uploader.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [310](packages/devextreme/js/ui/file_uploader.d.ts#L310) | null-missing | `onBeforeSend` | Add `\| null` | runtime stores `null` ([file_uploader.ts:209](packages/devextreme/js/__internal/ui/file_uploader/file_uploader.ts#L209)) |
| [318](packages/devextreme/js/ui/file_uploader.d.ts#L318) | null-missing | `onDropZoneEnter` | Add `\| null` | runtime stores `null` ([file_uploader.ts:217](packages/devextreme/js/__internal/ui/file_uploader/file_uploader.ts#L217)) |
| [326](packages/devextreme/js/ui/file_uploader.d.ts#L326) | null-missing | `onDropZoneLeave` | Add `\| null` | runtime stores `null` ([file_uploader.ts:218](packages/devextreme/js/__internal/ui/file_uploader/file_uploader.ts#L218)) |
| [334](packages/devextreme/js/ui/file_uploader.d.ts#L334) | null-missing | `onFilesUploaded` | Add `\| null` | runtime stores `null` ([file_uploader.ts:212](packages/devextreme/js/__internal/ui/file_uploader/file_uploader.ts#L212)) |
| [342](packages/devextreme/js/ui/file_uploader.d.ts#L342) | null-missing | `onProgress` | Add `\| null` | runtime stores `null` ([file_uploader.ts:214](packages/devextreme/js/__internal/ui/file_uploader/file_uploader.ts#L214)) |
| [350](packages/devextreme/js/ui/file_uploader.d.ts#L350) | null-missing | `onUploadAborted` | Add `\| null` | runtime stores `null` ([file_uploader.ts:216](packages/devextreme/js/__internal/ui/file_uploader/file_uploader.ts#L216)) |
| [358](packages/devextreme/js/ui/file_uploader.d.ts#L358) | null-missing | `onUploadError` | Add `\| null` | runtime stores `null` ([file_uploader.ts:215](packages/devextreme/js/__internal/ui/file_uploader/file_uploader.ts#L215)) |
| [366](packages/devextreme/js/ui/file_uploader.d.ts#L366) | null-missing | `onUploadStarted` | Add `\| null` | runtime stores `null` ([file_uploader.ts:210](packages/devextreme/js/__internal/ui/file_uploader/file_uploader.ts#L210)) |
| [374](packages/devextreme/js/ui/file_uploader.d.ts#L374) | null-missing | `onUploaded` | Add `\| null` | runtime stores `null` ([file_uploader.ts:211](packages/devextreme/js/__internal/ui/file_uploader/file_uploader.ts#L211)) |
| [382](packages/devextreme/js/ui/file_uploader.d.ts#L382) | null-missing | `onValueChanged` | Add `\| null` | not overridden in `file_uploader.ts`; inherited `null` from Editor base ([editor.ts:120](packages/devextreme/js/__internal/ui/editor/editor.ts#L120)) |

### [`js/ui/form.d.ts`](packages/devextreme/js/ui/form.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [276](packages/devextreme/js/ui/form.d.ts#L276) | null-missing | `onEditorEnterKey` | Add `\| null` | runtime stores `null` ([form.ts:211](packages/devextreme/js/__internal/ui/form/form.ts#L211)) |
| [284](packages/devextreme/js/ui/form.d.ts#L284) | null-missing | `onFieldDataChanged` | Add `\| null` | runtime stores `null` ([form.ts:207](packages/devextreme/js/__internal/ui/form/form.ts#L207)) |
| [292](packages/devextreme/js/ui/form.d.ts#L292) | null-missing | `onSmartPasting` | Add `\| null` | runtime stores `null` ([form.ts:229](packages/devextreme/js/__internal/ui/form/form.ts#L229)) |
| [300](packages/devextreme/js/ui/form.d.ts#L300) | null-missing | `onSmartPasted` | Add `\| null` | runtime stores `null` ([form.ts:231](packages/devextreme/js/__internal/ui/form/form.ts#L231)) |
| [330](packages/devextreme/js/ui/form.d.ts#L330) | null-missing | `screenByWidth`, type `Function` | SPECIAL: do NOT add `\| null`; `@default null` is inaccurate (developer to correct) | runtime stores a function `defaultScreenFactorFunc`, not `null` ([form.ts:203](packages/devextreme/js/__internal/ui/form/form.ts#L203)) |
| [768](packages/devextreme/js/ui/form.d.ts#L768) | undefined-missing | `label` (Form item field) | Remove `@default` | not stored: `_getDefaultOptions` has no `items` ([form.ts:197](packages/devextreme/js/__internal/ui/form/form.ts#L197)) → `item.label` never returned by `.option()` (Category B) |
| [820](packages/devextreme/js/ui/form.d.ts#L820) | undefined-missing | `validationRules` (Form item field) | Remove `@default` | not stored: `_getDefaultOptions` has no `items` ([form.ts:197](packages/devextreme/js/__internal/ui/form/form.ts#L197)) (Category B) |
| [881](packages/devextreme/js/ui/form.d.ts#L881) | undefined-missing | `tabs` (Form item field) | Remove `@default` | not stored: `_getDefaultOptions` has no `items` ([form.ts:197](packages/devextreme/js/__internal/ui/form/form.ts#L197)) (Category B) |

### [`js/ui/html_editor.d.ts`](packages/devextreme/js/ui/html_editor.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [314](packages/devextreme/js/ui/html_editor.d.ts#L314) | null-missing | `mediaResizing`, object option | Add `\| null`; remove now-stale `@ts-expect-error` | runtime stores `null` w/ `@ts-expect-error` ([html_editor.ts:127](packages/devextreme/js/__internal/ui/html_editor/html_editor.ts#L127)) |
| [320](packages/devextreme/js/ui/html_editor.d.ts#L320) | null-missing | `tableResizing`, object option | Add `\| null`; remove now-stale `@ts-expect-error` | runtime stores `null` w/ `@ts-expect-error` ([html_editor.ts:135](packages/devextreme/js/__internal/ui/html_editor/html_editor.ts#L135)) |
| [326](packages/devextreme/js/ui/html_editor.d.ts#L326) | null-missing | `mentions`, array option | Add `\| null`; remove now-stale `@ts-expect-error` | runtime stores `null` w/ `@ts-expect-error` ([html_editor.ts:129](packages/devextreme/js/__internal/ui/html_editor/html_editor.ts#L129)) |
| [332](packages/devextreme/js/ui/html_editor.d.ts#L332) | null-missing | `tableContextMenu`, object option | Add `\| null`; remove now-stale `@ts-expect-error` | runtime stores `null` w/ `@ts-expect-error` ([html_editor.ts:133](packages/devextreme/js/__internal/ui/html_editor/html_editor.ts#L133)) |
| [372](packages/devextreme/js/ui/html_editor.d.ts#L372) | null-missing | `toolbar`, object option | Add `\| null`; remove now-stale `@ts-expect-error` | runtime stores `null` w/ `@ts-expect-error` ([html_editor.ts:137](packages/devextreme/js/__internal/ui/html_editor/html_editor.ts#L137)) |
| [378](packages/devextreme/js/ui/html_editor.d.ts#L378) | null-missing | `variables`, object option | Add `\| null`; remove now-stale `@ts-expect-error` | runtime stores `null` w/ `@ts-expect-error` ([html_editor.ts:139](packages/devextreme/js/__internal/ui/html_editor/html_editor.ts#L139)) |
| [352](packages/devextreme/js/ui/html_editor.d.ts#L352) | null-missing | `onFocusIn` | Change `@default` to `undefined` + add `\| undefined` | not in `_getDefaultOptions` ([html_editor.ts:109-150](packages/devextreme/js/__internal/ui/html_editor/html_editor.ts#L109)) → stored `undefined` |
| [360](packages/devextreme/js/ui/html_editor.d.ts#L360) | null-missing | `onFocusOut` | Change `@default` to `undefined` + add `\| undefined` | not in `_getDefaultOptions` → stored `undefined` |
| [645](packages/devextreme/js/ui/html_editor.d.ts#L645) | null-missing | `fileUploaderOptions` (imageUpload config field) | Remove `@default` | not stored: parent `imageUpload` is `null` ([html_editor.ts:125](packages/devextreme/js/__internal/ui/html_editor/html_editor.ts#L125)) (Category B) |
| [772](packages/devextreme/js/ui/html_editor.d.ts#L772) | null-missing | `mention.template` (mention config field) | Remove `@default` | not stored: parent `mentions` is `null` ([html_editor.ts:129](packages/devextreme/js/__internal/ui/html_editor/html_editor.ts#L129)) (Category B) |

### [`js/ui/map.d.ts`](packages/devextreme/js/ui/map.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [273](packages/devextreme/js/ui/map.d.ts#L273) | null-missing | `onClick` | Add `\| null` to TS type; keep `@type function` | runtime stores `null` ([map.ts:115](packages/devextreme/js/__internal/ui/map/map.ts#L115)) |
| [281](packages/devextreme/js/ui/map.d.ts#L281) | null-missing | `onMarkerAdded` | Add `\| null` | runtime stores `null` ([map.ts:91](packages/devextreme/js/__internal/ui/map/map.ts#L91)) |
| [289](packages/devextreme/js/ui/map.d.ts#L289) | null-missing | `onMarkerRemoved` | Add `\| null` | runtime stores `null` ([map.ts:93](packages/devextreme/js/__internal/ui/map/map.ts#L93)) |
| [297](packages/devextreme/js/ui/map.d.ts#L297) | null-missing | `onReady` | Add `\| null` | runtime stores `null` ([map.ts:110](packages/devextreme/js/__internal/ui/map/map.ts#L110)) |
| [305](packages/devextreme/js/ui/map.d.ts#L305) | null-missing | `onRouteAdded` | Add `\| null` | runtime stores `null` ([map.ts:96](packages/devextreme/js/__internal/ui/map/map.ts#L96)) |
| [313](packages/devextreme/js/ui/map.d.ts#L313) | null-missing | `onRouteRemoved` | Add `\| null` | runtime stores `null` ([map.ts:98](packages/devextreme/js/__internal/ui/map/map.ts#L98)) |

---

# Editors & Navigation Squad — Batch 4 (viz: bases + charts)

_7 files · 50 warnings · 27 → `undefined` (callbacks + title) · 11 add `\| undefined` · 6 remove `\| undefined` (theme-stored) · 4 `'solid'` → `undefined` (render fallback) · 1 add `\| null` · 1 special_

> **Viz mechanics:** widget defaults live in themes, not `_getDefaultOptions`. Callbacks are registered in `_eventsMap` (m_base_chart.ts:277-289, m_base_widget.ts:118-121) and are **not** stored → `.option()` returns `undefined`, not `null`. Series sub-property defaults come from the theme (`themes/generic/light/chart.ts`) — those that ARE themed round-trip via `.option()`; those only applied at render (`|| 'solid'`) do not. "Remove `\| undefined`" rows narrow a partial-config sub-property — verify on wrapper regen.

### [`js/viz/common.d.ts`](packages/devextreme/js/viz/common.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [250](packages/devextreme/js/viz/common.d.ts#L250) | null-missing | `title.subtitle.text` | Change `@default` to `undefined` + add `\| undefined` | themed `title` object has no `subtitle.text` key ([themes/generic/light/index.ts:45-52](packages/devextreme/js/__internal/viz/core/themes/generic/light/index.ts#L45)) → stored `undefined` |
| [256](packages/devextreme/js/viz/common.d.ts#L256) | null-missing | `title.text` | Change `@default` to `undefined` + add `\| undefined` | themed `title` object has no `text` key ([index.ts:38-55](packages/devextreme/js/__internal/viz/core/themes/generic/light/index.ts#L38)) → stored `undefined` |

### [`js/viz/core/base_widget.d.ts`](packages/devextreme/js/viz/core/base_widget.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [122](packages/devextreme/js/viz/core/base_widget.d.ts#L122) | null-missing | `onDrawn` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([m_base_widget.ts:120](packages/devextreme/js/__internal/viz/core/m_base_widget.ts#L120)); not in `_getDefaultOptions` (m_base_widget.ts:123-127) → `undefined` |
| [129](packages/devextreme/js/viz/core/base_widget.d.ts#L129) | null-missing | `onExported` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only; not in `_getDefaultOptions` ([m_base_widget.ts:123](packages/devextreme/js/__internal/viz/core/m_base_widget.ts#L123)) → `undefined` |
| [138](packages/devextreme/js/viz/core/base_widget.d.ts#L138) | null-missing | `onExporting` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only; not in `_getDefaultOptions` (m_base_widget.ts:123) → `undefined` |
| [146](packages/devextreme/js/viz/core/base_widget.d.ts#L146) | null-missing | `onFileSaving` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only; not in `_getDefaultOptions` (m_base_widget.ts:123) → `undefined` |
| [155](packages/devextreme/js/viz/core/base_widget.d.ts#L155) | null-missing | `onIncidentOccurred` | SPECIAL: do NOT add `\| null`; `@default null` inaccurate (developer to correct) | runtime stores a function `defaultOnIncidentOccurred` ([m_base_widget.ts:125](packages/devextreme/js/__internal/viz/core/m_base_widget.ts#L125)) |
| [425](packages/devextreme/js/viz/core/base_widget.d.ts#L425) | null-missing | `title.subtitle.text` | Change `@default` to `undefined` + add `\| undefined` | themed `title` has no `subtitle.text` ([index.ts:45-52](packages/devextreme/js/__internal/viz/core/themes/generic/light/index.ts#L45)) → `undefined` |
| [442](packages/devextreme/js/viz/core/base_widget.d.ts#L442) | null-missing | `title.text` | Change `@default` to `undefined` + add `\| undefined` | themed `title` has no `text` ([index.ts:38-55](packages/devextreme/js/__internal/viz/core/themes/generic/light/index.ts#L38)) → `undefined` |

### [`js/viz/chart_components/base_chart.d.ts`](packages/devextreme/js/viz/chart_components/base_chart.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [212](packages/devextreme/js/viz/chart_components/base_chart.d.ts#L212) | null-missing | `onDone` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([m_base_chart.ts:286](packages/devextreme/js/__internal/viz/chart_components/m_base_chart.ts#L286)) → `undefined` |
| [225](packages/devextreme/js/viz/chart_components/base_chart.d.ts#L225) | null-missing | `onPointClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | eventsMap-only ([m_base_chart.ts:279](packages/devextreme/js/__internal/viz/chart_components/m_base_chart.ts#L279)) → `undefined` |
| [258](packages/devextreme/js/viz/chart_components/base_chart.d.ts#L258) | null-missing | `onTooltipHidden` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([tooltip.ts:496](packages/devextreme/js/__internal/viz/core/tooltip.ts#L496)) → `undefined` |
| [269](packages/devextreme/js/viz/chart_components/base_chart.d.ts#L269) | null-missing | `onTooltipShown` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([tooltip.ts:495](packages/devextreme/js/__internal/viz/core/tooltip.ts#L495)) → `undefined` |

### [`js/viz/chart.d.ts`](packages/devextreme/js/viz/chart.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [1357](packages/devextreme/js/viz/chart.d.ts#L1357) | null-missing | `onArgumentAxisClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | eventsMap-only ([m_base_chart.ts:280](packages/devextreme/js/__internal/viz/chart_components/m_base_chart.ts#L280)) → `undefined` |
| [1367](packages/devextreme/js/viz/chart.d.ts#L1367) | null-missing | `onLegendClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | eventsMap-only ([m_base_chart.ts:281](packages/devextreme/js/__internal/viz/chart_components/m_base_chart.ts#L281)) → `undefined` |
| [1377](packages/devextreme/js/viz/chart.d.ts#L1377) | null-missing | `onSeriesClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | eventsMap-only ([m_base_chart.ts:278](packages/devextreme/js/__internal/viz/chart_components/m_base_chart.ts#L278)) → `undefined` |
| [1386](packages/devextreme/js/viz/chart.d.ts#L1386) | null-missing | `onSeriesHoverChanged` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([m_base_chart.ts:284](packages/devextreme/js/__internal/viz/chart_components/m_base_chart.ts#L284)) → `undefined` |
| [1395](packages/devextreme/js/viz/chart.d.ts#L1395) | null-missing | `onSeriesSelectionChanged` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([m_base_chart.ts:282](packages/devextreme/js/__internal/viz/chart_components/m_base_chart.ts#L282)) → `undefined` |
| [1404](packages/devextreme/js/viz/chart.d.ts#L1404) | null-missing | `onZoomEnd` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([m_base_chart.ts:288](packages/devextreme/js/__internal/viz/chart_components/m_base_chart.ts#L288)) → `undefined` |
| [1413](packages/devextreme/js/viz/chart.d.ts#L1413) | null-missing | `onZoomStart` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([m_base_chart.ts:287](packages/devextreme/js/__internal/viz/chart_components/m_base_chart.ts#L287)) → `undefined` |
| [1497](packages/devextreme/js/viz/chart.d.ts#L1497) | undefined-missing | `seriesTemplate` | Add `\| undefined` | stored `undefined` — `mergeOptions` returns user value or `undefined` ([chart_theme_manager.ts:178](packages/devextreme/js/__internal/viz/components/chart_theme_manager.ts#L178)) |
| [1623](packages/devextreme/js/viz/chart.d.ts#L1623) | undefined-missing | `argumentAxis.breaks` | Add `\| undefined` | not in theme → `.option()` returns `undefined` (point-of-use `\|\| []`) |
| [1655](packages/devextreme/js/viz/chart.d.ts#L1655) | undefined-missing | `argumentAxis.holidays` | Add `\| undefined` | not in theme → `undefined` (point-of-use, [xy_axes.ts:1143](packages/devextreme/js/__internal/viz/axes/xy_axes.ts#L1143)) |
| [1688](packages/devextreme/js/viz/chart.d.ts#L1688) | undefined-missing | `argumentAxis.minVisualRangeLength` | Add `\| undefined` | not in theme → `undefined` ([base_axis.ts:2496](packages/devextreme/js/__internal/viz/axes/base_axis.ts#L2496)) |
| [1731](packages/devextreme/js/viz/chart.d.ts#L1731) | undefined-missing | `argumentAxis.singleWorkdays` | Add `\| undefined` | not in theme → `undefined` (point-of-use, [xy_axes.ts:1142](packages/devextreme/js/__internal/viz/axes/xy_axes.ts#L1142)) |
| [2146](packages/devextreme/js/viz/chart.d.ts#L2146) | null-missing | `commonAxisSettings.placeholderSize`, type `number` | Add `\| null` | theme stores `null` ([chart.ts:108](packages/devextreme/js/__internal/viz/core/themes/generic/light/chart.ts#L108)) |
| [2744](packages/devextreme/js/viz/chart.d.ts#L2744) | undefined-missing | `valueAxis.breaks` | Add `\| undefined` | not in theme → `undefined` (point-of-use `\|\| []`) |
| [2803](packages/devextreme/js/viz/chart.d.ts#L2803) | undefined-missing | `valueAxis.minVisualRangeLength` | Add `\| undefined` | not in theme → `undefined` ([base_axis.ts:2496](packages/devextreme/js/__internal/viz/axes/base_axis.ts#L2496)) |
| [4025](packages/devextreme/js/viz/chart.d.ts#L4025) | concrete+undefined | `CommonSeries.hoverStyle.border.dashStyle`, `@default 'solid'` | Change `@default` to `undefined`, keep `\| undefined` | NOT in theme (`hoverStyle.border` = visible+width only, [chart.ts:31-34](packages/devextreme/js/__internal/viz/core/themes/generic/light/chart.ts#L31)); `'solid'` is render fallback ([bar_series.ts:52](packages/devextreme/js/__internal/viz/series/bar_series.ts#L52)) → stored `undefined` |
| [4123](packages/devextreme/js/viz/chart.d.ts#L4123) | concrete+undefined | `CommonSeries.selectionStyle.border.dashStyle`, `@default 'solid'` | Change `@default` to `undefined`, keep `\| undefined` | NOT in theme (`selectionStyle.border` = visible+width only, chart.ts:44-46); `'solid'` is render fallback (bar_series.ts:52) → stored `undefined` |

### [`js/viz/pie_chart.d.ts`](packages/devextreme/js/viz/pie_chart.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [359](packages/devextreme/js/viz/pie_chart.d.ts#L359) | null-missing | `onLegendClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | eventsMap-only (inherits BaseChart, [m_base_chart.ts:281](packages/devextreme/js/__internal/viz/chart_components/m_base_chart.ts#L281)) → `undefined` |
| [392](packages/devextreme/js/viz/pie_chart.d.ts#L392) | undefined-missing | `seriesTemplate` | Add `\| undefined` | stored `undefined` ([chart_theme_manager.ts:178](packages/devextreme/js/__internal/viz/components/chart_theme_manager.ts#L178)) |
| [742](packages/devextreme/js/viz/pie_chart.d.ts#L742) | concrete+undefined | `label.border.color`, `@default '#d3d3d3'` | Remove `\| undefined` (keep `@default`) | theme stores `'#d3d3d3'` (inherited `chart:common` via [themes.ts:164](packages/devextreme/js/__internal/viz/themes.ts#L164) → [chart.ts:73](packages/devextreme/js/__internal/viz/core/themes/generic/light/chart.ts#L73)) |
| [747](packages/devextreme/js/viz/pie_chart.d.ts#L747) | concrete+undefined | `label.border.dashStyle`, `@default 'solid'` | Remove `\| undefined` (keep `@default`) | theme stores `'solid'` (inherited from [chart.ts:74](packages/devextreme/js/__internal/viz/core/themes/generic/light/chart.ts#L74)) |

### [`js/viz/polar_chart.d.ts`](packages/devextreme/js/viz/polar_chart.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [447](packages/devextreme/js/viz/polar_chart.d.ts#L447) | null-missing | `onArgumentAxisClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | eventsMap-only ([m_base_chart.ts:280](packages/devextreme/js/__internal/viz/chart_components/m_base_chart.ts#L280)) → `undefined` |
| [457](packages/devextreme/js/viz/polar_chart.d.ts#L457) | null-missing | `onLegendClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | eventsMap-only ([m_base_chart.ts:281](packages/devextreme/js/__internal/viz/chart_components/m_base_chart.ts#L281)) → `undefined` |
| [467](packages/devextreme/js/viz/polar_chart.d.ts#L467) | null-missing | `onSeriesClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | eventsMap-only ([m_base_chart.ts:278](packages/devextreme/js/__internal/viz/chart_components/m_base_chart.ts#L278)) → `undefined` |
| [476](packages/devextreme/js/viz/polar_chart.d.ts#L476) | null-missing | `onSeriesHoverChanged` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([m_base_chart.ts:284](packages/devextreme/js/__internal/viz/chart_components/m_base_chart.ts#L284)) → `undefined` |
| [485](packages/devextreme/js/viz/polar_chart.d.ts#L485) | null-missing | `onSeriesSelectionChanged` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([m_base_chart.ts:282](packages/devextreme/js/__internal/viz/chart_components/m_base_chart.ts#L282)) → `undefined` |
| [494](packages/devextreme/js/viz/polar_chart.d.ts#L494) | null-missing | `onZoomEnd` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([m_base_chart.ts:288](packages/devextreme/js/__internal/viz/chart_components/m_base_chart.ts#L288)) → `undefined` |
| [503](packages/devextreme/js/viz/polar_chart.d.ts#L503) | null-missing | `onZoomStart` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([m_base_chart.ts:287](packages/devextreme/js/__internal/viz/chart_components/m_base_chart.ts#L287)) → `undefined` |
| [531](packages/devextreme/js/viz/polar_chart.d.ts#L531) | undefined-missing | `seriesTemplate` | Add `\| undefined` | stored `undefined` ([chart_theme_manager.ts:178](packages/devextreme/js/__internal/viz/components/chart_theme_manager.ts#L178)) |
| [1327](packages/devextreme/js/viz/polar_chart.d.ts#L1327) | undefined-missing | `argumentAxis.minVisualRangeLength` | Add `\| undefined` | not in theme → `undefined` ([base_axis.ts:2496](packages/devextreme/js/__internal/viz/axes/base_axis.ts#L2496)) |
| [1763](packages/devextreme/js/viz/polar_chart.d.ts#L1763) | concrete+undefined | `hoverStyle.border.dashStyle`, `@default 'solid'` | Change `@default` to `undefined`, keep `\| undefined` | NOT in theme; `'solid'` is render fallback ([bar_series.ts:52](packages/devextreme/js/__internal/viz/series/bar_series.ts#L52)) → stored `undefined` |
| [1890](packages/devextreme/js/viz/polar_chart.d.ts#L1890) | concrete+undefined | `selectionStyle.border.dashStyle`, `@default 'solid'` | Change `@default` to `undefined`, keep `\| undefined` | NOT in theme; `'solid'` is render fallback (bar_series.ts:52) → stored `undefined` |
| [2068](packages/devextreme/js/viz/polar_chart.d.ts#L2068) | concrete+undefined | `label.border.color`, `@default '#d3d3d3'` | Remove `\| undefined` (keep `@default`) | theme stores `'#d3d3d3'` (inherited from [chart.ts:73](packages/devextreme/js/__internal/viz/core/themes/generic/light/chart.ts#L73)) |
| [2073](packages/devextreme/js/viz/polar_chart.d.ts#L2073) | concrete+undefined | `label.border.dashStyle`, `@default 'solid'` | Remove `\| undefined` (keep `@default`) | theme stores `'solid'` (inherited from [chart.ts:74](packages/devextreme/js/__internal/viz/core/themes/generic/light/chart.ts#L74)) |

### [`js/common/charts.d.ts`](packages/devextreme/js/common/charts.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [258](packages/devextreme/js/common/charts.d.ts#L258) | undefined-missing | `VizTimeInterval.length` | Add `\| undefined` | not in theme/`_getDefaultOptions` → `.option()` returns `undefined` |
| [643](packages/devextreme/js/common/charts.d.ts#L643) | concrete+undefined | `CommonSeries.label.border.color`, `@default '#d3d3d3'` | Remove `\| undefined` (keep `@default`) | theme stores `'#d3d3d3'` = `LIGHT_GREY` ([chart.ts:73](packages/devextreme/js/__internal/viz/core/themes/generic/light/chart.ts#L73), [contants.ts:3](packages/devextreme/js/__internal/viz/core/themes/generic/light/contants.ts#L3)) |
| [648](packages/devextreme/js/common/charts.d.ts#L648) | concrete+undefined | `CommonSeries.label.border.dashStyle`, `@default 'solid'` | Remove `\| undefined` (keep `@default`) | theme stores `'solid'` = `SOLID` ([chart.ts:74](packages/devextreme/js/__internal/viz/core/themes/generic/light/chart.ts#L74)) |

---

# Editors & Navigation Squad — Batch 5 (viz: gauges, maps, sankey, funnel, tree map)

_8 files · 59 warnings · 27 → `undefined` (callbacks) · 13 add `\| undefined` · 11 remove `\| undefined` (theme matches) · 4 `@default` → theme value (theme differs) · 4 concrete → `undefined` (not stored)_

> Same viz mechanics as Batch 4 (theme files + `_eventsMap` + render fallback). Two atomic findings worth highlighting: (1) several sankey border `@default` values are **wrong** — the theme stores a different concrete value; (2) several tree_map border-`color` sub-properties document a color but the theme border object has **no color** → stored `undefined`.

### [`js/viz/bar_gauge.d.ts`](packages/devextreme/js/viz/bar_gauge.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [308](packages/devextreme/js/viz/bar_gauge.d.ts#L308) | null-missing | `onTooltipHidden` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([tooltip.ts:496](packages/devextreme/js/__internal/viz/core/tooltip.ts#L496)) → `undefined` |
| [317](packages/devextreme/js/viz/bar_gauge.d.ts#L317) | null-missing | `onTooltipShown` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([tooltip.ts:495](packages/devextreme/js/__internal/viz/core/tooltip.ts#L495)) → `undefined` |

### [`js/viz/gauges/base_gauge.d.ts`](packages/devextreme/js/viz/gauges/base_gauge.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [81](packages/devextreme/js/viz/gauges/base_gauge.d.ts#L81) | null-missing | `onTooltipHidden` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([tooltip.ts:496](packages/devextreme/js/__internal/viz/core/tooltip.ts#L496)) → `undefined` |
| [92](packages/devextreme/js/viz/gauges/base_gauge.d.ts#L92) | null-missing | `onTooltipShown` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([tooltip.ts:495](packages/devextreme/js/__internal/viz/core/tooltip.ts#L495)) → `undefined` |
| [112](packages/devextreme/js/viz/gauges/base_gauge.d.ts#L112) | undefined-missing | `subvalues` | Add `\| undefined` | `@notUsedInTheme`; no `_getDefaultOptions` in `js/__internal/viz/gauges/` → `undefined` |
| [234](packages/devextreme/js/viz/gauges/base_gauge.d.ts#L234) | undefined-missing | `scale.customMinorTicks` | Add `\| undefined` | not in gauge theme `scale` ([gauge.ts:7-28](packages/devextreme/js/__internal/viz/core/themes/generic/light/gauge.ts#L7)) → `undefined` |
| [241](packages/devextreme/js/viz/gauges/base_gauge.d.ts#L241) | undefined-missing | `scale.customTicks` | Add `\| undefined` | not in gauge theme `scale` → `undefined` |

### [`js/viz/sparklines/base_sparkline.d.ts`](packages/devextreme/js/viz/sparklines/base_sparkline.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [47](packages/devextreme/js/viz/sparklines/base_sparkline.d.ts#L47) | null-missing | `onTooltipHidden` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([tooltip.ts:496](packages/devextreme/js/__internal/viz/core/tooltip.ts#L496)) → `undefined` |
| [55](packages/devextreme/js/viz/sparklines/base_sparkline.d.ts#L55) | null-missing | `onTooltipShown` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([tooltip.ts:495](packages/devextreme/js/__internal/viz/core/tooltip.ts#L495)) → `undefined` |

### [`js/viz/funnel.d.ts`](packages/devextreme/js/viz/funnel.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [276](packages/devextreme/js/viz/funnel.d.ts#L276) | concrete+undefined | `item.border.color`, `@default '#ffffff'` | Remove `\| undefined` (keep `@default`) | theme stores `'#ffffff'` ([funnel.ts:17](packages/devextreme/js/__internal/viz/core/themes/generic/light/funnel.ts#L17)) |
| [281](packages/devextreme/js/viz/funnel.d.ts#L281) | concrete+undefined | `item.border.visible`, `@default false` | Remove `\| undefined` (keep `@default`) | theme stores `false` ([funnel.ts:15](packages/devextreme/js/__internal/viz/core/themes/generic/light/funnel.ts#L15)) |
| [286](packages/devextreme/js/viz/funnel.d.ts#L286) | concrete+undefined | `item.border.width`, `@default 2` | Remove `\| undefined` (keep `@default`) | theme stores `2` ([funnel.ts:16](packages/devextreme/js/__internal/viz/core/themes/generic/light/funnel.ts#L16)) |
| [527](packages/devextreme/js/viz/funnel.d.ts#L527) | null-missing | `onHoverChanged` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([funnel.ts:81](packages/devextreme/js/__internal/viz/funnel/funnel.ts#L81)) → `undefined` |
| [537](packages/devextreme/js/viz/funnel.d.ts#L537) | null-missing | `onItemClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | eventsMap-only ([tracker.ts:25](packages/devextreme/js/__internal/viz/funnel/tracker.ts#L25)) → `undefined` |
| [547](packages/devextreme/js/viz/funnel.d.ts#L547) | null-missing | `onLegendClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | eventsMap-only ([tracker.ts:26](packages/devextreme/js/__internal/viz/funnel/tracker.ts#L26)) → `undefined` |
| [556](packages/devextreme/js/viz/funnel.d.ts#L556) | null-missing | `onSelectionChanged` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([funnel.ts:82](packages/devextreme/js/__internal/viz/funnel/funnel.ts#L82)) → `undefined` |

### [`js/viz/sankey.d.ts`](packages/devextreme/js/viz/sankey.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [210](packages/devextreme/js/viz/sankey.d.ts#L210) | concrete+undefined | `node.label.border.color`, `@default '#000000'` | Change `@default` to `'#ffffff'` + remove `\| undefined` | theme stores `WHITE`=`'#ffffff'` ([sankey.ts:30](packages/devextreme/js/__internal/viz/core/themes/generic/light/sankey.ts#L30)), NOT `#000000` |
| [215](packages/devextreme/js/viz/sankey.d.ts#L215) | concrete+undefined | `node.label.border.visible`, `@default false` | Remove `\| undefined` (keep `@default`) | theme stores `false` ([sankey.ts:28](packages/devextreme/js/__internal/viz/core/themes/generic/light/sankey.ts#L28)) |
| [220](packages/devextreme/js/viz/sankey.d.ts#L220) | concrete+undefined | `node.label.border.width`, `@default 2` | Remove `\| undefined` (keep `@default`) | theme stores `2` ([sankey.ts:29](packages/devextreme/js/__internal/viz/core/themes/generic/light/sankey.ts#L29)) |
| [301](packages/devextreme/js/viz/sankey.d.ts#L301) | concrete+undefined | `link.border.color`, `@default '#000000'` | Change `@default` to `'#ffffff'` + remove `\| undefined` | theme stores `WHITE`=`'#ffffff'` ([sankey.ts:82](packages/devextreme/js/__internal/viz/core/themes/generic/light/sankey.ts#L82)), NOT `#000000` |
| [306](packages/devextreme/js/viz/sankey.d.ts#L306) | concrete+undefined | `link.border.visible`, `@default false` | Remove `\| undefined` (keep `@default`) | theme stores `false` ([sankey.ts:84](packages/devextreme/js/__internal/viz/core/themes/generic/light/sankey.ts#L84)) |
| [311](packages/devextreme/js/viz/sankey.d.ts#L311) | concrete+undefined | `link.border.width`, `@default 2` | Change `@default` to `1` + remove `\| undefined` | theme stores `1` ([sankey.ts:83](packages/devextreme/js/__internal/viz/core/themes/generic/light/sankey.ts#L83)), NOT `2` |
| [381](packages/devextreme/js/viz/sankey.d.ts#L381) | concrete+undefined | `link.hoverStyle.border.opacity`, `@default 0.5` | Change `@default` to `undefined`, keep `\| undefined` | `link.hoverStyle.border` is `{}` ([sankey.ts:94](packages/devextreme/js/__internal/viz/core/themes/generic/light/sankey.ts#L94)); `0.5` is `hoverStyle.opacity` (sankey.ts:87), not `border.opacity` → stored `undefined` |
| [402](packages/devextreme/js/viz/sankey.d.ts#L402) | concrete+undefined | `node.border.color`, `@default '#000000'` | Change `@default` to `'#ffffff'` + remove `\| undefined` | theme stores `WHITE`=`'#ffffff'` ([sankey.ts:63](packages/devextreme/js/__internal/viz/core/themes/generic/light/sankey.ts#L63)), NOT `#000000` |
| [407](packages/devextreme/js/viz/sankey.d.ts#L407) | concrete+undefined | `node.border.visible`, `@default false` | Remove `\| undefined` (keep `@default`) | theme stores `false` ([sankey.ts:65](packages/devextreme/js/__internal/viz/core/themes/generic/light/sankey.ts#L65)) |
| [412](packages/devextreme/js/viz/sankey.d.ts#L412) | concrete+undefined | `node.border.width`, `@default 1` | Remove `\| undefined` (keep `@default`) | theme stores `1` ([sankey.ts:64](packages/devextreme/js/__internal/viz/core/themes/generic/light/sankey.ts#L64)) |
| [504](packages/devextreme/js/viz/sankey.d.ts#L504) | null-missing | `onLinkClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | eventsMap-only ([tracker.ts:25](packages/devextreme/js/__internal/viz/sankey/tracker.ts#L25)) → `undefined` |
| [513](packages/devextreme/js/viz/sankey.d.ts#L513) | null-missing | `onLinkHoverChanged` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([sankey.ts:129](packages/devextreme/js/__internal/viz/sankey/sankey.ts#L129)) → `undefined` |
| [523](packages/devextreme/js/viz/sankey.d.ts#L523) | null-missing | `onNodeClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | eventsMap-only ([tracker.ts:24](packages/devextreme/js/__internal/viz/sankey/tracker.ts#L24)) → `undefined` |
| [532](packages/devextreme/js/viz/sankey.d.ts#L532) | null-missing | `onNodeHoverChanged` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([sankey.ts:128](packages/devextreme/js/__internal/viz/sankey/sankey.ts#L128)) → `undefined` |

### [`js/viz/tree_map.d.ts`](packages/devextreme/js/viz/tree_map.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [231](packages/devextreme/js/viz/tree_map.d.ts#L231) | undefined-missing | `colorizer.range` | Add `\| undefined` | no `colorizer` in theme; resolved at render ([tree_map/colorizing.ts:31](packages/devextreme/js/__internal/viz/tree_map/colorizing.ts#L31)) → `undefined` |
| [258](packages/devextreme/js/viz/tree_map.d.ts#L258) | concrete+undefined | `group.border.color`, `@default '#d3d3d3'` | Change `@default` to `undefined`, keep `\| undefined` | theme `group.border` has no `color` (only `width:1`, [tree_map.ts:54-55](packages/devextreme/js/__internal/viz/core/themes/generic/light/tree_map.ts#L54)) → stored `undefined` |
| [263](packages/devextreme/js/viz/tree_map.d.ts#L263) | concrete+undefined | `group.border.width`, `@default 1` | Remove `\| undefined` (keep `@default`) | theme stores `1` ([tree_map.ts:55](packages/devextreme/js/__internal/viz/core/themes/generic/light/tree_map.ts#L55)) |
| [343](packages/devextreme/js/viz/tree_map.d.ts#L343) | concrete+undefined | `group.selectionStyle.border.color`, `@default '#232323'` | Change `@default` to `undefined`, keep `\| undefined` | theme `group.selectionStyle.border` is `{}` ([tree_map.ts:75](packages/devextreme/js/__internal/viz/core/themes/generic/light/tree_map.ts#L75)) → stored `undefined` |
| [416](packages/devextreme/js/viz/tree_map.d.ts#L416) | null-missing | `onClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | eventsMap-only ([tracker.ts:26](packages/devextreme/js/__internal/viz/tree_map/tracker.ts#L26)) → `undefined` |
| [425](packages/devextreme/js/viz/tree_map.d.ts#L425) | null-missing | `onDrill` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([drilldown.ts:15](packages/devextreme/js/__internal/viz/tree_map/drilldown.ts#L15)) → `undefined` |
| [434](packages/devextreme/js/viz/tree_map.d.ts#L434) | null-missing | `onHoverChanged` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([hover.ts:23](packages/devextreme/js/__internal/viz/tree_map/hover.ts#L23)) → `undefined` |
| [443](packages/devextreme/js/viz/tree_map.d.ts#L443) | null-missing | `onNodesInitialized` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([api.ts:23](packages/devextreme/js/__internal/viz/tree_map/api.ts#L23)) → `undefined` |
| [452](packages/devextreme/js/viz/tree_map.d.ts#L452) | null-missing | `onNodesRendering` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([api.ts:24](packages/devextreme/js/__internal/viz/tree_map/api.ts#L24)) → `undefined` |
| [461](packages/devextreme/js/viz/tree_map.d.ts#L461) | null-missing | `onSelectionChanged` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([selection.ts:31](packages/devextreme/js/__internal/viz/tree_map/selection.ts#L31)) → `undefined` |
| [487](packages/devextreme/js/viz/tree_map.d.ts#L487) | concrete+undefined | `tile.border.color`, `@default '#000000'` | Remove `\| undefined` (keep `@default`) | theme stores `'#000000'` ([tree_map.ts:9](packages/devextreme/js/__internal/viz/core/themes/generic/light/tree_map.ts#L9)) |
| [492](packages/devextreme/js/viz/tree_map.d.ts#L492) | concrete+undefined | `tile.border.width`, `@default 1` | Remove `\| undefined` (keep `@default`) | theme stores `1` ([tree_map.ts:7](packages/devextreme/js/__internal/viz/core/themes/generic/light/tree_map.ts#L7)) |
| [562](packages/devextreme/js/viz/tree_map.d.ts#L562) | concrete+undefined | `tile.selectionStyle.border.color`, `@default '#232323'` | Change `@default` to `undefined`, keep `\| undefined` | theme `tile.selectionStyle.border` has no `color` (`{opacity:1}`, [tree_map.ts:29](packages/devextreme/js/__internal/viz/core/themes/generic/light/tree_map.ts#L29)) → stored `undefined` |

### [`js/viz/vector_map.d.ts`](packages/devextreme/js/viz/vector_map.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [363](packages/devextreme/js/viz/vector_map.d.ts#L363) | undefined-missing | `bounds` | Add `\| undefined` | `@notUsedInTheme`; no stored default (vector_map.ts:298 is a change-map) → `undefined` |
| [428](packages/devextreme/js/viz/vector_map.d.ts#L428) | undefined-missing | `layers` | Add `\| undefined` | `@notUsedInTheme`; not stored (vector_map.ts:289 is a change-map) → `undefined` |
| [453](packages/devextreme/js/viz/vector_map.d.ts#L453) | undefined-missing | `layers[].colorGroups` | Add `\| undefined` | sub-property of unstored `layers` → `undefined` |
| [582](packages/devextreme/js/viz/vector_map.d.ts#L582) | undefined-missing | `layers[].sizeGroups` | Add `\| undefined` | sub-property of unstored `layers` → `undefined` |
| [618](packages/devextreme/js/viz/vector_map.d.ts#L618) | null-missing | `onCenterChanged` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([vector_map.ts:51](packages/devextreme/js/__internal/viz/vector_map/vector_map.ts#L51)) → `undefined` |
| [628](packages/devextreme/js/viz/vector_map.d.ts#L628) | null-missing | `onClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | eventsMap-only ([vector_map.ts:50](packages/devextreme/js/__internal/viz/vector_map/vector_map.ts#L50)) → `undefined` |
| [637](packages/devextreme/js/viz/vector_map.d.ts#L637) | null-missing | `onSelectionChanged` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([vector_map.ts:54](packages/devextreme/js/__internal/viz/vector_map/vector_map.ts#L54)) → `undefined` |
| [646](packages/devextreme/js/viz/vector_map.d.ts#L646) | null-missing | `onTooltipHidden` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([tooltip.ts:496](packages/devextreme/js/__internal/viz/core/tooltip.ts#L496)) → `undefined` |
| [655](packages/devextreme/js/viz/vector_map.d.ts#L655) | null-missing | `onTooltipShown` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([tooltip.ts:495](packages/devextreme/js/__internal/viz/core/tooltip.ts#L495)) → `undefined` |
| [664](packages/devextreme/js/viz/vector_map.d.ts#L664) | null-missing | `onZoomFactorChanged` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([vector_map.ts:52](packages/devextreme/js/__internal/viz/vector_map/vector_map.ts#L52)) → `undefined` |
| [757](packages/devextreme/js/viz/vector_map.d.ts#L757) | undefined-missing | `annotation.coordinates` | Add `\| undefined` | annotation config, not stored as a default → `undefined` |

### [`js/viz/range_selector.d.ts`](packages/devextreme/js/viz/range_selector.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [297](packages/devextreme/js/viz/range_selector.d.ts#L297) | undefined-missing | `seriesTemplate` | Add `\| undefined` | not in theme; not stored → `undefined` |
| [394](packages/devextreme/js/viz/range_selector.d.ts#L394) | null-missing | `onValueChanged` | Change `@default` to `undefined` + add `\| undefined` | eventsMap-only ([range_selector.ts:575](packages/devextreme/js/__internal/viz/range_selector/range_selector.ts#L575)) → `undefined` |
| [448](packages/devextreme/js/viz/range_selector.d.ts#L448) | undefined-missing | `scale.breaks` | Add `\| undefined` | `@notUsedInTheme`; not in theme `scale` ([range_selector.ts:7-51](packages/devextreme/js/__internal/viz/core/themes/generic/light/range_selector.ts#L7)) → `undefined` |
| [468](packages/devextreme/js/viz/range_selector.d.ts#L468) | undefined-missing | `scale.holidays` | Add `\| undefined` | not in theme `scale` → `undefined` |
| [622](packages/devextreme/js/viz/range_selector.d.ts#L622) | undefined-missing | `scale.singleWorkdays` | Add `\| undefined` | not in theme `scale` → `undefined` |

---

# Grids Squad — Batch 1 (core: GridBase + DataGrid + TreeList)

_3 files · 62 warnings · 9 add `\| null` · 51 → `undefined` (createAction-only) · 2 remove `@default` (Category B column field)_

> **Grid mechanics:** like viz, grid event callbacks are registered via `this.createAction('onX')` in `grid_core` modules — registration is **not** a stored default. A callback is stored `null` only if some module's `_getDefaultOptions` contains `onX: null`; otherwise it is `createAction`-only → `.option()` returns `undefined`. Most grid callbacks documented `@default null` actually store `undefined`. (`GridBaseColumn` fields are Category B — columns are a collection.)

### [`js/common/grids.d.ts`](packages/devextreme/js/common/grids.d.ts) — GridBase / GridBaseColumn

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [607](packages/devextreme/js/common/grids.d.ts#L607) | undefined-missing | `GridBaseColumn.filterOperations` | Remove `@default` | Category B — column-config field, not in any `_getDefaultOptions` (`m_filter_sync.ts:39` is a reset helper, not a default) |
| [627](packages/devextreme/js/common/grids.d.ts#L627) | undefined-missing | `GridBaseColumn.filterValues` | Remove `@default` | Category B — column-config field, not stored |
| [1268](packages/devextreme/js/common/grids.d.ts#L1268) | null-missing | `editing.editColumnName` | Add `\| null` | runtime stores `null` ([m_editing.ts:2944](packages/devextreme/js/__internal/grids/grid_core/editing/m_editing.ts#L2944)) |
| [1275](packages/devextreme/js/common/grids.d.ts#L1275) | null-missing | `editing.editRowKey` | Add `\| null` | runtime stores `null` ([m_editing.ts:2942](packages/devextreme/js/__internal/grids/grid_core/editing/m_editing.ts#L2942)) |
| [2338](packages/devextreme/js/common/grids.d.ts#L2338) | null-missing | `filterValue` | Add `\| null` | runtime stores `null` ([m_filter_sync.ts:394](packages/devextreme/js/__internal/grids/grid_core/filter/m_filter_sync.ts#L394)) |
| [2403](packages/devextreme/js/common/grids.d.ts#L2403) | null-missing | `onAIAssistantRequestCreating` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([ai_assistant_integration_controller.ts:98](packages/devextreme/js/__internal/grids/grid_core/ai_assistant/ai_assistant_integration_controller.ts#L98)) → `undefined` |
| [2413](packages/devextreme/js/common/grids.d.ts#L2413) | null-missing | `onAdaptiveDetailRowPreparing` | Add `\| null` | runtime stores `null` ([m_adaptivity.ts:1434](packages/devextreme/js/__internal/grids/grid_core/adaptivity/m_adaptivity.ts#L1434), `null as undefined`) |
| [2422](packages/devextreme/js/common/grids.d.ts#L2422) | null-missing | `onDataErrorOccurred` | Add `\| null` | runtime stores `null` ([m_data_controller.ts:1808](packages/devextreme/js/__internal/grids/grid_core/data_controller/m_data_controller.ts#L1808)) |
| [2432](packages/devextreme/js/common/grids.d.ts#L2432) | null-missing | `onEditCanceled` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_editing.ts:195](packages/devextreme/js/__internal/grids/grid_core/editing/m_editing.ts#L195)) → `undefined` |
| [2442](packages/devextreme/js/common/grids.d.ts#L2442) | null-missing | `onEditCanceling` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_editing.ts:194](packages/devextreme/js/__internal/grids/grid_core/editing/m_editing.ts#L194)) → `undefined` |
| [2453](packages/devextreme/js/common/grids.d.ts#L2453) | null-missing | `onInitNewRow` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_editing.ts:184](packages/devextreme/js/__internal/grids/grid_core/editing/m_editing.ts#L184)) → `undefined` |
| [2463](packages/devextreme/js/common/grids.d.ts#L2463) | null-missing | `onKeyDown` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_accessibility.ts:16](packages/devextreme/js/__internal/grids/grid_core/m_accessibility.ts#L16)) → `undefined` |
| [2473](packages/devextreme/js/common/grids.d.ts#L2473) | null-missing | `onRowCollapsed` | Change `@default` to `undefined` + add `\| undefined` | createAction-only (data_grid [m_grouping.ts:210](packages/devextreme/js/__internal/grids/data_grid/grouping/m_grouping.ts#L210) / tree_list m_data_controller.ts:73) → `undefined` |
| [2483](packages/devextreme/js/common/grids.d.ts#L2483) | null-missing | `onRowCollapsing` | Change `@default` to `undefined` + add `\| undefined` | createAction-only (m_grouping.ts:209 / tree_list m_data_controller.ts:72) → `undefined` |
| [2493](packages/devextreme/js/common/grids.d.ts#L2493) | null-missing | `onRowExpanded` | Change `@default` to `undefined` + add `\| undefined` | createAction-only (m_grouping.ts:208 / tree_list m_data_controller.ts:71) → `undefined` |
| [2503](packages/devextreme/js/common/grids.d.ts#L2503) | null-missing | `onRowExpanding` | Change `@default` to `undefined` + add `\| undefined` | createAction-only (m_grouping.ts:207 / tree_list m_data_controller.ts:70) → `undefined` |
| [2514](packages/devextreme/js/common/grids.d.ts#L2514) | null-missing | `onRowInserted` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_editing.ts:186](packages/devextreme/js/__internal/grids/grid_core/editing/m_editing.ts#L186)) → `undefined` |
| [2525](packages/devextreme/js/common/grids.d.ts#L2525) | null-missing | `onRowInserting` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_editing.ts:185](packages/devextreme/js/__internal/grids/grid_core/editing/m_editing.ts#L185)) → `undefined` |
| [2536](packages/devextreme/js/common/grids.d.ts#L2536) | null-missing | `onRowRemoved` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_editing.ts:191](packages/devextreme/js/__internal/grids/grid_core/editing/m_editing.ts#L191)) → `undefined` |
| [2548](packages/devextreme/js/common/grids.d.ts#L2548) | null-missing | `onRowRemoving` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_editing.ts:190](packages/devextreme/js/__internal/grids/grid_core/editing/m_editing.ts#L190)) → `undefined` |
| [2559](packages/devextreme/js/common/grids.d.ts#L2559) | null-missing | `onRowUpdated` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_editing.ts:189](packages/devextreme/js/__internal/grids/grid_core/editing/m_editing.ts#L189)) → `undefined` |
| [2572](packages/devextreme/js/common/grids.d.ts#L2572) | null-missing | `onRowUpdating` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_editing.ts:188](packages/devextreme/js/__internal/grids/grid_core/editing/m_editing.ts#L188)) → `undefined` |
| [2586](packages/devextreme/js/common/grids.d.ts#L2586) | null-missing | `onRowValidating` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_validating.ts:106](packages/devextreme/js/__internal/grids/grid_core/validating/m_validating.ts#L106)) → `undefined` |
| [2596](packages/devextreme/js/common/grids.d.ts#L2596) | null-missing | `onSaved` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_editing.ts:192](packages/devextreme/js/__internal/grids/grid_core/editing/m_editing.ts#L192)) → `undefined` |
| [2607](packages/devextreme/js/common/grids.d.ts#L2607) | null-missing | `onSaving` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_editing.ts:193](packages/devextreme/js/__internal/grids/grid_core/editing/m_editing.ts#L193)) → `undefined` |
| [2620](packages/devextreme/js/common/grids.d.ts#L2620) | null-missing | `onSelectionChanged` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_selection.ts:151](packages/devextreme/js/__internal/grids/grid_core/selection/m_selection.ts#L151)) → `undefined` |
| [2630](packages/devextreme/js/common/grids.d.ts#L2630) | null-missing | `onToolbarPreparing` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_header_panel.ts:41](packages/devextreme/js/__internal/grids/grid_core/header_panel/m_header_panel.ts#L41)) → `undefined` |
| [3566](packages/devextreme/js/common/grids.d.ts#L3566) | null-missing | `stateStoring.storageKey` | Add `\| null` | runtime stores `null` ([m_state_storing.ts:290](packages/devextreme/js/__internal/grids/grid_core/state_storing/m_state_storing.ts#L290)) |

### [`js/ui/data_grid.d.ts`](packages/devextreme/js/ui/data_grid.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [1247](packages/devextreme/js/ui/data_grid.d.ts#L1247) | null-missing | `onCellClick` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_columns_view.ts:219](packages/devextreme/js/__internal/grids/grid_core/views/m_columns_view.ts#L219)) → `undefined` |
| [1255](packages/devextreme/js/ui/data_grid.d.ts#L1255) | null-missing | `onCellDblClick` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_columns_view.ts:221](packages/devextreme/js/__internal/grids/grid_core/views/m_columns_view.ts#L221)) → `undefined` |
| [1263](packages/devextreme/js/ui/data_grid.d.ts#L1263) | null-missing | `onCellHoverChanged` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_columns_view.ts:223](packages/devextreme/js/__internal/grids/grid_core/views/m_columns_view.ts#L223)) → `undefined` |
| [1271](packages/devextreme/js/ui/data_grid.d.ts#L1271) | null-missing | `onCellPrepared` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_columns_view.ts:224](packages/devextreme/js/__internal/grids/grid_core/views/m_columns_view.ts#L224)) → `undefined` |
| [1279](packages/devextreme/js/ui/data_grid.d.ts#L1279) | null-missing | `onContextMenuPreparing` | Add `\| null` | runtime stores `null` ([m_context_menu.ts:133](packages/devextreme/js/__internal/grids/grid_core/context_menu/m_context_menu.ts#L133)) |
| [1287](packages/devextreme/js/ui/data_grid.d.ts#L1287) | null-missing | `onEditingStart` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_editing.ts:187](packages/devextreme/js/__internal/grids/grid_core/editing/m_editing.ts#L187)) → `undefined` |
| [1295](packages/devextreme/js/ui/data_grid.d.ts#L1295) | null-missing | `onEditorPrepared` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_editor_factory.ts:89](packages/devextreme/js/__internal/grids/grid_core/editor_factory/m_editor_factory.ts#L89)) → `undefined` |
| [1303](packages/devextreme/js/ui/data_grid.d.ts#L1303) | null-missing | `onEditorPreparing` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_editor_factory.ts:88](packages/devextreme/js/__internal/grids/grid_core/editor_factory/m_editor_factory.ts#L88)) → `undefined` |
| [1311](packages/devextreme/js/ui/data_grid.d.ts#L1311) | null-missing | `onExporting` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_export.ts:359](packages/devextreme/js/__internal/grids/data_grid/export/m_export.ts#L359)) → `undefined` |
| [1319](packages/devextreme/js/ui/data_grid.d.ts#L1319) | null-missing | `onFocusedCellChanged` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_focus.ts:450](packages/devextreme/js/__internal/grids/grid_core/focus/m_focus.ts#L450)) → `undefined` |
| [1327](packages/devextreme/js/ui/data_grid.d.ts#L1327) | null-missing | `onFocusedCellChanging` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_focus.ts:449](packages/devextreme/js/__internal/grids/grid_core/focus/m_focus.ts#L449)) → `undefined` |
| [1335](packages/devextreme/js/ui/data_grid.d.ts#L1335) | null-missing | `onFocusedRowChanged` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_focus.ts:447](packages/devextreme/js/__internal/grids/grid_core/focus/m_focus.ts#L447)) → `undefined` |
| [1343](packages/devextreme/js/ui/data_grid.d.ts#L1343) | null-missing | `onFocusedRowChanging` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_focus.ts:446](packages/devextreme/js/__internal/grids/grid_core/focus/m_focus.ts#L446)) → `undefined` |
| [1351](packages/devextreme/js/ui/data_grid.d.ts#L1351) | null-missing | `onRowClick` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_columns_view.ts:220](packages/devextreme/js/__internal/grids/grid_core/views/m_columns_view.ts#L220)) → `undefined` |
| [1359](packages/devextreme/js/ui/data_grid.d.ts#L1359) | null-missing | `onRowDblClick` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_columns_view.ts:222](packages/devextreme/js/__internal/grids/grid_core/views/m_columns_view.ts#L222)) → `undefined` |
| [1367](packages/devextreme/js/ui/data_grid.d.ts#L1367) | null-missing | `onRowPrepared` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_columns_view.ts:225](packages/devextreme/js/__internal/grids/grid_core/views/m_columns_view.ts#L225)) → `undefined` |
| [1473](packages/devextreme/js/ui/data_grid.d.ts#L1473) | null-missing | `onAIColumnRequestCreating` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_ai_column_integration_controller.ts:85](packages/devextreme/js/__internal/grids/grid_core/ai_column/controllers/m_ai_column_integration_controller.ts#L85)) → `undefined` |

### [`js/ui/tree_list.d.ts`](packages/devextreme/js/ui/tree_list.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [1004](packages/devextreme/js/ui/tree_list.d.ts#L1004) | null-missing | `onCellClick` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_columns_view.ts:219](packages/devextreme/js/__internal/grids/grid_core/views/m_columns_view.ts#L219)) → `undefined` |
| [1012](packages/devextreme/js/ui/tree_list.d.ts#L1012) | null-missing | `onCellDblClick` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_columns_view.ts:221](packages/devextreme/js/__internal/grids/grid_core/views/m_columns_view.ts#L221)) → `undefined` |
| [1020](packages/devextreme/js/ui/tree_list.d.ts#L1020) | null-missing | `onCellHoverChanged` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_columns_view.ts:223](packages/devextreme/js/__internal/grids/grid_core/views/m_columns_view.ts#L223)) → `undefined` |
| [1028](packages/devextreme/js/ui/tree_list.d.ts#L1028) | null-missing | `onCellPrepared` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_columns_view.ts:224](packages/devextreme/js/__internal/grids/grid_core/views/m_columns_view.ts#L224)) → `undefined` |
| [1036](packages/devextreme/js/ui/tree_list.d.ts#L1036) | null-missing | `onContextMenuPreparing` | Add `\| null` | runtime stores `null` ([m_context_menu.ts:133](packages/devextreme/js/__internal/grids/grid_core/context_menu/m_context_menu.ts#L133)) |
| [1044](packages/devextreme/js/ui/tree_list.d.ts#L1044) | null-missing | `onEditingStart` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_editing.ts:187](packages/devextreme/js/__internal/grids/grid_core/editing/m_editing.ts#L187)) → `undefined` |
| [1052](packages/devextreme/js/ui/tree_list.d.ts#L1052) | null-missing | `onEditorPrepared` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_editor_factory.ts:89](packages/devextreme/js/__internal/grids/grid_core/editor_factory/m_editor_factory.ts#L89)) → `undefined` |
| [1060](packages/devextreme/js/ui/tree_list.d.ts#L1060) | null-missing | `onEditorPreparing` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_editor_factory.ts:88](packages/devextreme/js/__internal/grids/grid_core/editor_factory/m_editor_factory.ts#L88)) → `undefined` |
| [1068](packages/devextreme/js/ui/tree_list.d.ts#L1068) | null-missing | `onFocusedCellChanged` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_focus.ts:450](packages/devextreme/js/__internal/grids/grid_core/focus/m_focus.ts#L450)) → `undefined` |
| [1076](packages/devextreme/js/ui/tree_list.d.ts#L1076) | null-missing | `onFocusedCellChanging` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_focus.ts:449](packages/devextreme/js/__internal/grids/grid_core/focus/m_focus.ts#L449)) → `undefined` |
| [1084](packages/devextreme/js/ui/tree_list.d.ts#L1084) | null-missing | `onFocusedRowChanged` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_focus.ts:447](packages/devextreme/js/__internal/grids/grid_core/focus/m_focus.ts#L447)) → `undefined` |
| [1092](packages/devextreme/js/ui/tree_list.d.ts#L1092) | null-missing | `onFocusedRowChanging` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_focus.ts:446](packages/devextreme/js/__internal/grids/grid_core/focus/m_focus.ts#L446)) → `undefined` |
| [1100](packages/devextreme/js/ui/tree_list.d.ts#L1100) | null-missing | `onNodesInitialized` | Add `\| null` | runtime stores `null` ([tree_list m_data_controller.ts:225](packages/devextreme/js/__internal/grids/tree_list/data_controller/m_data_controller.ts#L225)) |
| [1108](packages/devextreme/js/ui/tree_list.d.ts#L1108) | null-missing | `onRowClick` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_columns_view.ts:220](packages/devextreme/js/__internal/grids/grid_core/views/m_columns_view.ts#L220)) → `undefined` |
| [1116](packages/devextreme/js/ui/tree_list.d.ts#L1116) | null-missing | `onRowDblClick` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_columns_view.ts:222](packages/devextreme/js/__internal/grids/grid_core/views/m_columns_view.ts#L222)) → `undefined` |
| [1124](packages/devextreme/js/ui/tree_list.d.ts#L1124) | null-missing | `onRowPrepared` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_columns_view.ts:225](packages/devextreme/js/__internal/grids/grid_core/views/m_columns_view.ts#L225)) → `undefined` |
| [1191](packages/devextreme/js/ui/tree_list.d.ts#L1191) | null-missing | `onAIColumnRequestCreating` | Change `@default` to `undefined` + add `\| undefined` | createAction-only ([m_ai_column_integration_controller.ts:85](packages/devextreme/js/__internal/grids/grid_core/ai_column/controllers/m_ai_column_integration_controller.ts#L85)) → `undefined` |

---

# Grids Squad — Batch 2 (adjacent: Draggable, Sortable, FilterBuilder, CardView)

_4 files · 26 warnings · 15 add `\| null` · 6 → `undefined` · 3 add `\| undefined` · 2 remove `@default` (Category B field)_

> Draggable/Sortable/FilterBuilder are classic widgets — callbacks ARE in `_getDefaultOptions` as `onX: null` (genuinely stored `null`, unlike grids/viz). Draggable & FilterBuilder carry `@ts-expect-error` on those `null` assignments → remove after widening. CardView is the **new** grid (`grids/new/card_view`): defaults are composed `defaultOptions` objects; options absent from them store `undefined`.

### [`js/ui/draggable.d.ts`](packages/devextreme/js/ui/draggable.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [227](packages/devextreme/js/ui/draggable.d.ts#L227) | null-missing | `onDragEnd` | Add `\| null`; remove now-stale `@ts-expect-error` | runtime stores `null` w/ `@ts-expect-error` ([m_draggable.ts:336-337](packages/devextreme/js/__internal/m_draggable.ts#L336)) |
| [235](packages/devextreme/js/ui/draggable.d.ts#L235) | null-missing | `onDragMove` | Add `\| null`; remove now-stale `@ts-expect-error` | runtime stores `null` w/ `@ts-expect-error` ([m_draggable.ts:334-335](packages/devextreme/js/__internal/m_draggable.ts#L334)) |
| [243](packages/devextreme/js/ui/draggable.d.ts#L243) | null-missing | `onDragStart` | Add `\| null`; remove now-stale `@ts-expect-error` | runtime stores `null` w/ `@ts-expect-error` ([m_draggable.ts:332-333](packages/devextreme/js/__internal/m_draggable.ts#L332)) |

### [`js/ui/sortable.d.ts`](packages/devextreme/js/ui/sortable.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [317](packages/devextreme/js/ui/sortable.d.ts#L317) | null-missing | `onAdd` | Add `\| null` | runtime stores `null` ([m_sortable.ts:94](packages/devextreme/js/__internal/m_sortable.ts#L94)) |
| [325](packages/devextreme/js/ui/sortable.d.ts#L325) | null-missing | `onDragChange` | Add `\| null` | runtime stores `null` ([m_sortable.ts:93](packages/devextreme/js/__internal/m_sortable.ts#L93)) |
| [333](packages/devextreme/js/ui/sortable.d.ts#L333) | null-missing | `onDragEnd` | Add `\| null` | inherited `null` from Draggable ([m_draggable.ts:337](packages/devextreme/js/__internal/m_draggable.ts#L337)) |
| [341](packages/devextreme/js/ui/sortable.d.ts#L341) | null-missing | `onDragMove` | Add `\| null` | inherited `null` from Draggable ([m_draggable.ts:335](packages/devextreme/js/__internal/m_draggable.ts#L335)) |
| [349](packages/devextreme/js/ui/sortable.d.ts#L349) | null-missing | `onDragStart` | Add `\| null` | inherited `null` from Draggable ([m_draggable.ts:333](packages/devextreme/js/__internal/m_draggable.ts#L333)) |
| [357](packages/devextreme/js/ui/sortable.d.ts#L357) | null-missing | `onRemove` | Add `\| null` | runtime stores `null` ([m_sortable.ts:95](packages/devextreme/js/__internal/m_sortable.ts#L95)) |
| [365](packages/devextreme/js/ui/sortable.d.ts#L365) | null-missing | `onReorder` | Add `\| null` | runtime stores `null` ([m_sortable.ts:96](packages/devextreme/js/__internal/m_sortable.ts#L96)) |

### [`js/ui/filter_builder.d.ts`](packages/devextreme/js/ui/filter_builder.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [314](packages/devextreme/js/ui/filter_builder.d.ts#L314) | null-missing | `onEditorPrepared` | Add `\| null` | runtime stores `null` ([m_filter_builder.ts:102](packages/devextreme/js/__internal/filter_builder/m_filter_builder.ts#L102)) |
| [322](packages/devextreme/js/ui/filter_builder.d.ts#L322) | null-missing | `onEditorPreparing` | Add `\| null` | runtime stores `null` ([m_filter_builder.ts:100](packages/devextreme/js/__internal/filter_builder/m_filter_builder.ts#L100)) |
| [330](packages/devextreme/js/ui/filter_builder.d.ts#L330) | null-missing | `onValueChanged` | Add `\| null` | runtime stores `null` ([m_filter_builder.ts:104](packages/devextreme/js/__internal/filter_builder/m_filter_builder.ts#L104)) |
| [338](packages/devextreme/js/ui/filter_builder.d.ts#L338) | null-missing | `value` | Add `\| null` | runtime stores `null` ([m_filter_builder.ts:112](packages/devextreme/js/__internal/filter_builder/m_filter_builder.ts#L112)) |
| [509](packages/devextreme/js/ui/filter_builder.d.ts#L509) | undefined-missing | `fields[].filterOperations` | Remove `@default` | Category B — field config in `fields[]` collection, not stored (`_getDefaultOptions` stores `fields: []`, m_filter_builder.ts:106) |
| [521](packages/devextreme/js/ui/filter_builder.d.ts#L521) | undefined-missing | `fields[].lookup` | Remove `@default` | Category B — field config in `fields[]` collection, not stored |

> After widening the four FilterBuilder callbacks/`value`, re-check the `@ts-expect-error` on the `_getDefaultOptions` return ([m_filter_builder.ts:98](packages/devextreme/js/__internal/filter_builder/m_filter_builder.ts#L98)) — it sits on the whole `return extend(...)`, so confirm via `check-types` whether it became unused.

### [`js/ui/card_view.d.ts`](packages/devextreme/js/ui/card_view.d.ts) — new grid (`grids/new/card_view`)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [543](packages/devextreme/js/ui/card_view.d.ts#L543) | null-missing | `dragging.onDragChange` | Change `@default` to `undefined` + add `\| undefined` | `dragging` config not in card_view `defaultOptions` → `undefined` |
| [549](packages/devextreme/js/ui/card_view.d.ts#L549) | null-missing | `dragging.onDragEnd` | Change `@default` to `undefined` + add `\| undefined` | not in `defaultOptions` → `undefined` |
| [555](packages/devextreme/js/ui/card_view.d.ts#L555) | null-missing | `dragging.onDragMove` | Change `@default` to `undefined` + add `\| undefined` | not in `defaultOptions` → `undefined` |
| [561](packages/devextreme/js/ui/card_view.d.ts#L561) | null-missing | `dragging.onDragStart` | Change `@default` to `undefined` + add `\| undefined` | not in `defaultOptions` → `undefined` |
| [567](packages/devextreme/js/ui/card_view.d.ts#L567) | null-missing | `dragging.onRemove` | Change `@default` to `undefined` + add `\| undefined` | not in `defaultOptions` → `undefined` |
| [573](packages/devextreme/js/ui/card_view.d.ts#L573) | null-missing | `dragging.onReorder` | Change `@default` to `undefined` + add `\| undefined` | not in `defaultOptions` → `undefined` |
| [1320](packages/devextreme/js/ui/card_view.d.ts#L1320) | undefined-missing | `dataSource` | Add `\| undefined` | not in card_view `defaultOptions` → `undefined` |
| [1331](packages/devextreme/js/ui/card_view.d.ts#L1331) | undefined-missing | `keyExpr` | Add `\| undefined` | not in card_view `defaultOptions` → `undefined` |
| [1346](packages/devextreme/js/ui/card_view.d.ts#L1346) | undefined-missing | `onDataErrorOccurred` | Add `\| undefined` | not in card_view `defaultOptions` → `undefined` |
| [1595](packages/devextreme/js/ui/card_view.d.ts#L1595) | null-missing | `filterValue` | Add `\| null` | runtime stores `null` ([grid_core/new filtering/options.ts:8](packages/devextreme/js/__internal/grids/new/grid_core/filtering/options.ts#L8)) |

---

# Scheduler Squad (Scheduler + PivotGrid family)

_4 files · 52 warnings · 26 remove `@default` (Category B) · 18 → `undefined` · 7 add `\| null` · 1 add `\| undefined`_

> **Scheduler** defaults live in `DEFAULT_SCHEDULER_OPTIONS` ([scheduler/utils/options/constants.ts](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts), used by `scheduler_options_base_widget.ts:_getDefaultOptions`) — all flagged top-level callbacks/templates are explicitly `undefined` there → `@default null` is wrong. Per-view templates are `views[]` config-item fields (Category B). **PivotGrid** (`m_widget.ts`) is a classic widget — callbacks ARE stored `null`. **PivotGridDataSource** `fields[]` sub-properties are Category B (collection config items).

### [`js/ui/scheduler.d.ts`](packages/devextreme/js/ui/scheduler.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [600](packages/devextreme/js/ui/scheduler.d.ts#L600) | null-missing | `dataCellTemplate` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` ([constants.ts:29](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L29)) |
| [614](packages/devextreme/js/ui/scheduler.d.ts#L614) | null-missing | `dateCellTemplate` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` ([constants.ts:32](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L32)) |
| [762](packages/devextreme/js/ui/scheduler.d.ts#L762) | null-missing | `onAppointmentAdded` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` ([constants.ts:65](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L65)) |
| [770](packages/devextreme/js/ui/scheduler.d.ts#L770) | null-missing | `onAppointmentAdding` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` ([constants.ts:64](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L64)) |
| [779](packages/devextreme/js/ui/scheduler.d.ts#L779) | null-missing | `onAppointmentClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | stored `undefined` ([constants.ts:59](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L59)) |
| [788](packages/devextreme/js/ui/scheduler.d.ts#L788) | null-missing | `onAppointmentContextMenu` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | stored `undefined` ([constants.ts:61](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L61)) |
| [797](packages/devextreme/js/ui/scheduler.d.ts#L797) | null-missing | `onAppointmentDblClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | stored `undefined` ([constants.ts:60](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L60)) |
| [805](packages/devextreme/js/ui/scheduler.d.ts#L805) | null-missing | `onAppointmentDeleted` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` ([constants.ts:69](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L69)) |
| [814](packages/devextreme/js/ui/scheduler.d.ts#L814) | null-missing | `onAppointmentDeleting` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` ([constants.ts:68](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L68)) |
| [822](packages/devextreme/js/ui/scheduler.d.ts#L822) | null-missing | `onAppointmentTooltipShowing` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` ([constants.ts:71](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L71)) |
| [830](packages/devextreme/js/ui/scheduler.d.ts#L830) | null-missing | `onAppointmentFormOpening` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` ([constants.ts:70](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L70)) |
| [838](packages/devextreme/js/ui/scheduler.d.ts#L838) | null-missing | `onAppointmentRendered` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` ([constants.ts:58](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L58)) |
| [846](packages/devextreme/js/ui/scheduler.d.ts#L846) | null-missing | `onAppointmentUpdated` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` ([constants.ts:67](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L67)) |
| [854](packages/devextreme/js/ui/scheduler.d.ts#L854) | null-missing | `onAppointmentUpdating` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` ([constants.ts:66](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L66)) |
| [863](packages/devextreme/js/ui/scheduler.d.ts#L863) | null-missing | `onCellClick` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | stored `undefined` ([constants.ts:62](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L62)) |
| [880](packages/devextreme/js/ui/scheduler.d.ts#L880) | null-missing | `onCellContextMenu` | Change `@default` to `undefined` + add `\| undefined`; keep `@type function` | stored `undefined` ([constants.ts:63](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L63)) |
| [911](packages/devextreme/js/ui/scheduler.d.ts#L911) | null-missing | `resourceCellTemplate` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` ([constants.ts:31](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L31)) |
| [1026](packages/devextreme/js/ui/scheduler.d.ts#L1026) | null-missing | `timeCellTemplate` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` ([constants.ts:30](packages/devextreme/js/__internal/scheduler/utils/options/constants.ts#L30)) |
| [1100](packages/devextreme/js/ui/scheduler.d.ts#L1100) | null-missing | `views[].dataCellTemplate` | Remove `@default` | Category B — `views[]` config-item field, not in `DEFAULT_VIEW_OPTIONS` |
| [1106](packages/devextreme/js/ui/scheduler.d.ts#L1106) | null-missing | `views[].dateCellTemplate` | Remove `@default` | Category B — `views[]` config-item field |
| [1156](packages/devextreme/js/ui/scheduler.d.ts#L1156) | null-missing | `views[].resourceCellTemplate` | Remove `@default` | Category B — `views[]` config-item field |
| [1172](packages/devextreme/js/ui/scheduler.d.ts#L1172) | null-missing | `views[].timeCellTemplate` | Remove `@default` | Category B — `views[]` config-item field |

### [`js/ui/pivot_grid.d.ts`](packages/devextreme/js/ui/pivot_grid.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [523](packages/devextreme/js/ui/pivot_grid.d.ts#L523) | null-missing | `onCellClick` | Add `\| null` | runtime stores `null` ([m_widget.ts:254](packages/devextreme/js/__internal/grids/pivot_grid/m_widget.ts#L254)) |
| [531](packages/devextreme/js/ui/pivot_grid.d.ts#L531) | null-missing | `onCellPrepared` | Add `\| null` | runtime stores `null` ([m_widget.ts:255](packages/devextreme/js/__internal/grids/pivot_grid/m_widget.ts#L255)) |
| [539](packages/devextreme/js/ui/pivot_grid.d.ts#L539) | null-missing | `onContextMenuPreparing` | Add `\| null` | runtime stores `null` ([m_widget.ts:197](packages/devextreme/js/__internal/grids/pivot_grid/m_widget.ts#L197)) |
| [547](packages/devextreme/js/ui/pivot_grid.d.ts#L547) | null-missing | `onExporting` | Add `\| null` | runtime stores `null` ([m_widget.ts:269](packages/devextreme/js/__internal/grids/pivot_grid/m_widget.ts#L269)) |
| [636](packages/devextreme/js/ui/pivot_grid.d.ts#L636) | null-missing | `stateStoring.storageKey` | Add `\| null` | runtime stores `null` ([m_widget.ts:260](packages/devextreme/js/__internal/grids/pivot_grid/m_widget.ts#L260)) |

### [`js/ui/pivot_grid_field_chooser.d.ts`](packages/devextreme/js/ui/pivot_grid_field_chooser.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [201](packages/devextreme/js/ui/pivot_grid_field_chooser.d.ts#L201) | null-missing | `onContextMenuPreparing` | Add `\| null` | runtime stores `null` ([m_field_chooser.ts:100](packages/devextreme/js/__internal/grids/pivot_grid/field_chooser/m_field_chooser.ts#L100)) |
| [213](packages/devextreme/js/ui/pivot_grid_field_chooser.d.ts#L213) | null-missing | `state`, type `any` | Add `\| null` (`any` field) | runtime stores `null` ([m_field_chooser_base.ts:106](packages/devextreme/js/__internal/grids/pivot_grid/field_chooser/m_field_chooser_base.ts#L106)) |

### [`js/ui/pivot_grid/data_source.d.ts`](packages/devextreme/js/ui/pivot_grid/data_source.d.ts) — PivotGridDataSource

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [176](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L176) | undefined-missing | `fields` | Add `\| undefined` | point-of-use default `\|\| []` ([m_data_source.ts:173](packages/devextreme/js/__internal/grids/pivot_grid/data_source/m_data_source.ts#L173)); stored value `undefined` when omitted |
| [299](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L299) | undefined-missing | `fields[].areaIndex` | Remove `@default` | Category B — `fields[]` config-item field, not stored |
| [310](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L310) | undefined-missing | `fields[].calculateSummaryValue` | Remove `@default` | Category B — `fields[]` config-item field |
| [316](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L316) | undefined-missing | `fields[].caption` | Remove `@default` | Category B — `fields[]` config-item field |
| [327](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L327) | undefined-missing | `fields[].dataField` | Remove `@default` | Category B — `fields[]` config-item field |
| [333](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L333) | undefined-missing | `fields[].dataType` | Remove `@default` | Category B — `fields[]` config-item field |
| [339](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L339) | undefined-missing | `fields[].displayFolder` | Remove `@default` | Category B — `fields[]` config-item field |
| [357](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L357) | undefined-missing | `fields[].filterValues` | Remove `@default` | Category B — `fields[]` config-item field |
| [369](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L369) | undefined-missing | `fields[].groupIndex` | Remove `@default` | Category B — `fields[]` config-item field |
| [375](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L375) | undefined-missing | `fields[].groupInterval` | Remove `@default` | Category B — `fields[]` config-item field |
| [381](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L381) | undefined-missing | `fields[].groupName` | Remove `@default` | Category B — `fields[]` config-item field |
| [405](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L405) | undefined-missing | `fields[].isMeasure` | Remove `@default` | Category B — `fields[]` config-item field |
| [411](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L411) | undefined-missing | `fields[].name` | Remove `@default` | Category B — `fields[]` config-item field |
| [417](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L417) | undefined-missing | `fields[].runningTotal` | Remove `@default` | Category B — `fields[]` config-item field |
| [424](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L424) | undefined-missing | `fields[].selector` | Remove `@default` | Category B — `fields[]` config-item field |
| [442](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L442) | undefined-missing | `fields[].showValues` | Remove `@default` | Category B — `fields[]` config-item field |
| [448](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L448) | undefined-missing | `fields[].sortBy` | Remove `@default` | Category B — `fields[]` config-item field |
| [454](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L454) | undefined-missing | `fields[].sortBySummaryField` | Remove `@default` | Category B — `fields[]` config-item field |
| [460](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L460) | undefined-missing | `fields[].sortBySummaryPath` | Remove `@default` | Category B — `fields[]` config-item field |
| [472](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L472) | undefined-missing | `fields[].sortingMethod` | Remove `@default` | Category B — `fields[]` config-item field |
| [478](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L478) | undefined-missing | `fields[].summaryDisplayMode` | Remove `@default` | Category B — `fields[]` config-item field |
| [496](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L496) | undefined-missing | `fields[].width` | Remove `@default` | Category B — `fields[]` config-item field |
| [502](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L502) | undefined-missing | `fields[].wordWrapEnabled` | Remove `@default` | Category B — `fields[]` config-item field |

---

# ASP Tribe (Diagram, FileManager, Gantt)

_3 files · 72 warnings · 32 add `\| null` · 25 → `undefined` · 14 remove `@default` (A-obj / Category B) · 1 add `\| undefined`_

> Three classic widgets, each mixed. **A-obj configs** documented `@default null` actually store a **config object** (`nodes`/`edges`, `itemView`, `tasks`/`resources`/`dependencies`/`resourceAssignments`) → `@default null` is wrong; remove it (the config object's sub-properties carry their own `@default`; type stays). **Callbacks** split: Diagram & Gantt store `null` in `_getDefaultOptions`/`getDefaultOptions` (→ `\| null`), but FileManager stores them `undefined`, and a few Gantt ones are `createAction`-only (→ `undefined`).

### [`js/ui/diagram.d.ts`](packages/devextreme/js/ui/diagram.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [256](packages/devextreme/js/ui/diagram.d.ts#L256) | undefined-missing | `contextMenu.commands` | Remove `@default` | Category B — sub-property of `contextMenu` config (`{ enabled }` only, [ui.diagram.ts:2282](packages/devextreme/js/__internal/ui/diagram/ui.diagram.ts#L2282)) |
| [601](packages/devextreme/js/ui/diagram.d.ts#L601) | null-missing | `edges` | Remove `@default` | A-obj — runtime stores a config object, not `null` ([ui.diagram.ts:2248](packages/devextreme/js/__internal/ui/diagram/ui.diagram.ts#L2248)) |
| [721](packages/devextreme/js/ui/diagram.d.ts#L721) | null-missing | `nodes` | Remove `@default` | A-obj — runtime stores a config object, not `null` ([ui.diagram.ts:2226](packages/devextreme/js/__internal/ui/diagram/ui.diagram.ts#L2226)) |
| [846](packages/devextreme/js/ui/diagram.d.ts#L846) | null-missing | `onItemClick` | Add `\| null` | runtime stores `null` ([ui.diagram.ts:2314](packages/devextreme/js/__internal/ui/diagram/ui.diagram.ts#L2314)) |
| [854](packages/devextreme/js/ui/diagram.d.ts#L854) | null-missing | `onItemDblClick` | Add `\| null` | runtime stores `null` ([ui.diagram.ts:2316](packages/devextreme/js/__internal/ui/diagram/ui.diagram.ts#L2316)) |
| [862](packages/devextreme/js/ui/diagram.d.ts#L862) | null-missing | `onSelectionChanged` | Add `\| null` | runtime stores `null` ([ui.diagram.ts:2318](packages/devextreme/js/__internal/ui/diagram/ui.diagram.ts#L2318)) |
| [870](packages/devextreme/js/ui/diagram.d.ts#L870) | null-missing | `onRequestEditOperation` | Add `\| null` | runtime stores `null` ([ui.diagram.ts:2320](packages/devextreme/js/__internal/ui/diagram/ui.diagram.ts#L2320)) |
| [878](packages/devextreme/js/ui/diagram.d.ts#L878) | null-missing | `onRequestLayoutUpdate` | Add `\| null` | runtime stores `null` ([ui.diagram.ts:2322](packages/devextreme/js/__internal/ui/diagram/ui.diagram.ts#L2322)) |
| [934](packages/devextreme/js/ui/diagram.d.ts#L934) | undefined-missing | `propertiesPanel.tabs` | Remove `@default` | Category B — sub-property of `propertiesPanel` config ([ui.diagram.ts:2290](packages/devextreme/js/__internal/ui/diagram/ui.diagram.ts#L2290)) |
| [1004](packages/devextreme/js/ui/diagram.d.ts#L1004) | undefined-missing | `mainToolbar.commands` | Remove `@default` | Category B — sub-property of `mainToolbar` config (`{ visible }`, [ui.diagram.ts:2273](packages/devextreme/js/__internal/ui/diagram/ui.diagram.ts#L2273)) |
| [1021](packages/devextreme/js/ui/diagram.d.ts#L1021) | undefined-missing | `historyToolbar.commands` | Remove `@default` | Category B — sub-property of `historyToolbar` config ([ui.diagram.ts:2276](packages/devextreme/js/__internal/ui/diagram/ui.diagram.ts#L2276)) |
| [1038](packages/devextreme/js/ui/diagram.d.ts#L1038) | undefined-missing | `viewToolbar.commands` | Remove `@default` | Category B — sub-property of `viewToolbar` config ([ui.diagram.ts:2279](packages/devextreme/js/__internal/ui/diagram/ui.diagram.ts#L2279)) |
| [1055](packages/devextreme/js/ui/diagram.d.ts#L1055) | undefined-missing | `toolbox.groups` | Remove `@default` | Category B — sub-property of `toolbox` config ([ui.diagram.ts:2268](packages/devextreme/js/__internal/ui/diagram/ui.diagram.ts#L2268)) |
| [1120](packages/devextreme/js/ui/diagram.d.ts#L1120) | undefined-missing | `zoomLevel.items` | Remove `@default` | Category B — `zoomLevel` stored as scalar ([ui.diagram.ts:2215](packages/devextreme/js/__internal/ui/diagram/ui.diagram.ts#L2215)); `.items` is a union sub-shape |

### [`js/ui/file_manager.d.ts`](packages/devextreme/js/ui/file_manager.d.ts)

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [459](packages/devextreme/js/ui/file_manager.d.ts#L459) | null-missing | `fileSystemProvider`, type `any` | Add `\| null` (`any` field) | runtime stores `null` ([ui.file_manager.ts:587](packages/devextreme/js/__internal/ui/file_manager/ui.file_manager.ts#L587)) |
| [465](packages/devextreme/js/ui/file_manager.d.ts#L465) | null-missing | `itemView` | Remove `@default` | A-obj — runtime stores a config object, not `null` ([ui.file_manager.ts:627](packages/devextreme/js/__internal/ui/file_manager/ui.file_manager.ts#L627)) |
| [515](packages/devextreme/js/ui/file_manager.d.ts#L515) | null-missing | `onContextMenuItemClick` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` ([ui.file_manager.ts:642](packages/devextreme/js/__internal/ui/file_manager/ui.file_manager.ts#L642)) |
| [523](packages/devextreme/js/ui/file_manager.d.ts#L523) | null-missing | `onContextMenuShowing` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` (ui.file_manager.ts:644) |
| [531](packages/devextreme/js/ui/file_manager.d.ts#L531) | null-missing | `onCurrentDirectoryChanged` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` (ui.file_manager.ts:646) |
| [539](packages/devextreme/js/ui/file_manager.d.ts#L539) | null-missing | `onSelectedFileOpened` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` (ui.file_manager.ts:648) |
| [547](packages/devextreme/js/ui/file_manager.d.ts#L547) | null-missing | `onSelectionChanged` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` ([ui.file_manager.ts:650](packages/devextreme/js/__internal/ui/file_manager/ui.file_manager.ts#L650)) |
| [562](packages/devextreme/js/ui/file_manager.d.ts#L562) | null-missing | `onFocusedItemChanged` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` ([ui.file_manager.ts:652](packages/devextreme/js/__internal/ui/file_manager/ui.file_manager.ts#L652)) |
| [570](packages/devextreme/js/ui/file_manager.d.ts#L570) | null-missing | `onErrorOccurred` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` (ui.file_manager.ts:656) |
| [578](packages/devextreme/js/ui/file_manager.d.ts#L578) | null-missing | `onDirectoryCreating` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` (ui.file_manager.ts:658) |
| [586](packages/devextreme/js/ui/file_manager.d.ts#L586) | null-missing | `onDirectoryCreated` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` (ui.file_manager.ts:659) |
| [594](packages/devextreme/js/ui/file_manager.d.ts#L594) | null-missing | `onItemRenaming` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` (ui.file_manager.ts:660) |
| [602](packages/devextreme/js/ui/file_manager.d.ts#L602) | null-missing | `onItemRenamed` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` (ui.file_manager.ts:661) |
| [610](packages/devextreme/js/ui/file_manager.d.ts#L610) | null-missing | `onItemMoving` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` (ui.file_manager.ts:666) |
| [618](packages/devextreme/js/ui/file_manager.d.ts#L618) | null-missing | `onItemMoved` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` (ui.file_manager.ts:667) |
| [626](packages/devextreme/js/ui/file_manager.d.ts#L626) | null-missing | `onItemCopying` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` (ui.file_manager.ts:664) |
| [634](packages/devextreme/js/ui/file_manager.d.ts#L634) | null-missing | `onItemCopied` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` (ui.file_manager.ts:665) |
| [642](packages/devextreme/js/ui/file_manager.d.ts#L642) | null-missing | `onItemDeleting` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` (ui.file_manager.ts:662) |
| [650](packages/devextreme/js/ui/file_manager.d.ts#L650) | null-missing | `onItemDeleted` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` (ui.file_manager.ts:663) |
| [658](packages/devextreme/js/ui/file_manager.d.ts#L658) | null-missing | `onFileUploading` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` (ui.file_manager.ts:668) |
| [666](packages/devextreme/js/ui/file_manager.d.ts#L666) | null-missing | `onFileUploaded` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` (ui.file_manager.ts:669) |
| [674](packages/devextreme/js/ui/file_manager.d.ts#L674) | null-missing | `onItemDownloading` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` (ui.file_manager.ts:670) |
| [739](packages/devextreme/js/ui/file_manager.d.ts#L739) | null-missing | `focusedItemKey` | Change `@default` to `undefined` + add `\| undefined` | stored `undefined` ([ui.file_manager.ts:599](packages/devextreme/js/__internal/ui/file_manager/ui.file_manager.ts#L599)) |

### [`js/ui/gantt.d.ts`](packages/devextreme/js/ui/gantt.d.ts) — runtime `ui.gantt.helper.ts`

| Line | Kind | Detail | Verdict | Reason |
|------|------|--------|---------|--------|
| [525](packages/devextreme/js/ui/gantt.d.ts#L525) | null-missing | `dependencies` | Remove `@default` | A-obj — runtime stores a config object ([ui.gantt.helper.ts:134](packages/devextreme/js/__internal/ui/gantt/ui.gantt.helper.ts#L134)) |
| [652](packages/devextreme/js/ui/gantt.d.ts#L652) | null-missing | `onSelectionChanged` | Add `\| null` | runtime stores `null` ([ui.gantt.helper.ts:160](packages/devextreme/js/__internal/ui/gantt/ui.gantt.helper.ts#L160)) |
| [660](packages/devextreme/js/ui/gantt.d.ts#L660) | null-missing | `onCustomCommand` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:185) |
| [668](packages/devextreme/js/ui/gantt.d.ts#L668) | null-missing | `onContextMenuPreparing` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:186) |
| [676](packages/devextreme/js/ui/gantt.d.ts#L676) | null-missing | `onTaskInserting` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:163) |
| [684](packages/devextreme/js/ui/gantt.d.ts#L684) | null-missing | `onTaskInserted` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:164) |
| [692](packages/devextreme/js/ui/gantt.d.ts#L692) | null-missing | `onTaskDeleting` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:165) |
| [700](packages/devextreme/js/ui/gantt.d.ts#L700) | null-missing | `onTaskDeleted` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:166) |
| [708](packages/devextreme/js/ui/gantt.d.ts#L708) | null-missing | `onTaskUpdating` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:167) |
| [716](packages/devextreme/js/ui/gantt.d.ts#L716) | null-missing | `onTaskUpdated` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:168) |
| [724](packages/devextreme/js/ui/gantt.d.ts#L724) | null-missing | `onTaskMoving` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:169) |
| [732](packages/devextreme/js/ui/gantt.d.ts#L732) | null-missing | `onTaskEditDialogShowing` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:170) |
| [740](packages/devextreme/js/ui/gantt.d.ts#L740) | null-missing | `onResourceManagerDialogShowing` | Change `@default` to `undefined` + add `\| undefined` | createAction-only, not in `getDefaultOptions` ([ui.gantt.actions.ts:860](packages/devextreme/js/__internal/ui/gantt/ui.gantt.actions.ts#L860)) → `undefined` |
| [748](packages/devextreme/js/ui/gantt.d.ts#L748) | null-missing | `onDependencyInserting` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:171) |
| [756](packages/devextreme/js/ui/gantt.d.ts#L756) | null-missing | `onDependencyInserted` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:172) |
| [764](packages/devextreme/js/ui/gantt.d.ts#L764) | null-missing | `onDependencyDeleting` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:173) |
| [772](packages/devextreme/js/ui/gantt.d.ts#L772) | null-missing | `onDependencyDeleted` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:174) |
| [780](packages/devextreme/js/ui/gantt.d.ts#L780) | null-missing | `onResourceInserting` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:175) |
| [788](packages/devextreme/js/ui/gantt.d.ts#L788) | null-missing | `onResourceInserted` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:176) |
| [796](packages/devextreme/js/ui/gantt.d.ts#L796) | null-missing | `onResourceDeleting` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:177) |
| [804](packages/devextreme/js/ui/gantt.d.ts#L804) | null-missing | `onResourceDeleted` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:178) |
| [812](packages/devextreme/js/ui/gantt.d.ts#L812) | null-missing | `onResourceAssigning` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:179) |
| [820](packages/devextreme/js/ui/gantt.d.ts#L820) | null-missing | `onResourceAssigned` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:180) |
| [828](packages/devextreme/js/ui/gantt.d.ts#L828) | null-missing | `onResourceUnassigning` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:182) |
| [836](packages/devextreme/js/ui/gantt.d.ts#L836) | null-missing | `onResourceUnassigned` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:184) |
| [844](packages/devextreme/js/ui/gantt.d.ts#L844) | null-missing | `onTaskClick` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:161) |
| [852](packages/devextreme/js/ui/gantt.d.ts#L852) | null-missing | `onTaskDblClick` | Add `\| null` | runtime stores `null` (ui.gantt.helper.ts:162) |
| [860](packages/devextreme/js/ui/gantt.d.ts#L860) | null-missing | `onScaleCellPrepared` | Change `@default` to `undefined` + add `\| undefined` | createAction-only, not in `getDefaultOptions` ([ui.gantt.actions.ts:918](packages/devextreme/js/__internal/ui/gantt/ui.gantt.actions.ts#L918)) → `undefined` |
| [867](packages/devextreme/js/ui/gantt.d.ts#L867) | null-missing | `resourceAssignments` | Remove `@default` | A-obj — runtime stores a config object ([ui.gantt.helper.ts:147](packages/devextreme/js/__internal/ui/gantt/ui.gantt.helper.ts#L147)) |
| [895](packages/devextreme/js/ui/gantt.d.ts#L895) | null-missing | `resources` | Remove `@default` | A-obj — runtime stores a config object ([ui.gantt.helper.ts:141](packages/devextreme/js/__internal/ui/gantt/ui.gantt.helper.ts#L141)) |
| [987](packages/devextreme/js/ui/gantt.d.ts#L987) | null-missing | `tasks` | Remove `@default` | A-obj — runtime stores a config object ([ui.gantt.helper.ts:124](packages/devextreme/js/__internal/ui/gantt/ui.gantt.helper.ts#L124)) |
| [1035](packages/devextreme/js/ui/gantt.d.ts#L1035) | null-missing | `toolbar` | Add `\| null` | runtime stores `null` ([ui.gantt.helper.ts:212](packages/devextreme/js/__internal/ui/gantt/ui.gantt.helper.ts#L212)) |
| [1046](packages/devextreme/js/ui/gantt.d.ts#L1046) | undefined-missing | `stripLines` | Add `\| undefined` | runtime stores `undefined` ([ui.gantt.helper.ts:189](packages/devextreme/js/__internal/ui/gantt/ui.gantt.helper.ts#L189)) |
| [1091](packages/devextreme/js/ui/gantt.d.ts#L1091) | null-missing | `startDateRange`, type `Date` | Change `@default` to `undefined` + add `\| undefined` | not in `getDefaultOptions` → `undefined` (read via `.option()`, ui.gantt.view.ts:104) |
| [1097](packages/devextreme/js/ui/gantt.d.ts#L1097) | null-missing | `endDateRange`, type `Date` | Change `@default` to `undefined` + add `\| undefined` | not in `getDefaultOptions` → `undefined` (ui.gantt.view.ts:105) |
