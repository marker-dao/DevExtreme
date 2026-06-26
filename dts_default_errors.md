# JSDoc @default / type mismatch errors — by team (Squad)

> **Total:** 495 warnings across 77 files  
> Rule: `devextreme-custom/jsdoc-default-matches-type` · Scope: `packages/devextreme/js/**/*.d.ts`

## Summary by team

| Team | Files | Warnings |
|------|------:|---------:|
| Platforms Squad | 5 | 12 |
| Editors & Navigation Squad | 58 | 271 |
| Grids Squad | 7 | 88 |
| Scheduler Squad | 4 | 52 |
| ASP Tribe | 3 | 72 |
| **Total** | **77** | **495** |

## Error kinds

| Code | Meaning |
|------|---------|
| **null-missing** | `@default null` but type has no `\| null` |
| **undefined-missing** | `@default undefined` but type has no `\| undefined` |
| **concrete+undefined** | Concrete `@default` value but type includes `\| undefined` |

---

# Platforms Squad  
_12 warnings · 5 files_

### [`js/common.d.ts`](packages/devextreme/js/common.d.ts) — 5

| Line | Kind | Detail |
|------|------|--------|
| [304](packages/devextreme/js/common.d.ts#L304) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [310](packages/devextreme/js/common.d.ts#L310) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [316](packages/devextreme/js/common.d.ts#L316) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [322](packages/devextreme/js/common.d.ts#L322) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [328](packages/devextreme/js/common.d.ts#L328) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |

### [`js/common/data.d.ts`](packages/devextreme/js/common/data.d.ts) — 1

| Line | Kind | Detail |
|------|------|--------|
| [486](packages/devextreme/js/common/data.d.ts#L486) | null-missing | `@default null` is set, but the type has no `null` |

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

# Editors & Navigation Squad  
_271 warnings · 58 files_

### [`js/common/charts.d.ts`](packages/devextreme/js/common/charts.d.ts) — 3

| Line | Kind | Detail |
|------|------|--------|
| [258](packages/devextreme/js/common/charts.d.ts#L258) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [643](packages/devextreme/js/common/charts.d.ts#L643) | concrete+undefined | `@default '#d3d3d3'` is concrete, but the type includes `\| undefined` |
| [648](packages/devextreme/js/common/charts.d.ts#L648) | concrete+undefined | `@default 'solid'` is concrete, but the type includes `\| undefined` |

### [`js/ui/accordion.d.ts`](packages/devextreme/js/ui/accordion.d.ts) — 1

| Line | Kind | Detail |
|------|------|--------|
| [204](packages/devextreme/js/ui/accordion.d.ts#L204) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/action_sheet.d.ts`](packages/devextreme/js/ui/action_sheet.d.ts) — 2

| Line | Kind | Detail |
|------|------|--------|
| [147](packages/devextreme/js/ui/action_sheet.d.ts#L147) | null-missing | `@default null` is set, but the type has no `null` |
| [242](packages/devextreme/js/ui/action_sheet.d.ts#L242) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/button_group.d.ts`](packages/devextreme/js/ui/button_group.d.ts) — 2

| Line | Kind | Detail |
|------|------|--------|
| [129](packages/devextreme/js/ui/button_group.d.ts#L129) | null-missing | `@default null` is set, but the type has no `null` |
| [137](packages/devextreme/js/ui/button_group.d.ts#L137) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/button.d.ts`](packages/devextreme/js/ui/button.d.ts) — 1

| Line | Kind | Detail |
|------|------|--------|
| [117](packages/devextreme/js/ui/button.d.ts#L117) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/calendar.d.ts`](packages/devextreme/js/ui/calendar.d.ts) — 2

| Line | Kind | Detail |
|------|------|--------|
| [128](packages/devextreme/js/ui/calendar.d.ts#L128) | null-missing | `@default null` is set, but the type has no `null` |
| [221](packages/devextreme/js/ui/calendar.d.ts#L221) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/check_box.d.ts`](packages/devextreme/js/ui/check_box.d.ts) — 1

| Line | Kind | Detail |
|------|------|--------|
| [107](packages/devextreme/js/ui/check_box.d.ts#L107) | concrete+undefined | `@default false` is concrete, but the type includes `\| undefined` |

### [`js/ui/collection/ui.collection_widget.base.d.ts`](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts) — 8

| Line | Kind | Detail |
|------|------|--------|
| [83](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts#L83) | null-missing | `@default null` is set, but the type has no `null` |
| [101](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts#L101) | null-missing | `@default null` is set, but the type has no `null` |
| [112](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts#L112) | null-missing | `@default null` is set, but the type has no `null` |
| [123](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts#L123) | null-missing | `@default null` is set, but the type has no `null` |
| [133](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts#L133) | null-missing | `@default null` is set, but the type has no `null` |
| [145](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts#L145) | null-missing | `@default null` is set, but the type has no `null` |
| [156](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts#L156) | null-missing | `@default null` is set, but the type has no `null` |
| [171](packages/devextreme/js/ui/collection/ui.collection_widget.base.d.ts#L171) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/color_box.d.ts`](packages/devextreme/js/ui/color_box.d.ts) — 1

| Line | Kind | Detail |
|------|------|--------|
| [202](packages/devextreme/js/ui/color_box.d.ts#L202) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/context_menu.d.ts`](packages/devextreme/js/ui/context_menu.d.ts) — 5

| Line | Kind | Detail |
|------|------|--------|
| [187](packages/devextreme/js/ui/context_menu.d.ts#L187) | null-missing | `@default null` is set, but the type has no `null` |
| [195](packages/devextreme/js/ui/context_menu.d.ts#L195) | null-missing | `@default null` is set, but the type has no `null` |
| [203](packages/devextreme/js/ui/context_menu.d.ts#L203) | null-missing | `@default null` is set, but the type has no `null` |
| [211](packages/devextreme/js/ui/context_menu.d.ts#L211) | null-missing | `@default null` is set, but the type has no `null` |
| [219](packages/devextreme/js/ui/context_menu.d.ts#L219) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/date_box.d.ts`](packages/devextreme/js/ui/date_box.d.ts) — 4

| Line | Kind | Detail |
|------|------|--------|
| [215](packages/devextreme/js/ui/date_box.d.ts#L215) | null-missing | `@default null` is set, but the type has no `null` |
| [245](packages/devextreme/js/ui/date_box.d.ts#L245) | null-missing | `@default null` is set, but the type has no `null` |
| [290](packages/devextreme/js/ui/date_box.d.ts#L290) | null-missing | `@default null` is set, but the type has no `null` |
| [331](packages/devextreme/js/ui/date_box.d.ts#L331) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/date_range_box.d.ts`](packages/devextreme/js/ui/date_range_box.d.ts) — 2

| Line | Kind | Detail |
|------|------|--------|
| [192](packages/devextreme/js/ui/date_range_box.d.ts#L192) | null-missing | `@default null` is set, but the type has no `null` |
| [262](packages/devextreme/js/ui/date_range_box.d.ts#L262) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/drawer.d.ts`](packages/devextreme/js/ui/drawer.d.ts) — 2

| Line | Kind | Detail |
|------|------|--------|
| [86](packages/devextreme/js/ui/drawer.d.ts#L86) | null-missing | `@default null` is set, but the type has no `null` |
| [92](packages/devextreme/js/ui/drawer.d.ts#L92) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/drop_down_box.d.ts`](packages/devextreme/js/ui/drop_down_box.d.ts) — 1

| Line | Kind | Detail |
|------|------|--------|
| [216](packages/devextreme/js/ui/drop_down_box.d.ts#L216) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/drop_down_editor/ui.drop_down_editor.d.ts`](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_editor.d.ts) — 4

| Line | Kind | Detail |
|------|------|--------|
| [95](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_editor.d.ts#L95) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [122](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_editor.d.ts#L122) | null-missing | `@default null` is set, but the type has no `null` |
| [129](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_editor.d.ts#L129) | null-missing | `@default null` is set, but the type has no `null` |
| [161](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_editor.d.ts#L161) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/drop_down_editor/ui.drop_down_list.d.ts`](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_list.d.ts) — 5

| Line | Kind | Detail |
|------|------|--------|
| [99](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_list.d.ts#L99) | null-missing | `@default null` is set, but the type has no `null` |
| [109](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_list.d.ts#L109) | null-missing | `@default null` is set, but the type has no `null` |
| [121](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_list.d.ts#L121) | null-missing | `@default null` is set, but the type has no `null` |
| [134](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_list.d.ts#L134) | null-missing | `@default null` is set, but the type has no `null` |
| [154](packages/devextreme/js/ui/drop_down_editor/ui.drop_down_list.d.ts#L154) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/editor/editor.d.ts`](packages/devextreme/js/ui/editor/editor.d.ts) — 4

| Line | Kind | Detail |
|------|------|--------|
| [56](packages/devextreme/js/ui/editor/editor.d.ts#L56) | null-missing | `@default null` is set, but the type has no `null` |
| [69](packages/devextreme/js/ui/editor/editor.d.ts#L69) | null-missing | `@default null` is set, but the type has no `null` |
| [75](packages/devextreme/js/ui/editor/editor.d.ts#L75) | null-missing | `@default null` is set, but the type has no `null` |
| [100](packages/devextreme/js/ui/editor/editor.d.ts#L100) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/editor/ui.data_expression.d.ts`](packages/devextreme/js/ui/editor/ui.data_expression.d.ts) — 1

| Line | Kind | Detail |
|------|------|--------|
| [55](packages/devextreme/js/ui/editor/ui.data_expression.d.ts#L55) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/file_uploader.d.ts`](packages/devextreme/js/ui/file_uploader.d.ts) — 10

| Line | Kind | Detail |
|------|------|--------|
| [310](packages/devextreme/js/ui/file_uploader.d.ts#L310) | null-missing | `@default null` is set, but the type has no `null` |
| [318](packages/devextreme/js/ui/file_uploader.d.ts#L318) | null-missing | `@default null` is set, but the type has no `null` |
| [326](packages/devextreme/js/ui/file_uploader.d.ts#L326) | null-missing | `@default null` is set, but the type has no `null` |
| [334](packages/devextreme/js/ui/file_uploader.d.ts#L334) | null-missing | `@default null` is set, but the type has no `null` |
| [342](packages/devextreme/js/ui/file_uploader.d.ts#L342) | null-missing | `@default null` is set, but the type has no `null` |
| [350](packages/devextreme/js/ui/file_uploader.d.ts#L350) | null-missing | `@default null` is set, but the type has no `null` |
| [358](packages/devextreme/js/ui/file_uploader.d.ts#L358) | null-missing | `@default null` is set, but the type has no `null` |
| [366](packages/devextreme/js/ui/file_uploader.d.ts#L366) | null-missing | `@default null` is set, but the type has no `null` |
| [374](packages/devextreme/js/ui/file_uploader.d.ts#L374) | null-missing | `@default null` is set, but the type has no `null` |
| [382](packages/devextreme/js/ui/file_uploader.d.ts#L382) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/form.d.ts`](packages/devextreme/js/ui/form.d.ts) — 8

| Line | Kind | Detail |
|------|------|--------|
| [276](packages/devextreme/js/ui/form.d.ts#L276) | null-missing | `@default null` is set, but the type has no `null` |
| [284](packages/devextreme/js/ui/form.d.ts#L284) | null-missing | `@default null` is set, but the type has no `null` |
| [292](packages/devextreme/js/ui/form.d.ts#L292) | null-missing | `@default null` is set, but the type has no `null` |
| [300](packages/devextreme/js/ui/form.d.ts#L300) | null-missing | `@default null` is set, but the type has no `null` |
| [330](packages/devextreme/js/ui/form.d.ts#L330) | null-missing | `@default null` is set, but the type has no `null` |
| [768](packages/devextreme/js/ui/form.d.ts#L768) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [820](packages/devextreme/js/ui/form.d.ts#L820) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [881](packages/devextreme/js/ui/form.d.ts#L881) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |

### [`js/ui/html_editor.d.ts`](packages/devextreme/js/ui/html_editor.d.ts) — 10

| Line | Kind | Detail |
|------|------|--------|
| [314](packages/devextreme/js/ui/html_editor.d.ts#L314) | null-missing | `@default null` is set, but the type has no `null` |
| [320](packages/devextreme/js/ui/html_editor.d.ts#L320) | null-missing | `@default null` is set, but the type has no `null` |
| [326](packages/devextreme/js/ui/html_editor.d.ts#L326) | null-missing | `@default null` is set, but the type has no `null` |
| [332](packages/devextreme/js/ui/html_editor.d.ts#L332) | null-missing | `@default null` is set, but the type has no `null` |
| [352](packages/devextreme/js/ui/html_editor.d.ts#L352) | null-missing | `@default null` is set, but the type has no `null` |
| [360](packages/devextreme/js/ui/html_editor.d.ts#L360) | null-missing | `@default null` is set, but the type has no `null` |
| [372](packages/devextreme/js/ui/html_editor.d.ts#L372) | null-missing | `@default null` is set, but the type has no `null` |
| [378](packages/devextreme/js/ui/html_editor.d.ts#L378) | null-missing | `@default null` is set, but the type has no `null` |
| [645](packages/devextreme/js/ui/html_editor.d.ts#L645) | null-missing | `@default null` is set, but the type has no `null` |
| [772](packages/devextreme/js/ui/html_editor.d.ts#L772) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/list.d.ts`](packages/devextreme/js/ui/list.d.ts) — 12

| Line | Kind | Detail |
|------|------|--------|
| [409](packages/devextreme/js/ui/list.d.ts#L409) | null-missing | `@default null` is set, but the type has no `null` |
| [418](packages/devextreme/js/ui/list.d.ts#L418) | null-missing | `@default null` is set, but the type has no `null` |
| [426](packages/devextreme/js/ui/list.d.ts#L426) | null-missing | `@default null` is set, but the type has no `null` |
| [435](packages/devextreme/js/ui/list.d.ts#L435) | null-missing | `@default null` is set, but the type has no `null` |
| [444](packages/devextreme/js/ui/list.d.ts#L444) | null-missing | `@default null` is set, but the type has no `null` |
| [452](packages/devextreme/js/ui/list.d.ts#L452) | null-missing | `@default null` is set, but the type has no `null` |
| [461](packages/devextreme/js/ui/list.d.ts#L461) | null-missing | `@default null` is set, but the type has no `null` |
| [469](packages/devextreme/js/ui/list.d.ts#L469) | null-missing | `@default null` is set, but the type has no `null` |
| [477](packages/devextreme/js/ui/list.d.ts#L477) | null-missing | `@default null` is set, but the type has no `null` |
| [485](packages/devextreme/js/ui/list.d.ts#L485) | null-missing | `@default null` is set, but the type has no `null` |
| [493](packages/devextreme/js/ui/list.d.ts#L493) | null-missing | `@default null` is set, but the type has no `null` |
| [501](packages/devextreme/js/ui/list.d.ts#L501) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/load_panel.d.ts`](packages/devextreme/js/ui/load_panel.d.ts) — 3

| Line | Kind | Detail |
|------|------|--------|
| [137](packages/devextreme/js/ui/load_panel.d.ts#L137) | null-missing | `@default null` is set, but the type has no `null` |
| [238](packages/devextreme/js/ui/load_panel.d.ts#L238) | null-missing | `@default null` is set, but the type has no `null` |
| [244](packages/devextreme/js/ui/load_panel.d.ts#L244) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/lookup.d.ts`](packages/devextreme/js/ui/lookup.d.ts) — 5

| Line | Kind | Detail |
|------|------|--------|
| [188](packages/devextreme/js/ui/lookup.d.ts#L188) | null-missing | `@default null` is set, but the type has no `null` |
| [223](packages/devextreme/js/ui/lookup.d.ts#L223) | null-missing | `@default null` is set, but the type has no `null` |
| [231](packages/devextreme/js/ui/lookup.d.ts#L231) | null-missing | `@default null` is set, but the type has no `null` |
| [239](packages/devextreme/js/ui/lookup.d.ts#L239) | null-missing | `@default null` is set, but the type has no `null` |
| [247](packages/devextreme/js/ui/lookup.d.ts#L247) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/map.d.ts`](packages/devextreme/js/ui/map.d.ts) — 6

| Line | Kind | Detail |
|------|------|--------|
| [273](packages/devextreme/js/ui/map.d.ts#L273) | null-missing | `@default null` is set, but the type has no `null` |
| [281](packages/devextreme/js/ui/map.d.ts#L281) | null-missing | `@default null` is set, but the type has no `null` |
| [289](packages/devextreme/js/ui/map.d.ts#L289) | null-missing | `@default null` is set, but the type has no `null` |
| [297](packages/devextreme/js/ui/map.d.ts#L297) | null-missing | `@default null` is set, but the type has no `null` |
| [305](packages/devextreme/js/ui/map.d.ts#L305) | null-missing | `@default null` is set, but the type has no `null` |
| [313](packages/devextreme/js/ui/map.d.ts#L313) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/menu.d.ts`](packages/devextreme/js/ui/menu.d.ts) — 4

| Line | Kind | Detail |
|------|------|--------|
| [218](packages/devextreme/js/ui/menu.d.ts#L218) | null-missing | `@default null` is set, but the type has no `null` |
| [226](packages/devextreme/js/ui/menu.d.ts#L226) | null-missing | `@default null` is set, but the type has no `null` |
| [234](packages/devextreme/js/ui/menu.d.ts#L234) | null-missing | `@default null` is set, but the type has no `null` |
| [242](packages/devextreme/js/ui/menu.d.ts#L242) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/number_box.d.ts`](packages/devextreme/js/ui/number_box.d.ts) — 1

| Line | Kind | Detail |
|------|------|--------|
| [164](packages/devextreme/js/ui/number_box.d.ts#L164) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |

### [`js/ui/overlay.d.ts`](packages/devextreme/js/ui/overlay.d.ts) — 8

| Line | Kind | Detail |
|------|------|--------|
| [87](packages/devextreme/js/ui/overlay.d.ts#L87) | null-missing | `@default null` is set, but the type has no `null` |
| [93](packages/devextreme/js/ui/overlay.d.ts#L93) | null-missing | `@default null` is set, but the type has no `null` |
| [99](packages/devextreme/js/ui/overlay.d.ts#L99) | null-missing | `@default null` is set, but the type has no `null` |
| [105](packages/devextreme/js/ui/overlay.d.ts#L105) | null-missing | `@default null` is set, but the type has no `null` |
| [112](packages/devextreme/js/ui/overlay.d.ts#L112) | null-missing | `@default null` is set, but the type has no `null` |
| [122](packages/devextreme/js/ui/overlay.d.ts#L122) | null-missing | `@default null` is set, but the type has no `null` |
| [132](packages/devextreme/js/ui/overlay.d.ts#L132) | null-missing | `@default null` is set, but the type has no `null` |
| [139](packages/devextreme/js/ui/overlay.d.ts#L139) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/popup.d.ts`](packages/devextreme/js/ui/popup.d.ts) — 4

| Line | Kind | Detail |
|------|------|--------|
| [156](packages/devextreme/js/ui/popup.d.ts#L156) | null-missing | `@default null` is set, but the type has no `null` |
| [166](packages/devextreme/js/ui/popup.d.ts#L166) | null-missing | `@default null` is set, but the type has no `null` |
| [176](packages/devextreme/js/ui/popup.d.ts#L176) | null-missing | `@default null` is set, but the type has no `null` |
| [185](packages/devextreme/js/ui/popup.d.ts#L185) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/progress_bar.d.ts`](packages/devextreme/js/ui/progress_bar.d.ts) — 1

| Line | Kind | Detail |
|------|------|--------|
| [77](packages/devextreme/js/ui/progress_bar.d.ts#L77) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/range_slider.d.ts`](packages/devextreme/js/ui/range_slider.d.ts) — 1

| Line | Kind | Detail |
|------|------|--------|
| [91](packages/devextreme/js/ui/range_slider.d.ts#L91) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/resizable.d.ts`](packages/devextreme/js/ui/resizable.d.ts) — 3

| Line | Kind | Detail |
|------|------|--------|
| [136](packages/devextreme/js/ui/resizable.d.ts#L136) | null-missing | `@default null` is set, but the type has no `null` |
| [144](packages/devextreme/js/ui/resizable.d.ts#L144) | null-missing | `@default null` is set, but the type has no `null` |
| [152](packages/devextreme/js/ui/resizable.d.ts#L152) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/responsive_box.d.ts`](packages/devextreme/js/ui/responsive_box.d.ts) — 1

| Line | Kind | Detail |
|------|------|--------|
| [178](packages/devextreme/js/ui/responsive_box.d.ts#L178) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/scroll_view.d.ts`](packages/devextreme/js/ui/scroll_view.d.ts) — 2

| Line | Kind | Detail |
|------|------|--------|
| [85](packages/devextreme/js/ui/scroll_view.d.ts#L85) | null-missing | `@default null` is set, but the type has no `null` |
| [93](packages/devextreme/js/ui/scroll_view.d.ts#L93) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/scroll_view/ui.scrollable.d.ts`](packages/devextreme/js/ui/scroll_view/ui.scrollable.d.ts) — 2

| Line | Kind | Detail |
|------|------|--------|
| [73](packages/devextreme/js/ui/scroll_view/ui.scrollable.d.ts#L73) | null-missing | `@default null` is set, but the type has no `null` |
| [81](packages/devextreme/js/ui/scroll_view/ui.scrollable.d.ts#L81) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/select_box.d.ts`](packages/devextreme/js/ui/select_box.d.ts) — 1

| Line | Kind | Detail |
|------|------|--------|
| [237](packages/devextreme/js/ui/select_box.d.ts#L237) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/speed_dial_action.d.ts`](packages/devextreme/js/ui/speed_dial_action.d.ts) — 1

| Line | Kind | Detail |
|------|------|--------|
| [100](packages/devextreme/js/ui/speed_dial_action.d.ts#L100) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/splitter.d.ts`](packages/devextreme/js/ui/splitter.d.ts) — 5

| Line | Kind | Detail |
|------|------|--------|
| [188](packages/devextreme/js/ui/splitter.d.ts#L188) | null-missing | `@default null` is set, but the type has no `null` |
| [196](packages/devextreme/js/ui/splitter.d.ts#L196) | null-missing | `@default null` is set, but the type has no `null` |
| [204](packages/devextreme/js/ui/splitter.d.ts#L204) | null-missing | `@default null` is set, but the type has no `null` |
| [212](packages/devextreme/js/ui/splitter.d.ts#L212) | null-missing | `@default null` is set, but the type has no `null` |
| [220](packages/devextreme/js/ui/splitter.d.ts#L220) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/tab_panel.d.ts`](packages/devextreme/js/ui/tab_panel.d.ts) — 3

| Line | Kind | Detail |
|------|------|--------|
| [227](packages/devextreme/js/ui/tab_panel.d.ts#L227) | null-missing | `@default null` is set, but the type has no `null` |
| [235](packages/devextreme/js/ui/tab_panel.d.ts#L235) | null-missing | `@default null` is set, but the type has no `null` |
| [243](packages/devextreme/js/ui/tab_panel.d.ts#L243) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/tag_box.d.ts`](packages/devextreme/js/ui/tag_box.d.ts) — 3

| Line | Kind | Detail |
|------|------|--------|
| [246](packages/devextreme/js/ui/tag_box.d.ts#L246) | null-missing | `@default null` is set, but the type has no `null` |
| [254](packages/devextreme/js/ui/tag_box.d.ts#L254) | null-missing | `@default null` is set, but the type has no `null` |
| [262](packages/devextreme/js/ui/tag_box.d.ts#L262) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/text_box.d.ts`](packages/devextreme/js/ui/text_box.d.ts) — 1

| Line | Kind | Detail |
|------|------|--------|
| [155](packages/devextreme/js/ui/text_box.d.ts#L155) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/text_box/ui.text_editor.base.d.ts`](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts) — 11

| Line | Kind | Detail |
|------|------|--------|
| [31](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L31) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [101](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L101) | null-missing | `@default null` is set, but the type has no `null` |
| [109](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L109) | null-missing | `@default null` is set, but the type has no `null` |
| [117](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L117) | null-missing | `@default null` is set, but the type has no `null` |
| [125](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L125) | null-missing | `@default null` is set, but the type has no `null` |
| [133](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L133) | null-missing | `@default null` is set, but the type has no `null` |
| [141](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L141) | null-missing | `@default null` is set, but the type has no `null` |
| [149](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L149) | null-missing | `@default null` is set, but the type has no `null` |
| [157](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L157) | null-missing | `@default null` is set, but the type has no `null` |
| [165](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L165) | null-missing | `@default null` is set, but the type has no `null` |
| [173](packages/devextreme/js/ui/text_box/ui.text_editor.base.d.ts#L173) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/tree_view.d.ts`](packages/devextreme/js/ui/tree_view.d.ts) — 9

| Line | Kind | Detail |
|------|------|--------|
| [266](packages/devextreme/js/ui/tree_view.d.ts#L266) | null-missing | `@default null` is set, but the type has no `null` |
| [274](packages/devextreme/js/ui/tree_view.d.ts#L274) | null-missing | `@default null` is set, but the type has no `null` |
| [282](packages/devextreme/js/ui/tree_view.d.ts#L282) | null-missing | `@default null` is set, but the type has no `null` |
| [290](packages/devextreme/js/ui/tree_view.d.ts#L290) | null-missing | `@default null` is set, but the type has no `null` |
| [298](packages/devextreme/js/ui/tree_view.d.ts#L298) | null-missing | `@default null` is set, but the type has no `null` |
| [306](packages/devextreme/js/ui/tree_view.d.ts#L306) | null-missing | `@default null` is set, but the type has no `null` |
| [314](packages/devextreme/js/ui/tree_view.d.ts#L314) | null-missing | `@default null` is set, but the type has no `null` |
| [322](packages/devextreme/js/ui/tree_view.d.ts#L322) | null-missing | `@default null` is set, but the type has no `null` |
| [331](packages/devextreme/js/ui/tree_view.d.ts#L331) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/widget/ui.search_box_mixin.d.ts`](packages/devextreme/js/ui/widget/ui.search_box_mixin.d.ts) — 1

| Line | Kind | Detail |
|------|------|--------|
| [34](packages/devextreme/js/ui/widget/ui.search_box_mixin.d.ts#L34) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/viz/bar_gauge.d.ts`](packages/devextreme/js/viz/bar_gauge.d.ts) — 2

| Line | Kind | Detail |
|------|------|--------|
| [308](packages/devextreme/js/viz/bar_gauge.d.ts#L308) | null-missing | `@default null` is set, but the type has no `null` |
| [317](packages/devextreme/js/viz/bar_gauge.d.ts#L317) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/viz/chart_components/base_chart.d.ts`](packages/devextreme/js/viz/chart_components/base_chart.d.ts) — 4

| Line | Kind | Detail |
|------|------|--------|
| [212](packages/devextreme/js/viz/chart_components/base_chart.d.ts#L212) | null-missing | `@default null` is set, but the type has no `null` |
| [225](packages/devextreme/js/viz/chart_components/base_chart.d.ts#L225) | null-missing | `@default null` is set, but the type has no `null` |
| [258](packages/devextreme/js/viz/chart_components/base_chart.d.ts#L258) | null-missing | `@default null` is set, but the type has no `null` |
| [269](packages/devextreme/js/viz/chart_components/base_chart.d.ts#L269) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/viz/chart.d.ts`](packages/devextreme/js/viz/chart.d.ts) — 17

| Line | Kind | Detail |
|------|------|--------|
| [1357](packages/devextreme/js/viz/chart.d.ts#L1357) | null-missing | `@default null` is set, but the type has no `null` |
| [1367](packages/devextreme/js/viz/chart.d.ts#L1367) | null-missing | `@default null` is set, but the type has no `null` |
| [1377](packages/devextreme/js/viz/chart.d.ts#L1377) | null-missing | `@default null` is set, but the type has no `null` |
| [1386](packages/devextreme/js/viz/chart.d.ts#L1386) | null-missing | `@default null` is set, but the type has no `null` |
| [1395](packages/devextreme/js/viz/chart.d.ts#L1395) | null-missing | `@default null` is set, but the type has no `null` |
| [1404](packages/devextreme/js/viz/chart.d.ts#L1404) | null-missing | `@default null` is set, but the type has no `null` |
| [1413](packages/devextreme/js/viz/chart.d.ts#L1413) | null-missing | `@default null` is set, but the type has no `null` |
| [1497](packages/devextreme/js/viz/chart.d.ts#L1497) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [1623](packages/devextreme/js/viz/chart.d.ts#L1623) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [1655](packages/devextreme/js/viz/chart.d.ts#L1655) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [1688](packages/devextreme/js/viz/chart.d.ts#L1688) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [1731](packages/devextreme/js/viz/chart.d.ts#L1731) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [2146](packages/devextreme/js/viz/chart.d.ts#L2146) | null-missing | `@default null` is set, but the type has no `null` |
| [2744](packages/devextreme/js/viz/chart.d.ts#L2744) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [2803](packages/devextreme/js/viz/chart.d.ts#L2803) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [4025](packages/devextreme/js/viz/chart.d.ts#L4025) | concrete+undefined | `@default 'solid'` is concrete, but the type includes `\| undefined` |
| [4123](packages/devextreme/js/viz/chart.d.ts#L4123) | concrete+undefined | `@default 'solid'` is concrete, but the type includes `\| undefined` |

### [`js/viz/common.d.ts`](packages/devextreme/js/viz/common.d.ts) — 2

| Line | Kind | Detail |
|------|------|--------|
| [250](packages/devextreme/js/viz/common.d.ts#L250) | null-missing | `@default null` is set, but the type has no `null` |
| [256](packages/devextreme/js/viz/common.d.ts#L256) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/viz/core/base_widget.d.ts`](packages/devextreme/js/viz/core/base_widget.d.ts) — 7

| Line | Kind | Detail |
|------|------|--------|
| [122](packages/devextreme/js/viz/core/base_widget.d.ts#L122) | null-missing | `@default null` is set, but the type has no `null` |
| [129](packages/devextreme/js/viz/core/base_widget.d.ts#L129) | null-missing | `@default null` is set, but the type has no `null` |
| [138](packages/devextreme/js/viz/core/base_widget.d.ts#L138) | null-missing | `@default null` is set, but the type has no `null` |
| [146](packages/devextreme/js/viz/core/base_widget.d.ts#L146) | null-missing | `@default null` is set, but the type has no `null` |
| [155](packages/devextreme/js/viz/core/base_widget.d.ts#L155) | null-missing | `@default null` is set, but the type has no `null` |
| [425](packages/devextreme/js/viz/core/base_widget.d.ts#L425) | null-missing | `@default null` is set, but the type has no `null` |
| [442](packages/devextreme/js/viz/core/base_widget.d.ts#L442) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/viz/funnel.d.ts`](packages/devextreme/js/viz/funnel.d.ts) — 7

| Line | Kind | Detail |
|------|------|--------|
| [276](packages/devextreme/js/viz/funnel.d.ts#L276) | concrete+undefined | `@default #ffffff` is concrete, but the type includes `\| undefined` |
| [281](packages/devextreme/js/viz/funnel.d.ts#L281) | concrete+undefined | `@default false` is concrete, but the type includes `\| undefined` |
| [286](packages/devextreme/js/viz/funnel.d.ts#L286) | concrete+undefined | `@default 2` is concrete, but the type includes `\| undefined` |
| [527](packages/devextreme/js/viz/funnel.d.ts#L527) | null-missing | `@default null` is set, but the type has no `null` |
| [537](packages/devextreme/js/viz/funnel.d.ts#L537) | null-missing | `@default null` is set, but the type has no `null` |
| [547](packages/devextreme/js/viz/funnel.d.ts#L547) | null-missing | `@default null` is set, but the type has no `null` |
| [556](packages/devextreme/js/viz/funnel.d.ts#L556) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/viz/gauges/base_gauge.d.ts`](packages/devextreme/js/viz/gauges/base_gauge.d.ts) — 5

| Line | Kind | Detail |
|------|------|--------|
| [81](packages/devextreme/js/viz/gauges/base_gauge.d.ts#L81) | null-missing | `@default null` is set, but the type has no `null` |
| [92](packages/devextreme/js/viz/gauges/base_gauge.d.ts#L92) | null-missing | `@default null` is set, but the type has no `null` |
| [112](packages/devextreme/js/viz/gauges/base_gauge.d.ts#L112) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [234](packages/devextreme/js/viz/gauges/base_gauge.d.ts#L234) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [241](packages/devextreme/js/viz/gauges/base_gauge.d.ts#L241) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |

### [`js/viz/pie_chart.d.ts`](packages/devextreme/js/viz/pie_chart.d.ts) — 4

| Line | Kind | Detail |
|------|------|--------|
| [359](packages/devextreme/js/viz/pie_chart.d.ts#L359) | null-missing | `@default null` is set, but the type has no `null` |
| [392](packages/devextreme/js/viz/pie_chart.d.ts#L392) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [742](packages/devextreme/js/viz/pie_chart.d.ts#L742) | concrete+undefined | `@default '#d3d3d3'` is concrete, but the type includes `\| undefined` |
| [747](packages/devextreme/js/viz/pie_chart.d.ts#L747) | concrete+undefined | `@default 'solid'` is concrete, but the type includes `\| undefined` |

### [`js/viz/polar_chart.d.ts`](packages/devextreme/js/viz/polar_chart.d.ts) — 13

| Line | Kind | Detail |
|------|------|--------|
| [447](packages/devextreme/js/viz/polar_chart.d.ts#L447) | null-missing | `@default null` is set, but the type has no `null` |
| [457](packages/devextreme/js/viz/polar_chart.d.ts#L457) | null-missing | `@default null` is set, but the type has no `null` |
| [467](packages/devextreme/js/viz/polar_chart.d.ts#L467) | null-missing | `@default null` is set, but the type has no `null` |
| [476](packages/devextreme/js/viz/polar_chart.d.ts#L476) | null-missing | `@default null` is set, but the type has no `null` |
| [485](packages/devextreme/js/viz/polar_chart.d.ts#L485) | null-missing | `@default null` is set, but the type has no `null` |
| [494](packages/devextreme/js/viz/polar_chart.d.ts#L494) | null-missing | `@default null` is set, but the type has no `null` |
| [503](packages/devextreme/js/viz/polar_chart.d.ts#L503) | null-missing | `@default null` is set, but the type has no `null` |
| [531](packages/devextreme/js/viz/polar_chart.d.ts#L531) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [1327](packages/devextreme/js/viz/polar_chart.d.ts#L1327) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [1763](packages/devextreme/js/viz/polar_chart.d.ts#L1763) | concrete+undefined | `@default 'solid'` is concrete, but the type includes `\| undefined` |
| [1890](packages/devextreme/js/viz/polar_chart.d.ts#L1890) | concrete+undefined | `@default 'solid'` is concrete, but the type includes `\| undefined` |
| [2068](packages/devextreme/js/viz/polar_chart.d.ts#L2068) | concrete+undefined | `@default '#d3d3d3'` is concrete, but the type includes `\| undefined` |
| [2073](packages/devextreme/js/viz/polar_chart.d.ts#L2073) | concrete+undefined | `@default 'solid'` is concrete, but the type includes `\| undefined` |

### [`js/viz/range_selector.d.ts`](packages/devextreme/js/viz/range_selector.d.ts) — 5

| Line | Kind | Detail |
|------|------|--------|
| [297](packages/devextreme/js/viz/range_selector.d.ts#L297) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [394](packages/devextreme/js/viz/range_selector.d.ts#L394) | null-missing | `@default null` is set, but the type has no `null` |
| [448](packages/devextreme/js/viz/range_selector.d.ts#L448) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [468](packages/devextreme/js/viz/range_selector.d.ts#L468) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [622](packages/devextreme/js/viz/range_selector.d.ts#L622) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |

### [`js/viz/sankey.d.ts`](packages/devextreme/js/viz/sankey.d.ts) — 14

| Line | Kind | Detail |
|------|------|--------|
| [210](packages/devextreme/js/viz/sankey.d.ts#L210) | concrete+undefined | `@default '#000000'` is concrete, but the type includes `\| undefined` |
| [215](packages/devextreme/js/viz/sankey.d.ts#L215) | concrete+undefined | `@default false` is concrete, but the type includes `\| undefined` |
| [220](packages/devextreme/js/viz/sankey.d.ts#L220) | concrete+undefined | `@default 2` is concrete, but the type includes `\| undefined` |
| [301](packages/devextreme/js/viz/sankey.d.ts#L301) | concrete+undefined | `@default '#000000'` is concrete, but the type includes `\| undefined` |
| [306](packages/devextreme/js/viz/sankey.d.ts#L306) | concrete+undefined | `@default false` is concrete, but the type includes `\| undefined` |
| [311](packages/devextreme/js/viz/sankey.d.ts#L311) | concrete+undefined | `@default 2` is concrete, but the type includes `\| undefined` |
| [381](packages/devextreme/js/viz/sankey.d.ts#L381) | concrete+undefined | `@default 0 |
| [402](packages/devextreme/js/viz/sankey.d.ts#L402) | concrete+undefined | `@default '#000000'` is concrete, but the type includes `\| undefined` |
| [407](packages/devextreme/js/viz/sankey.d.ts#L407) | concrete+undefined | `@default false` is concrete, but the type includes `\| undefined` |
| [412](packages/devextreme/js/viz/sankey.d.ts#L412) | concrete+undefined | `@default 1` is concrete, but the type includes `\| undefined` |
| [504](packages/devextreme/js/viz/sankey.d.ts#L504) | null-missing | `@default null` is set, but the type has no `null` |
| [513](packages/devextreme/js/viz/sankey.d.ts#L513) | null-missing | `@default null` is set, but the type has no `null` |
| [523](packages/devextreme/js/viz/sankey.d.ts#L523) | null-missing | `@default null` is set, but the type has no `null` |
| [532](packages/devextreme/js/viz/sankey.d.ts#L532) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/viz/sparklines/base_sparkline.d.ts`](packages/devextreme/js/viz/sparklines/base_sparkline.d.ts) — 2

| Line | Kind | Detail |
|------|------|--------|
| [47](packages/devextreme/js/viz/sparklines/base_sparkline.d.ts#L47) | null-missing | `@default null` is set, but the type has no `null` |
| [55](packages/devextreme/js/viz/sparklines/base_sparkline.d.ts#L55) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/viz/tree_map.d.ts`](packages/devextreme/js/viz/tree_map.d.ts) — 13

| Line | Kind | Detail |
|------|------|--------|
| [231](packages/devextreme/js/viz/tree_map.d.ts#L231) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [258](packages/devextreme/js/viz/tree_map.d.ts#L258) | concrete+undefined | `@default "#d3d3d3"` is concrete, but the type includes `\| undefined` |
| [263](packages/devextreme/js/viz/tree_map.d.ts#L263) | concrete+undefined | `@default 1` is concrete, but the type includes `\| undefined` |
| [343](packages/devextreme/js/viz/tree_map.d.ts#L343) | concrete+undefined | `@default "#232323"` is concrete, but the type includes `\| undefined` |
| [416](packages/devextreme/js/viz/tree_map.d.ts#L416) | null-missing | `@default null` is set, but the type has no `null` |
| [425](packages/devextreme/js/viz/tree_map.d.ts#L425) | null-missing | `@default null` is set, but the type has no `null` |
| [434](packages/devextreme/js/viz/tree_map.d.ts#L434) | null-missing | `@default null` is set, but the type has no `null` |
| [443](packages/devextreme/js/viz/tree_map.d.ts#L443) | null-missing | `@default null` is set, but the type has no `null` |
| [452](packages/devextreme/js/viz/tree_map.d.ts#L452) | null-missing | `@default null` is set, but the type has no `null` |
| [461](packages/devextreme/js/viz/tree_map.d.ts#L461) | null-missing | `@default null` is set, but the type has no `null` |
| [487](packages/devextreme/js/viz/tree_map.d.ts#L487) | concrete+undefined | `@default "#000000"` is concrete, but the type includes `\| undefined` |
| [492](packages/devextreme/js/viz/tree_map.d.ts#L492) | concrete+undefined | `@default 1` is concrete, but the type includes `\| undefined` |
| [562](packages/devextreme/js/viz/tree_map.d.ts#L562) | concrete+undefined | `@default "#232323"` is concrete, but the type includes `\| undefined` |

### [`js/viz/vector_map.d.ts`](packages/devextreme/js/viz/vector_map.d.ts) — 11

| Line | Kind | Detail |
|------|------|--------|
| [363](packages/devextreme/js/viz/vector_map.d.ts#L363) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [428](packages/devextreme/js/viz/vector_map.d.ts#L428) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [453](packages/devextreme/js/viz/vector_map.d.ts#L453) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [582](packages/devextreme/js/viz/vector_map.d.ts#L582) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [618](packages/devextreme/js/viz/vector_map.d.ts#L618) | null-missing | `@default null` is set, but the type has no `null` |
| [628](packages/devextreme/js/viz/vector_map.d.ts#L628) | null-missing | `@default null` is set, but the type has no `null` |
| [637](packages/devextreme/js/viz/vector_map.d.ts#L637) | null-missing | `@default null` is set, but the type has no `null` |
| [646](packages/devextreme/js/viz/vector_map.d.ts#L646) | null-missing | `@default null` is set, but the type has no `null` |
| [655](packages/devextreme/js/viz/vector_map.d.ts#L655) | null-missing | `@default null` is set, but the type has no `null` |
| [664](packages/devextreme/js/viz/vector_map.d.ts#L664) | null-missing | `@default null` is set, but the type has no `null` |
| [757](packages/devextreme/js/viz/vector_map.d.ts#L757) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |

---

# Grids Squad  
_88 warnings · 7 files_

### [`js/common/grids.d.ts`](packages/devextreme/js/common/grids.d.ts) — 28

| Line | Kind | Detail |
|------|------|--------|
| [607](packages/devextreme/js/common/grids.d.ts#L607) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [627](packages/devextreme/js/common/grids.d.ts#L627) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [1268](packages/devextreme/js/common/grids.d.ts#L1268) | null-missing | `@default null` is set, but the type has no `null` |
| [1275](packages/devextreme/js/common/grids.d.ts#L1275) | null-missing | `@default null` is set, but the type has no `null` |
| [2338](packages/devextreme/js/common/grids.d.ts#L2338) | null-missing | `@default null` is set, but the type has no `null` |
| [2403](packages/devextreme/js/common/grids.d.ts#L2403) | null-missing | `@default null` is set, but the type has no `null` |
| [2413](packages/devextreme/js/common/grids.d.ts#L2413) | null-missing | `@default null` is set, but the type has no `null` |
| [2422](packages/devextreme/js/common/grids.d.ts#L2422) | null-missing | `@default null` is set, but the type has no `null` |
| [2432](packages/devextreme/js/common/grids.d.ts#L2432) | null-missing | `@default null` is set, but the type has no `null` |
| [2442](packages/devextreme/js/common/grids.d.ts#L2442) | null-missing | `@default null` is set, but the type has no `null` |
| [2453](packages/devextreme/js/common/grids.d.ts#L2453) | null-missing | `@default null` is set, but the type has no `null` |
| [2463](packages/devextreme/js/common/grids.d.ts#L2463) | null-missing | `@default null` is set, but the type has no `null` |
| [2473](packages/devextreme/js/common/grids.d.ts#L2473) | null-missing | `@default null` is set, but the type has no `null` |
| [2483](packages/devextreme/js/common/grids.d.ts#L2483) | null-missing | `@default null` is set, but the type has no `null` |
| [2493](packages/devextreme/js/common/grids.d.ts#L2493) | null-missing | `@default null` is set, but the type has no `null` |
| [2503](packages/devextreme/js/common/grids.d.ts#L2503) | null-missing | `@default null` is set, but the type has no `null` |
| [2514](packages/devextreme/js/common/grids.d.ts#L2514) | null-missing | `@default null` is set, but the type has no `null` |
| [2525](packages/devextreme/js/common/grids.d.ts#L2525) | null-missing | `@default null` is set, but the type has no `null` |
| [2536](packages/devextreme/js/common/grids.d.ts#L2536) | null-missing | `@default null` is set, but the type has no `null` |
| [2548](packages/devextreme/js/common/grids.d.ts#L2548) | null-missing | `@default null` is set, but the type has no `null` |
| [2559](packages/devextreme/js/common/grids.d.ts#L2559) | null-missing | `@default null` is set, but the type has no `null` |
| [2572](packages/devextreme/js/common/grids.d.ts#L2572) | null-missing | `@default null` is set, but the type has no `null` |
| [2586](packages/devextreme/js/common/grids.d.ts#L2586) | null-missing | `@default null` is set, but the type has no `null` |
| [2596](packages/devextreme/js/common/grids.d.ts#L2596) | null-missing | `@default null` is set, but the type has no `null` |
| [2607](packages/devextreme/js/common/grids.d.ts#L2607) | null-missing | `@default null` is set, but the type has no `null` |
| [2620](packages/devextreme/js/common/grids.d.ts#L2620) | null-missing | `@default null` is set, but the type has no `null` |
| [2630](packages/devextreme/js/common/grids.d.ts#L2630) | null-missing | `@default null` is set, but the type has no `null` |
| [3566](packages/devextreme/js/common/grids.d.ts#L3566) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/card_view.d.ts`](packages/devextreme/js/ui/card_view.d.ts) — 10

| Line | Kind | Detail |
|------|------|--------|
| [543](packages/devextreme/js/ui/card_view.d.ts#L543) | null-missing | `@default null` is set, but the type has no `null` |
| [549](packages/devextreme/js/ui/card_view.d.ts#L549) | null-missing | `@default null` is set, but the type has no `null` |
| [555](packages/devextreme/js/ui/card_view.d.ts#L555) | null-missing | `@default null` is set, but the type has no `null` |
| [561](packages/devextreme/js/ui/card_view.d.ts#L561) | null-missing | `@default null` is set, but the type has no `null` |
| [567](packages/devextreme/js/ui/card_view.d.ts#L567) | null-missing | `@default null` is set, but the type has no `null` |
| [573](packages/devextreme/js/ui/card_view.d.ts#L573) | null-missing | `@default null` is set, but the type has no `null` |
| [1320](packages/devextreme/js/ui/card_view.d.ts#L1320) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [1331](packages/devextreme/js/ui/card_view.d.ts#L1331) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [1346](packages/devextreme/js/ui/card_view.d.ts#L1346) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [1595](packages/devextreme/js/ui/card_view.d.ts#L1595) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/data_grid.d.ts`](packages/devextreme/js/ui/data_grid.d.ts) — 17

| Line | Kind | Detail |
|------|------|--------|
| [1247](packages/devextreme/js/ui/data_grid.d.ts#L1247) | null-missing | `@default null` is set, but the type has no `null` |
| [1255](packages/devextreme/js/ui/data_grid.d.ts#L1255) | null-missing | `@default null` is set, but the type has no `null` |
| [1263](packages/devextreme/js/ui/data_grid.d.ts#L1263) | null-missing | `@default null` is set, but the type has no `null` |
| [1271](packages/devextreme/js/ui/data_grid.d.ts#L1271) | null-missing | `@default null` is set, but the type has no `null` |
| [1279](packages/devextreme/js/ui/data_grid.d.ts#L1279) | null-missing | `@default null` is set, but the type has no `null` |
| [1287](packages/devextreme/js/ui/data_grid.d.ts#L1287) | null-missing | `@default null` is set, but the type has no `null` |
| [1295](packages/devextreme/js/ui/data_grid.d.ts#L1295) | null-missing | `@default null` is set, but the type has no `null` |
| [1303](packages/devextreme/js/ui/data_grid.d.ts#L1303) | null-missing | `@default null` is set, but the type has no `null` |
| [1311](packages/devextreme/js/ui/data_grid.d.ts#L1311) | null-missing | `@default null` is set, but the type has no `null` |
| [1319](packages/devextreme/js/ui/data_grid.d.ts#L1319) | null-missing | `@default null` is set, but the type has no `null` |
| [1327](packages/devextreme/js/ui/data_grid.d.ts#L1327) | null-missing | `@default null` is set, but the type has no `null` |
| [1335](packages/devextreme/js/ui/data_grid.d.ts#L1335) | null-missing | `@default null` is set, but the type has no `null` |
| [1343](packages/devextreme/js/ui/data_grid.d.ts#L1343) | null-missing | `@default null` is set, but the type has no `null` |
| [1351](packages/devextreme/js/ui/data_grid.d.ts#L1351) | null-missing | `@default null` is set, but the type has no `null` |
| [1359](packages/devextreme/js/ui/data_grid.d.ts#L1359) | null-missing | `@default null` is set, but the type has no `null` |
| [1367](packages/devextreme/js/ui/data_grid.d.ts#L1367) | null-missing | `@default null` is set, but the type has no `null` |
| [1473](packages/devextreme/js/ui/data_grid.d.ts#L1473) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/draggable.d.ts`](packages/devextreme/js/ui/draggable.d.ts) — 3

| Line | Kind | Detail |
|------|------|--------|
| [227](packages/devextreme/js/ui/draggable.d.ts#L227) | null-missing | `@default null` is set, but the type has no `null` |
| [235](packages/devextreme/js/ui/draggable.d.ts#L235) | null-missing | `@default null` is set, but the type has no `null` |
| [243](packages/devextreme/js/ui/draggable.d.ts#L243) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/filter_builder.d.ts`](packages/devextreme/js/ui/filter_builder.d.ts) — 6

| Line | Kind | Detail |
|------|------|--------|
| [314](packages/devextreme/js/ui/filter_builder.d.ts#L314) | null-missing | `@default null` is set, but the type has no `null` |
| [322](packages/devextreme/js/ui/filter_builder.d.ts#L322) | null-missing | `@default null` is set, but the type has no `null` |
| [330](packages/devextreme/js/ui/filter_builder.d.ts#L330) | null-missing | `@default null` is set, but the type has no `null` |
| [338](packages/devextreme/js/ui/filter_builder.d.ts#L338) | null-missing | `@default null` is set, but the type has no `null` |
| [509](packages/devextreme/js/ui/filter_builder.d.ts#L509) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [521](packages/devextreme/js/ui/filter_builder.d.ts#L521) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |

### [`js/ui/sortable.d.ts`](packages/devextreme/js/ui/sortable.d.ts) — 7

| Line | Kind | Detail |
|------|------|--------|
| [317](packages/devextreme/js/ui/sortable.d.ts#L317) | null-missing | `@default null` is set, but the type has no `null` |
| [325](packages/devextreme/js/ui/sortable.d.ts#L325) | null-missing | `@default null` is set, but the type has no `null` |
| [333](packages/devextreme/js/ui/sortable.d.ts#L333) | null-missing | `@default null` is set, but the type has no `null` |
| [341](packages/devextreme/js/ui/sortable.d.ts#L341) | null-missing | `@default null` is set, but the type has no `null` |
| [349](packages/devextreme/js/ui/sortable.d.ts#L349) | null-missing | `@default null` is set, but the type has no `null` |
| [357](packages/devextreme/js/ui/sortable.d.ts#L357) | null-missing | `@default null` is set, but the type has no `null` |
| [365](packages/devextreme/js/ui/sortable.d.ts#L365) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/tree_list.d.ts`](packages/devextreme/js/ui/tree_list.d.ts) — 17

| Line | Kind | Detail |
|------|------|--------|
| [1004](packages/devextreme/js/ui/tree_list.d.ts#L1004) | null-missing | `@default null` is set, but the type has no `null` |
| [1012](packages/devextreme/js/ui/tree_list.d.ts#L1012) | null-missing | `@default null` is set, but the type has no `null` |
| [1020](packages/devextreme/js/ui/tree_list.d.ts#L1020) | null-missing | `@default null` is set, but the type has no `null` |
| [1028](packages/devextreme/js/ui/tree_list.d.ts#L1028) | null-missing | `@default null` is set, but the type has no `null` |
| [1036](packages/devextreme/js/ui/tree_list.d.ts#L1036) | null-missing | `@default null` is set, but the type has no `null` |
| [1044](packages/devextreme/js/ui/tree_list.d.ts#L1044) | null-missing | `@default null` is set, but the type has no `null` |
| [1052](packages/devextreme/js/ui/tree_list.d.ts#L1052) | null-missing | `@default null` is set, but the type has no `null` |
| [1060](packages/devextreme/js/ui/tree_list.d.ts#L1060) | null-missing | `@default null` is set, but the type has no `null` |
| [1068](packages/devextreme/js/ui/tree_list.d.ts#L1068) | null-missing | `@default null` is set, but the type has no `null` |
| [1076](packages/devextreme/js/ui/tree_list.d.ts#L1076) | null-missing | `@default null` is set, but the type has no `null` |
| [1084](packages/devextreme/js/ui/tree_list.d.ts#L1084) | null-missing | `@default null` is set, but the type has no `null` |
| [1092](packages/devextreme/js/ui/tree_list.d.ts#L1092) | null-missing | `@default null` is set, but the type has no `null` |
| [1100](packages/devextreme/js/ui/tree_list.d.ts#L1100) | null-missing | `@default null` is set, but the type has no `null` |
| [1108](packages/devextreme/js/ui/tree_list.d.ts#L1108) | null-missing | `@default null` is set, but the type has no `null` |
| [1116](packages/devextreme/js/ui/tree_list.d.ts#L1116) | null-missing | `@default null` is set, but the type has no `null` |
| [1124](packages/devextreme/js/ui/tree_list.d.ts#L1124) | null-missing | `@default null` is set, but the type has no `null` |
| [1191](packages/devextreme/js/ui/tree_list.d.ts#L1191) | null-missing | `@default null` is set, but the type has no `null` |

---

# Scheduler Squad  
_52 warnings · 4 files_

### [`js/ui/pivot_grid_field_chooser.d.ts`](packages/devextreme/js/ui/pivot_grid_field_chooser.d.ts) — 2

| Line | Kind | Detail |
|------|------|--------|
| [201](packages/devextreme/js/ui/pivot_grid_field_chooser.d.ts#L201) | null-missing | `@default null` is set, but the type has no `null` |
| [213](packages/devextreme/js/ui/pivot_grid_field_chooser.d.ts#L213) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/pivot_grid.d.ts`](packages/devextreme/js/ui/pivot_grid.d.ts) — 5

| Line | Kind | Detail |
|------|------|--------|
| [523](packages/devextreme/js/ui/pivot_grid.d.ts#L523) | null-missing | `@default null` is set, but the type has no `null` |
| [531](packages/devextreme/js/ui/pivot_grid.d.ts#L531) | null-missing | `@default null` is set, but the type has no `null` |
| [539](packages/devextreme/js/ui/pivot_grid.d.ts#L539) | null-missing | `@default null` is set, but the type has no `null` |
| [547](packages/devextreme/js/ui/pivot_grid.d.ts#L547) | null-missing | `@default null` is set, but the type has no `null` |
| [636](packages/devextreme/js/ui/pivot_grid.d.ts#L636) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/pivot_grid/data_source.d.ts`](packages/devextreme/js/ui/pivot_grid/data_source.d.ts) — 23

| Line | Kind | Detail |
|------|------|--------|
| [176](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L176) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [299](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L299) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [310](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L310) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [316](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L316) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [327](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L327) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [333](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L333) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [339](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L339) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [357](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L357) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [369](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L369) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [375](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L375) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [381](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L381) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [405](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L405) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [411](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L411) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [417](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L417) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [424](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L424) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [442](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L442) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [448](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L448) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [454](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L454) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [460](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L460) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [472](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L472) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [478](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L478) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [496](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L496) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [502](packages/devextreme/js/ui/pivot_grid/data_source.d.ts#L502) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |

### [`js/ui/scheduler.d.ts`](packages/devextreme/js/ui/scheduler.d.ts) — 22

| Line | Kind | Detail |
|------|------|--------|
| [600](packages/devextreme/js/ui/scheduler.d.ts#L600) | null-missing | `@default null` is set, but the type has no `null` |
| [614](packages/devextreme/js/ui/scheduler.d.ts#L614) | null-missing | `@default null` is set, but the type has no `null` |
| [762](packages/devextreme/js/ui/scheduler.d.ts#L762) | null-missing | `@default null` is set, but the type has no `null` |
| [770](packages/devextreme/js/ui/scheduler.d.ts#L770) | null-missing | `@default null` is set, but the type has no `null` |
| [779](packages/devextreme/js/ui/scheduler.d.ts#L779) | null-missing | `@default null` is set, but the type has no `null` |
| [788](packages/devextreme/js/ui/scheduler.d.ts#L788) | null-missing | `@default null` is set, but the type has no `null` |
| [797](packages/devextreme/js/ui/scheduler.d.ts#L797) | null-missing | `@default null` is set, but the type has no `null` |
| [805](packages/devextreme/js/ui/scheduler.d.ts#L805) | null-missing | `@default null` is set, but the type has no `null` |
| [814](packages/devextreme/js/ui/scheduler.d.ts#L814) | null-missing | `@default null` is set, but the type has no `null` |
| [822](packages/devextreme/js/ui/scheduler.d.ts#L822) | null-missing | `@default null` is set, but the type has no `null` |
| [830](packages/devextreme/js/ui/scheduler.d.ts#L830) | null-missing | `@default null` is set, but the type has no `null` |
| [838](packages/devextreme/js/ui/scheduler.d.ts#L838) | null-missing | `@default null` is set, but the type has no `null` |
| [846](packages/devextreme/js/ui/scheduler.d.ts#L846) | null-missing | `@default null` is set, but the type has no `null` |
| [854](packages/devextreme/js/ui/scheduler.d.ts#L854) | null-missing | `@default null` is set, but the type has no `null` |
| [863](packages/devextreme/js/ui/scheduler.d.ts#L863) | null-missing | `@default null` is set, but the type has no `null` |
| [880](packages/devextreme/js/ui/scheduler.d.ts#L880) | null-missing | `@default null` is set, but the type has no `null` |
| [911](packages/devextreme/js/ui/scheduler.d.ts#L911) | null-missing | `@default null` is set, but the type has no `null` |
| [1026](packages/devextreme/js/ui/scheduler.d.ts#L1026) | null-missing | `@default null` is set, but the type has no `null` |
| [1100](packages/devextreme/js/ui/scheduler.d.ts#L1100) | null-missing | `@default null` is set, but the type has no `null` |
| [1106](packages/devextreme/js/ui/scheduler.d.ts#L1106) | null-missing | `@default null` is set, but the type has no `null` |
| [1156](packages/devextreme/js/ui/scheduler.d.ts#L1156) | null-missing | `@default null` is set, but the type has no `null` |
| [1172](packages/devextreme/js/ui/scheduler.d.ts#L1172) | null-missing | `@default null` is set, but the type has no `null` |

---

# ASP Tribe  
_72 warnings · 3 files_

### [`js/ui/diagram.d.ts`](packages/devextreme/js/ui/diagram.d.ts) — 14

| Line | Kind | Detail |
|------|------|--------|
| [256](packages/devextreme/js/ui/diagram.d.ts#L256) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [601](packages/devextreme/js/ui/diagram.d.ts#L601) | null-missing | `@default null` is set, but the type has no `null` |
| [721](packages/devextreme/js/ui/diagram.d.ts#L721) | null-missing | `@default null` is set, but the type has no `null` |
| [846](packages/devextreme/js/ui/diagram.d.ts#L846) | null-missing | `@default null` is set, but the type has no `null` |
| [854](packages/devextreme/js/ui/diagram.d.ts#L854) | null-missing | `@default null` is set, but the type has no `null` |
| [862](packages/devextreme/js/ui/diagram.d.ts#L862) | null-missing | `@default null` is set, but the type has no `null` |
| [870](packages/devextreme/js/ui/diagram.d.ts#L870) | null-missing | `@default null` is set, but the type has no `null` |
| [878](packages/devextreme/js/ui/diagram.d.ts#L878) | null-missing | `@default null` is set, but the type has no `null` |
| [934](packages/devextreme/js/ui/diagram.d.ts#L934) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [1004](packages/devextreme/js/ui/diagram.d.ts#L1004) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [1021](packages/devextreme/js/ui/diagram.d.ts#L1021) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [1038](packages/devextreme/js/ui/diagram.d.ts#L1038) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [1055](packages/devextreme/js/ui/diagram.d.ts#L1055) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [1120](packages/devextreme/js/ui/diagram.d.ts#L1120) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |

### [`js/ui/file_manager.d.ts`](packages/devextreme/js/ui/file_manager.d.ts) — 23

| Line | Kind | Detail |
|------|------|--------|
| [459](packages/devextreme/js/ui/file_manager.d.ts#L459) | null-missing | `@default null` is set, but the type has no `null` |
| [465](packages/devextreme/js/ui/file_manager.d.ts#L465) | null-missing | `@default null` is set, but the type has no `null` |
| [515](packages/devextreme/js/ui/file_manager.d.ts#L515) | null-missing | `@default null` is set, but the type has no `null` |
| [523](packages/devextreme/js/ui/file_manager.d.ts#L523) | null-missing | `@default null` is set, but the type has no `null` |
| [531](packages/devextreme/js/ui/file_manager.d.ts#L531) | null-missing | `@default null` is set, but the type has no `null` |
| [539](packages/devextreme/js/ui/file_manager.d.ts#L539) | null-missing | `@default null` is set, but the type has no `null` |
| [547](packages/devextreme/js/ui/file_manager.d.ts#L547) | null-missing | `@default null` is set, but the type has no `null` |
| [562](packages/devextreme/js/ui/file_manager.d.ts#L562) | null-missing | `@default null` is set, but the type has no `null` |
| [570](packages/devextreme/js/ui/file_manager.d.ts#L570) | null-missing | `@default null` is set, but the type has no `null` |
| [578](packages/devextreme/js/ui/file_manager.d.ts#L578) | null-missing | `@default null` is set, but the type has no `null` |
| [586](packages/devextreme/js/ui/file_manager.d.ts#L586) | null-missing | `@default null` is set, but the type has no `null` |
| [594](packages/devextreme/js/ui/file_manager.d.ts#L594) | null-missing | `@default null` is set, but the type has no `null` |
| [602](packages/devextreme/js/ui/file_manager.d.ts#L602) | null-missing | `@default null` is set, but the type has no `null` |
| [610](packages/devextreme/js/ui/file_manager.d.ts#L610) | null-missing | `@default null` is set, but the type has no `null` |
| [618](packages/devextreme/js/ui/file_manager.d.ts#L618) | null-missing | `@default null` is set, but the type has no `null` |
| [626](packages/devextreme/js/ui/file_manager.d.ts#L626) | null-missing | `@default null` is set, but the type has no `null` |
| [634](packages/devextreme/js/ui/file_manager.d.ts#L634) | null-missing | `@default null` is set, but the type has no `null` |
| [642](packages/devextreme/js/ui/file_manager.d.ts#L642) | null-missing | `@default null` is set, but the type has no `null` |
| [650](packages/devextreme/js/ui/file_manager.d.ts#L650) | null-missing | `@default null` is set, but the type has no `null` |
| [658](packages/devextreme/js/ui/file_manager.d.ts#L658) | null-missing | `@default null` is set, but the type has no `null` |
| [666](packages/devextreme/js/ui/file_manager.d.ts#L666) | null-missing | `@default null` is set, but the type has no `null` |
| [674](packages/devextreme/js/ui/file_manager.d.ts#L674) | null-missing | `@default null` is set, but the type has no `null` |
| [739](packages/devextreme/js/ui/file_manager.d.ts#L739) | null-missing | `@default null` is set, but the type has no `null` |

### [`js/ui/gantt.d.ts`](packages/devextreme/js/ui/gantt.d.ts) — 35

| Line | Kind | Detail |
|------|------|--------|
| [525](packages/devextreme/js/ui/gantt.d.ts#L525) | null-missing | `@default null` is set, but the type has no `null` |
| [652](packages/devextreme/js/ui/gantt.d.ts#L652) | null-missing | `@default null` is set, but the type has no `null` |
| [660](packages/devextreme/js/ui/gantt.d.ts#L660) | null-missing | `@default null` is set, but the type has no `null` |
| [668](packages/devextreme/js/ui/gantt.d.ts#L668) | null-missing | `@default null` is set, but the type has no `null` |
| [676](packages/devextreme/js/ui/gantt.d.ts#L676) | null-missing | `@default null` is set, but the type has no `null` |
| [684](packages/devextreme/js/ui/gantt.d.ts#L684) | null-missing | `@default null` is set, but the type has no `null` |
| [692](packages/devextreme/js/ui/gantt.d.ts#L692) | null-missing | `@default null` is set, but the type has no `null` |
| [700](packages/devextreme/js/ui/gantt.d.ts#L700) | null-missing | `@default null` is set, but the type has no `null` |
| [708](packages/devextreme/js/ui/gantt.d.ts#L708) | null-missing | `@default null` is set, but the type has no `null` |
| [716](packages/devextreme/js/ui/gantt.d.ts#L716) | null-missing | `@default null` is set, but the type has no `null` |
| [724](packages/devextreme/js/ui/gantt.d.ts#L724) | null-missing | `@default null` is set, but the type has no `null` |
| [732](packages/devextreme/js/ui/gantt.d.ts#L732) | null-missing | `@default null` is set, but the type has no `null` |
| [740](packages/devextreme/js/ui/gantt.d.ts#L740) | null-missing | `@default null` is set, but the type has no `null` |
| [748](packages/devextreme/js/ui/gantt.d.ts#L748) | null-missing | `@default null` is set, but the type has no `null` |
| [756](packages/devextreme/js/ui/gantt.d.ts#L756) | null-missing | `@default null` is set, but the type has no `null` |
| [764](packages/devextreme/js/ui/gantt.d.ts#L764) | null-missing | `@default null` is set, but the type has no `null` |
| [772](packages/devextreme/js/ui/gantt.d.ts#L772) | null-missing | `@default null` is set, but the type has no `null` |
| [780](packages/devextreme/js/ui/gantt.d.ts#L780) | null-missing | `@default null` is set, but the type has no `null` |
| [788](packages/devextreme/js/ui/gantt.d.ts#L788) | null-missing | `@default null` is set, but the type has no `null` |
| [796](packages/devextreme/js/ui/gantt.d.ts#L796) | null-missing | `@default null` is set, but the type has no `null` |
| [804](packages/devextreme/js/ui/gantt.d.ts#L804) | null-missing | `@default null` is set, but the type has no `null` |
| [812](packages/devextreme/js/ui/gantt.d.ts#L812) | null-missing | `@default null` is set, but the type has no `null` |
| [820](packages/devextreme/js/ui/gantt.d.ts#L820) | null-missing | `@default null` is set, but the type has no `null` |
| [828](packages/devextreme/js/ui/gantt.d.ts#L828) | null-missing | `@default null` is set, but the type has no `null` |
| [836](packages/devextreme/js/ui/gantt.d.ts#L836) | null-missing | `@default null` is set, but the type has no `null` |
| [844](packages/devextreme/js/ui/gantt.d.ts#L844) | null-missing | `@default null` is set, but the type has no `null` |
| [852](packages/devextreme/js/ui/gantt.d.ts#L852) | null-missing | `@default null` is set, but the type has no `null` |
| [860](packages/devextreme/js/ui/gantt.d.ts#L860) | null-missing | `@default null` is set, but the type has no `null` |
| [867](packages/devextreme/js/ui/gantt.d.ts#L867) | null-missing | `@default null` is set, but the type has no `null` |
| [895](packages/devextreme/js/ui/gantt.d.ts#L895) | null-missing | `@default null` is set, but the type has no `null` |
| [987](packages/devextreme/js/ui/gantt.d.ts#L987) | null-missing | `@default null` is set, but the type has no `null` |
| [1035](packages/devextreme/js/ui/gantt.d.ts#L1035) | null-missing | `@default null` is set, but the type has no `null` |
| [1046](packages/devextreme/js/ui/gantt.d.ts#L1046) | undefined-missing | `@default undefined` is set, but the type has no `\| undefined` |
| [1091](packages/devextreme/js/ui/gantt.d.ts#L1091) | null-missing | `@default null` is set, but the type has no `null` |
| [1097](packages/devextreme/js/ui/gantt.d.ts#L1097) | null-missing | `@default null` is set, but the type has no `null` |

---

## Notes on shared / base files

A few files are foundational bases or cross-squad mixins; assignment follows the dominant owner:

- `js/ui/widget/ui.widget.d.ts`, `js/core/component.d.ts`, `js/core/dom_component.d.ts` — base widget/component infrastructure → **Platforms Squad** (Core).
- `js/common.d.ts`, `js/common/data.d.ts` — core/common & data types → **Platforms Squad** (Core / Data).
- `js/common/charts.d.ts`, `js/viz/common.d.ts`, `js/viz/core/base_widget.d.ts` — shared chart/viz types → **Editors & Navigation Squad** (Charts).
- `js/common/grids.d.ts` — shared grid types → **Grids Squad**.
- `js/ui/widget/ui.search_box_mixin.d.ts` — search-box mixin used by both collection widgets (List/TreeView) and dropdown editors → **Editors & Navigation Squad**.
- `js/ui/collection/ui.collection_widget.base.d.ts` — collection base → **Editors & Navigation Squad** (Collections).
- `js/ui/editor/editor.d.ts`, `js/ui/editor/ui.data_expression.d.ts`, `js/ui/text_box/ui.text_editor.base.d.ts` — editor bases → **Editors & Navigation Squad**.

_Editors and Navigation are now a single squad; their components are merged below._
