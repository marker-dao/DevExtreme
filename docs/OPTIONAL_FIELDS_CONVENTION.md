# Конвенция: типизация optional-полей в публичном `.d.ts`

> - Обоснование, runtime-пруфы и замеры → [UNDEFINED_NULL_CONVENTION.md](UNDEFINED_NULL_CONVENTION.md).
> - **Следующий шаг** этот раздел переезжает в
>   [.github/instructions/API_conventions.instructions.md](../.github/instructions/API_conventions.instructions.md)
>   как нормативная инструкция.

---

## TL;DR (примеры ниже)

Форма optional-поля задаётся **двумя независимыми осями**:

- **Ось `| undefined` (тип).** `| undefined` ставим **только** если поле — это
  **опция**, у которой в `defaultOptions` хранится `undefined`. Всё остальное — голый `?`.
- **Ось `@default` (JSDoc).** `@default <X>` пишем **только когда `X` реально ХРАНИТСЯ**
  как дефолт (`defaultOptions` для опции; дефолтный объект для опции-объекта). Дефолт
  «в точке использования» (`switch (x) { default }`, `const { x = 'after' } = …`,
  `x ?? …`) **не хранится** → `@default` **не ставим**, поведение описываем в
  **текстовом описании** типа/поля.

Обобщенно: в `defaultOptions` «нет значения» равно `undefined` (`null` — только при
смысловом `=== null` в рантайме).

**Новое vs существующее (политика BC).** Конвенция для **нового** кода: новое поле →
всегда `undefined`; `null` используется только с логическим обоснованием, если нам реально
нужно в рантайме строгое сравнение с `null`. Существующее поле **не ломаем**: рантайм-`null`
не мигрируем, тип расширяем под рантайм (см. раздел ниже).

---

## Три категории (примеры ниже)

| Категория | Что это | Тип | `@default` |
|---|---|---|---|
| **A** — скаляр/коллекция-опция | ключ в `defaultOptions` | конкретный дефолт → `T`; дефолт `undefined` → `T \| undefined`; семантич. `null` → `T \| null` | `= хранимый дефолт` |
| **A-obj** — опция-объект | ключ в `defaultOptions`, значение — конфиг (merge) | `T` (без `\| undefined`) | `= хранимый дефолтный объект` |
| **B** — свойство объекта | поле объекта-данных (`Message`) **или** под-свойство config-item (`TextEditorButton`) — **не** опция | `T` (без `\| undefined`) | **нет** (поведение → описание) |

### Как определить категорию

```
Поле — ключ в defaultOptions (опция компонента)?
   ├─ значение — конфиг-объект (*Properties / *Options / inline)?  → A-obj
   └─ скаляр / коллекция / коллбэк                                 → A

Иначе (поле объекта — внутри значения опции):
   • поле данных (Message, User, Alert)            → B
   • под-свойство config-item (TextEditorButton…)  → B
```

---

## A — скаляр/коллекция-опция

| дефолт в `defaultOptions` | тип | `@default` |
|---|---|---|
| конкретное значение (`false` / число / строка / `[]`) | `foo?: T` | `@default <value>` |
| `undefined` («не задано») | `foo?: T \| undefined` | `@default undefined` |
| `null` со смысловым `=== null` | `foo?: T \| null` | `@default null` |

Коллбэки/события — частный случай, когда дефолт `undefined`:
`onFoo?: ((e) => void) | undefined`, `@default undefined`. **Никогда `| null`.**

**Почему дефолт `undefined` ⇒ `| undefined`:** генератор обёрток теряет `?`, поэтому
без `| undefined` в исходнике обёртка не может выразить «не задано», и
`strictTemplates` ломает легальные `[input]="undefined"`, `[input]="obs$ | async"`,
`[input]="signal()"`. См. песочницу в §2 обоснования.

**Как надо / как не надо** (JSDoc-тег `@default` сразу показывает, согласован ли тип):
```ts
// надо — @default undefined, и в типе есть | undefined:
/** @default undefined */
filterValues?: Array<any> | undefined;

// не надо — тот же @default undefined, но | undefined в типе нет:
/** @default undefined */
filterValues?: Array<any>;
```
Как не надо сейчас в коде: [filterValues — common/grids.d.ts:607](../packages/devextreme/js/common/grids.d.ts#L607)

```ts
// надо — @default null, и в типе есть null:
/** @default null */
editRowKey?: TKey | null;

// не надо — @default null, но в типе нет ни null, ни undefined:
/** @default null */
editRowKey?: TKey;
```
Как не надо сейчас в коде: [editRowKey — common/grids.d.ts:1255](../packages/devextreme/js/common/grids.d.ts#L1255)

## A-obj — опция-объект

Значение — частичный конфиг, который рантайм **мёржит** с под-дефолтами. Два вида
(различаются по дефолту в `defaultOptions`; lint их не различает):

| Вид | Примеры | дефолт | тип | `@default` |
|---|---|---|---|---|
| «всегда включено» (merge + пути `option('editing.mode')`) | `editing`, `paging`, `tooltip`, `dropDownOptions`, `sendButtonOptions` | объект / `{}` | `foo?: NestedProperties` | дефолтный объект |
| «опциональная фича, выключена» | `fileUploaderOptions`, `speechToTextOptions` | `undefined` | `foo?: NestedProperties \| undefined` | `undefined` |

**Примеры A-obj-конфигов из кодовой базы** (все «всегда-вкл»: `foo?: NestedProperties` без `| undefined`, `@default` зеркалит объект-дефолт):
- **Гриды** (под-опции, адресуются по пути `option('paging.pageSize')`): `editing`, `paging`,
  `scrolling`, `selection`, `columnChooser`, `filterRow`, `headerFilter`, `pager`, `searchPanel`,
  `stateStoring`, `loadPanel` — [common/grids.d.ts:2621](../packages/devextreme/js/common/grids.d.ts#L2621).
- **Графики (viz):** `tooltip`, `legend`, `argumentAxis`, `valueAxis`, `commonSeriesSettings` —
  [viz/chart.d.ts:1525](../packages/devextreme/js/viz/chart.d.ts#L1525).
- **Редакторы:** `dropDownOptions` (`PopupProperties`), `calendarOptions` (`dxCalendarOptions`) —
  [ui/date_box.d.ts:313](../packages/devextreme/js/ui/date_box.d.ts#L313).
- **Чат:** `sendButtonOptions`.

> **«Опц. фича, выключена» не рекомендуется для нового дизайна.** Здесь на одну опцию
> навешивается **двойная ответственность** — и конфиг фичи, и флаг её включения
> (`undefined` = выключена). Лучше разнести на две опции: флаг + конфиг —
> `speechToTextEnabled: boolean` + `speechToTextOptions: NestedProperties`. Тогда
> `speechToTextOptions` — обычная A-obj без `| undefined`.

**`@default` = хранимый дефолт.** Зеркалим то, что лежит в `defaultOptions`:

| Поле | дефолт | `@default` |
|---|---|---|
| `drop_down_button.dropDownOptions` | `{}` | `@default {}` |
| `autocomplete.dropDownOptions` | `{ showTitle: false }` | `@default { showTitle: false }` |
| `chat.sendButtonOptions` | `{ icon: 'arrowright', action: 'send', onClick: undefined }` | `@default { icon: 'arrowright', action: 'send' }` |

**Как надо / как не надо:**
```ts
// надо — у объект-опции есть @default (зеркалит дефолтный объект):
/** @default {} */
dropDownOptions?: PopupProperties;

// не надо — объект-опция без @default:
popup?: PopupProperties;
```
Надо: [dropDownOptions — ui/drop_down_button.d.ts:167](../packages/devextreme/js/ui/drop_down_button.d.ts#L167).

Как не надо сейчас: [popup — common/grids.d.ts:1273](../packages/devextreme/js/common/grids.d.ts#L1273)

## B — свойство объекта (данные и config-item)

`Message`/`User`/`Alert` и под-свойства `TextEditorButton`/`Column` — **не опции**,
в `defaultOptions` их нет.

| правило | тип | `@default` |
|---|---|---|
| всегда | `foo?: T` (без `\| undefined`) | **нет** — поведение при отсутствии в **описании** |

**Почему голый `?`:** поле не задают в `defaultOptions`, и передавать ему `undefined` не
нужно — значение либо задают, либо опускают (это и значит `?`). Под
`exactOptionalPropertyTypes: true` (настройка строгости в ts-congig) тип `foo?: T` разрешает поле **опустить**, но не
разрешает присвоить ему `undefined` напрямую (`{ foo: undefined }` — ошибка компиляции),
что и соответствует правилу «задают значение или опускают».

**Почему без `@default`:** дефолт здесь — запасное значение в точке использования, оно
нигде не хранится. Поэтому если прочитать опцию через `.option()`, это значение не
вернётся (в хранилище его нет) — значит указывать его в `@default` нельзя: тег утверждал
бы то, чего в рантайме не существует. Поведение при отсутствии описываем **текстом в
описании типа** (его пишет технический писатель):
- `Message.type` → *«If not specified, the message is rendered as a text message.»*
- `TextEditorButton.location` → *«If not specified, the button is placed after the input field.»*

**Как надо / как не надо:**
```ts
// надо — без @default; поведение при отсутствии описано текстом в JSDoc:
/**
 * The message type. If not specified, the message is rendered as a text message.
 */
type?: MessageType;

// не надо — литерал-union без @default и без описания поведения:
deviceType?: 'phone' | 'tablet' | 'desktop';
```
Надо: [type — ui/chat.d.ts:275](../packages/devextreme/js/ui/chat.d.ts#L275) · Как не надо сейчас: [deviceType — common/core/environment.d.ts:17](../packages/devextreme/js/common/core/environment.d.ts#L17)

---

## Новое vs существующее поле — политика BC

Таблицы A/A-obj/B выше нормативны для **нового** кода. К существующему — **без breaking
changes**. Отсюда два режима:

**1. Новое поле — пишем по правилу сразу:**
- в `defaultOptions` дефолт = `undefined` (не `null`);
- тип и `@default` — под `undefined`;
- `null` допустим только с явным обоснованием — когда рантайм реально делает `=== null`.
  Без обоснования ревью отклоняет (смысловой слой, см. «Как это контролируется»).

**2. Существующее поле — приводим к правилу без breaking changes:**
- рантайм **не трогаем**: если там лежит `null`, менять его на `undefined` нельзя — это
  сломает потребителей (`option()` начнёт возвращать `undefined` вместо `null`, а
  `[x]="null"` перестанет компилироваться);
- рассогласование «тип ↔ `@default`» чиним только **расширением типа под рантайм**:

> Правило: `@default null` + рантайм хранит `null` + тип `null` не допускает →
> **добавляем `| null` в тип**. `@default` и рантайм оставляем как есть.

Пример — `dxDropDownButtonOptions.selectedItemKey`:
```ts
// рантайм кладёт null, но публичный тип его не допускал — отсюда подавленная ошибка:
//   _getDefaultOptions: { /* @ts-expect-error public API needs to be fixed */ selectedItemKey: null }

selectedItemKey?: string | number;          // было: @default null, тип без null
selectedItemKey?: string | number | null;   // стало: тип расширили; рантайм НЕ трогаем
```
После расширения типа `@ts-expect-error` над `selectedItemKey: null` уже не нужен.

> Это компромисс ради совместимости, **не образец**. По осям конвенции поле всё равно
> отклоняется от правила для нового кода. **В новом коде так не пишут** — там `undefined`.

---

## Сводка «тип ↔ `@default`»

| тип | допустимый `@default` |
|---|---|
| `T` (опция, конкретный дефолт) | значение дефолта |
| `T \| undefined` (опция, дефолт undefined) | `undefined` |
| `T \| null` | `null` |
| `NestedProperties` (A-obj) | дефолтный объект |
| `T` (категория B) | **тега нет** (поведение → описание) |

---

## Как это контролируется — два слоя

**1. Линтер.** Правило **не нужно держать в голове** — eslint-плагин `devextreme-custom`
проверяет «тип ↔ `@default`» (для `js/**/*.d.ts`, статус `warn` — видно в редакторе и в
`lint-dts`):

- `jsdoc-default-matches-type` — `@default` ↔ тип (R1/R2/R4/R6);
- `literal-union-needs-default-doc` — литерал-union без `@default` (R5, type-aware).

Чтобы число нарушений не росло, есть две защиты:

- **Ратчет** — `pnpm run lint-dts-convention` (запускается в CI). Считает текущее число
  предупреждений наших правил и сравнивает с зафиксированной планкой (baseline). Если число
  **выросло** — шаг падает: в PR добавили новое нарушение, его надо убрать. Когда нарушения
  в PR **починены**, планку опускают тем же PR: `pnpm run lint-dts-convention:update`
  (обратно она уже не поднимется).
- **glob-override** — когда область (например, `chat.d.ts`) вычищена до нуля, её путь
  добавляют в отдельный блок в `eslint.config.mjs`, где правила переключены с `warn` на
  `error`. С этого момента новое нарушение в этой области — сразу ошибка сборки, а не
  предупреждение. Областей под `error` становится больше по мере чистки; в конце весь код
  под `error`, и ратчет можно убрать.

Подробности — §6 обоснования.

**2. Ревью (смысл).** Линтер видит «тип ↔ `@default`», но **не рантайм** и **не может
решить, что правильно для нового поля — `undefined` или `null`** (это смысловой выбор).
Поэтому правило «новое поле → `undefined`; `null` только с обоснованием» закреплено в
`API_conventions.instructions.md` — для ревью GitHub Copilot. То, что линтер структурно
не ловит, ловит ревью.

**Граница линтера на практике:** при правке поля категорию и направление сверяй по
`_getDefaultOptions` (lint туда не смотрит). Для существующего поля — без BC (выше).
