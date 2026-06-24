# Конвенция: типизация optional-полей в публичном `.d.ts`

> **Нормативное правило — «что писать».** Коротко и прескриптивно.
>
> - Обоснование, runtime-пруфы и замеры → [UNDEFINED_NULL_CONVENTION.md](UNDEFINED_NULL_CONVENTION.md).
> - Питч для лидов и Product Managers → [TYPING_CONVENTION_PROPOSAL.md](TYPING_CONVENTION_PROPOSAL.md).
> - **Следующий шаг (не сейчас):** этот раздел переезжает в
>   [.github/instructions/API_conventions.instructions.md](../.github/instructions/API_conventions.instructions.md)
>   как нормативная инструкция.

---

## TL;DR

Форма optional-поля задаётся **двумя независимыми осями**:

- **Ось `| undefined` (тип).** `| undefined` ставим **только** если поле — это
  **опция**, у которой в `defaultOptions` хранится `undefined`. Всё остальное — голый `?`.
- **Ось `@default` (JSDoc).** `@default <X>` пишем **только когда `X` реально ХРАНИТСЯ**
  как дефолт (`defaultOptions` для опции; seed-объект для опции-объекта). Дефолт
  «в точке использования» (`switch (x) { default }`, `const { x = 'after' } = …`,
  `x ?? …`) **не хранится** → `@default` **не ставим**, поведение описываем в
  **текстовом описании** типа/поля.

Сквозное: в `defaultOptions` «нет значения» = `undefined` (`null` — только при
смысловом `=== null` в рантайме).

**Новое vs существующее (политика BC).** Всё выше — для **нового** кода: новое поле →
`undefined`; `null` только с логическим обоснованием. Существующее поле **не ломаем**:
рантайм-`null` не мигрируем, тип расширяем под рантайм (см. раздел ниже).

---

## Три категории

| Категория | Что это | Тип | `@default` |
|---|---|---|---|
| **A** — скаляр/коллекция-опция | ключ в `defaultOptions` | конкр. seed → `T`; seed `undefined` → `T \| undefined`; семантич. `null` → `T \| null` | `= хранимый seed` |
| **A-obj** — опция-объект | ключ в `defaultOptions`, значение — конфиг (merge) | `T` (без `\| undefined`) | `= хранимый seed-объект` |
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

| seed в `defaultOptions` | тип | `@default` |
|---|---|---|
| конкретное значение (`false` / число / строка / `[]`) | `foo?: T` | `@default <value>` |
| `undefined` («не задано») | `foo?: T \| undefined` | `@default undefined` |
| `null` со смысловым `=== null` | `foo?: T \| null` | `@default null` |

Коллбэки/события — частный случай seed `undefined`:
`onFoo?: ((e) => void) | undefined`, `@default undefined`. **Никогда `| null`.**

**Почему seed `undefined` ⇒ `| undefined`:** генератор обёрток теряет `?`, поэтому
без `| undefined` в исходнике обёртка не может выразить «не задано», и
`strictTemplates` ломает легальные `[input]="undefined"`, `[input]="obs$ | async"`,
`[input]="signal()"`. См. песочницу в §2 обоснования.

## A-obj — опция-объект

Значение — частичный конфиг, который рантайм **мёржит** с под-дефолтами. Два вида
(различаются по seed; lint их не различает):

| Вид | Примеры | seed | тип | `@default` |
|---|---|---|---|---|
| «всегда-вкл» (merge + пути `option('editing.mode')`) | `editing`, `dropDownOptions`, `sendButtonOptions` | объект / `{}` | `foo?: NestedProperties` | объект-seed |
| «опц. фича, выключена» | `fileUploaderOptions`, `speechToTextOptions` | `undefined` | `foo?: NestedProperties \| undefined` | `undefined` |

**`@default` = хранимый seed.** Зеркалим то, что лежит в `defaultOptions`, без
«`{}` или дельта»:

| Поле | seed | `@default` |
|---|---|---|
| `drop_down_button.dropDownOptions` | `{}` | `@default {}` |
| `autocomplete.dropDownOptions` | `{ showTitle: false }` | `@default { showTitle: false }` |
| `chat.sendButtonOptions` | `{ icon: 'arrowright', action: 'send', onClick: undefined }` | `@default { icon: 'arrowright', action: 'send' }` |

## B — свойство объекта (данные и config-item)

`Message`/`User`/`Alert` и под-свойства `TextEditorButton`/`Column` — **не опции**,
в `defaultOptions` их нет.

| правило | тип | `@default` |
|---|---|---|
| всегда | `foo?: T` (без `\| undefined`) | **нет** — поведение при отсутствии в **описании** |

**Почему голый `?`:** поле не seed-ят, `undefined` ему передавать не нужно (задаёшь
значение или опускаешь — `?` это и значит); под `exactOptionalPropertyTypes: true`
`foo?: T` корректно запрещает мусорное `foo: undefined`.

**Почему без `@default`:** дефолт — point-of-use fallback, нигде не хранится.
Поведение в описание:
- `Message.type` → *«If not specified, the message is rendered as a text message.»*
- `TextEditorButton.location` → *«If not specified, the button is placed after the input field.»*

---

## Новое vs существующее поле — политика BC

Таблицы A/A-obj/B выше нормативны для **нового** кода. К существующему применяются
**без breaking changes**.

**Новое поле.** `defaultOptions` = `undefined`; тип/`@default` под `undefined`. `null`
(тип или значение) — только с **явным логическим обоснованием** (рантайм реально делает
`=== null`); иначе ревью отклоняет (смысловой слой, см. «Как это контролируется»).

**Существующее поле — без BC.** Рантайм-`null` **не меняем** (иначе `option()` начнёт
отдавать `undefined`, а `[x]="null"` перестанет компилироваться). Рассогласование чиним
**расширением типа под рантайм**:

> `@default null` + рантайм `null` + тип без `null` (существующее поле) →
> **добавляем `| null` в тип**; `@default` и рантайм оставляем.

```ts
// dxDropDownButtonOptions.selectedItemKey — рантайм держит null, тип его не допускал:
//   _getDefaultOptions: { /* @ts-expect-error public API needs to be fixed */ selectedItemKey: null }
selectedItemKey?: string | number;          // было: @default null + @ts-expect-error в рантайме
selectedItemKey?: string | number | null;   // стало: расширили тип; рантайм НЕ трогаем, @ts-expect-error уходит
```

> Это компромисс ради совместимости, **не образец**. По осям конвенции такое поле
> отклоняется от «нового» правила. **В новом коде так не пишем** — там `undefined`.

---

## Сводка «тип ↔ `@default`»

| тип | допустимый `@default` |
|---|---|
| `T` (опция, конкр. seed) | значение seed |
| `T \| undefined` (опция, seed undefined) | `undefined` |
| `T \| null` | `null` |
| `NestedProperties` (A-obj) | seed-объект |
| `T` (категория B) | **тега нет** (поведение → описание) |

---

## Примеры

```ts
// ── A: скаляр/коллекция-опция ───────────────────────────────────────────────
activeStateEnabled?: boolean;              // @default false       (seed false)
accessKey?: string | undefined;            // @default undefined   (seed undefined)
buttons?: Array<DropDownPredefinedButton | TextEditorButton> | undefined;
                                           // @default undefined   (seed void 0)
onMessageEntered?: ((e: ...) => void) | undefined; // @default undefined
value?: boolean | null;                    // @default false; null = indeterminate

// ── A-obj: опция-объект (@default = хранимый seed) ──────────────────────────
dropDownOptions?: PopupProperties;         // @default { showTitle: false }   (autocomplete)
sendButtonOptions?: SendButtonProperties;  // @default { icon: 'arrowright', action: 'send' } (chat)

// ── B: свойство объекта — голый ?, без | undefined, без @default ────────────
export type MessageBase = {
    id?: number | string;                  // нет @default
    type?: MessageType;                    // нет @default; описание: "If not set — rendered as text"
    timestamp?: Date | number | string;
    author?: User;
    isDeleted?: boolean;
    [key: string]: any;
};
```

---

## Как это контролируется — два слоя

**1. Линтер (механика).** Правило **не нужно держать в голове** — eslint-плагин
`devextreme-custom` проверяет «тип ↔ `@default`» (для `js/**/*.d.ts`, статус `warn` —
видно в редакторе и в `lint-dts`):

- `jsdoc-default-matches-type` — `@default` ↔ тип (R1/R2/R4/R6);
- `literal-union-needs-default-doc` — литерал-union без `@default` (R5, type-aware).

Регресс держит ратчет (`pnpm run lint-dts-convention`), чистые области флипаются в
`error` через glob-override. Детали — §6 обоснования.

**2. Ревью (смысл).** Линтер видит «тип ↔ `@default`», но **не рантайм** и **не может
решить, что правильно для нового поля — `undefined` или `null`** (это смысловой выбор).
Поэтому правило «новое поле → `undefined`; `null` только с обоснованием» закреплено в
`API_conventions.instructions.md` — для ревью GitHub Copilot. То, что линтер структурно
не ловит, ловит ревью.

**Граница линтера на практике:** при правке поля категорию и направление сверяй по
`_getDefaultOptions` (lint туда не смотрит). Для существующего поля — без BC (выше).
