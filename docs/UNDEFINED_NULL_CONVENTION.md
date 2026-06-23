# Конвенция: `undefined` / `null` / `| undefined` для optional-полей в `.d.ts` ядра

## TL;DR

Форма optional-поля задаётся **двумя независимыми осями**:

- **Ось «`| undefined`» (тип).** `| undefined` ставим **только** если поле — это
  **опция**, у которой в `defaultOptions` хранится `undefined`. Всё остальное —
  голый `?`.
- **Ось «`@default`» (JSDoc, принцип P2).** `@default <X>` пишем **только когда `X`
  реально ХРАНИТСЯ** как дефолт (`defaultOptions` для опции; seed-объект для
  опции-объекта). Дефолт «в точке использования» (`switch (x) {default}`,
  `const { x = 'after' } = …`, `x ?? …`) **не хранится** → `@default` **не ставим**,
  поведение описываем в **текстовом описании** типа/поля.

Три категории — куда отнести поле:

| Категория | Что это | Тип | `@default` |
|---|---|---|---|
| **A** — скаляр/коллекция-опция | ключ в `defaultOptions` | конкр. seed → `T`; seed `undefined` → `T \| undefined`; семантич. `null` → `T \| null` | `= хранимый seed` |
| **A-obj** — опция-объект | ключ в `defaultOptions`, значение — конфиг (merge) | `T` (без `\| undefined`) | `= хранимый seed-объект` |
| **B** — свойство объекта | поле объекта-данных (`Message`) **или** под-свойство config-item (`TextEditorButton`) — **не** опция | `T` (без `\| undefined`) | **нет** (поведение → описание) |

Сквозное: в `defaultOptions` «нет значения» = `undefined` (`null` — только при
смысловом `=== null`).

---

## 1. Какая проблема сейчас

Конвенции нет — три слоя (тип в `.d.ts`, JSDoc `@default`, рантайм
`defaultOptions`) живут независимо и расходятся.

**Распространённость (замерено):**

| Метрика | Значение | Что показывает |
|---|---|---|
| `field: undefined` в `defaultOptions` | **484** | Современные компоненты (`chat`, `speech_to_text`, `drop_down_button`, `color_view`, `file_uploader`, `calendar`) |
| `field: null` в `defaultOptions` | **528** | Легаси (`m_draggable`, `m_sortable`, `m_validator`, `gallery`) |
| `@default undefined` в `.d.ts` | **751** | JSDoc уже склоняется к `undefined` |
| `@default null` в `.d.ts` | **442** | …но единого правила нет |
| `isDefined(x)` = `x !== null && x !== undefined` | **248** против **22** строгих `=== null` (chat + grid_core) | Код в массе **не различает** null и undefined |
| `@ts-expect-error` в `__internal` | **4201** | Общий симптом дрейфа «тип ↔ реализация» |

**Четыре типичных вида расхождения:**

1. **Тип ↔ рантайм.** `focusedRowKey?: TKey | undefined`
   ([common/grids.d.ts:2345](../packages/devextreme/js/common/grids.d.ts)),
   но рантайм
   ([m_focus.ts](../packages/devextreme/js/__internal/grids/grid_core/focus/m_focus.ts))
   дефолтит `focusedRowKey: null` и сбрасывает через `option('focusedRowKey', null)`.
2. **`@default` ↔ тип.** `editRowKey?: TKey`
   ([common/grids.d.ts:1255](../packages/devextreme/js/common/grids.d.ts))
   с `@default null`, но в типе нет ни `| null`, ни `| undefined`.
3. **`@default` ↔ рантайм.** Тот же `focusedRowKey` — JSDoc `@default undefined`,
   рантайм `null`.
4. **Опция-объект и `@default`.** `dropDownOptions?: PopupProperties`
   ([autocomplete.d.ts:218](../packages/devextreme/js/ui/autocomplete.d.ts))
   и `sendButtonOptions?: SendButtonProperties`
   ([chat.d.ts:504](../packages/devextreme/js/ui/chat.d.ts)) тег
   опускают, `drop_down_button.dropDownOptions` имеет `@default {}` — один паттерн
   оформлен по-разному.

**Сколько этого (измерено детектором §6):** hard-нарушений **630** (R1+R2+R4+R6),
плюс review R3 (1) и R5 (85). Разбивка — §6.

**Прямое следствие для потребителя** (Angular, `strictTemplates`): форма типа в
`.d.ts` определяет, можно ли легально написать `[input]="undefined"`. Расхождение
типа с рантаймом превращается в ложные ошибки компиляции у пользователей (§2).

---

## 2. Песочница (доказательство для команд)

Изолированный компонент + изолированный `tsconfig`.

**Файлы:**
- [undefined-research.component.ts](undefined-research.component.ts) — inline-компонент
  с двумя биндингами: `[accessKey]="undefined"` и `[type]="undefined"`.
- [tsconfig.research.json](tsconfig.research.json) — один файл +
  все strict-флаги Angular.

**Запуск:**

```bash
cd apps/demos
pnpm exec ngc --noEmit --project ../../docs/tsconfig.research.json
```

**Вывод (ровно одна ошибка):**

```
undefined-research.component.ts:38:28 - error TS2322:
  Type 'undefined' is not assignable to type 'MessageType'.
      [type]="undefined"
```

| Биндинг | Тип в `.d.ts` ядра | Сеттер обёртки | strictTemplates |
|---|---|---|---|
| `[accessKey]="undefined"` | `accessKey?: string \| undefined` | `set accessKey(value: string \| undefined)` | **ok** |
| `[type]="undefined"` | `type?: MessageType` | `set type(value: MessageType)` | **TS2322** |

Других различий между биндингами нет → причина расхождения только одна:
наличие `| undefined` в `.d.ts` ядра.

> Изоляция нужна: в общем `tsconfig.ngc-check.json` под `strict: true` ngc спотыкается
> на чужих compile-ошибках в графе и пропускает часть template-проверок. Динамический
> `templateUrl` у `AppComponent` тоже пропускает проверку — потому песочница на
> inline-шаблоне.

---

## 3. Факты из рантайма (на чём стоит конвенция)

Проверено в коде:

1. **Сброса «через undefined» в ядре нет.** `option('foo', undefined)`
   ([m_option_manager.ts](../packages/devextreme/js/__internal/core/options/m_option_manager.ts))
   буквально кладёт `undefined`. Возврат к дефолту — отдельный явный API
   `resetOption(name)` → `_options.reset()` → читает `initial(field)` из
   `_getDefaultOptions`. Парадигмы «передай undefined — код подставит дефолт»
   в библиотеке **не существует**.

2. **Angular-обёртка не использует undefined как сигнал сброса.** Скалярный
   `[input]="undefined"` → `_setOption` → `instance.option({...})` кладёт
   `undefined` (не сброс). Единственное место, где обёртка зовёт `resetOption`, —
   удаление **вложенного конфиг-компонента** из шаблона: был, скажем, `<dxo-paging>`
   под `*ngIf`, условие стало `false`, компонент уничтожился → обёртка сбрасывает
   его опцию к дефолту
   ([component.ts:285 `resetOptions`](../packages/devextreme-angular/src/core/component.ts),
   вызывается из `ngOnChanges` / `setChildren`). Для скалярных `[input]` такого
   пути нет — поэтому `[input]="undefined"` именно «ставит undefined».

3. **Генератор обёрток теряет `?`.** Поле в Angular-классе становится
   обязательным с типом ровно из аннотации `.d.ts`. Поэтому единственный способ
   выразить «не задано» в обёртке (`set accessKey(value: string | undefined)`) —
   явный `| undefined` в исходнике. (TODO: добавить ссылку на баг от Ильи.)

4. **`isDefined` уравнивает null и undefined.** Канон проверок (248 против 22) —
   `isDefined(x)`. Значит миграция `null → undefined` в `defaultOptions`
   семантически нейтральна везде, кроме точек со строгим `=== null`. Кейсы со строгим
   `=== null` нужно разобрать отдельно и скорее всего заменить на `undefined`, если
   это не изменит поведение кода.

5. **Поля объектов данных рантайм не заполняет `undefined`.** Для `Message.type`
   ([messagebubble.ts:120](../packages/devextreme/js/__internal/ui/chat/messagebubble.ts)):
   `switch (type) { case 'image': … case 'text': default: … }` — отсутствие
   `type` уводит в `default` (текст). Поле объекта при этом **не появляется** со
   значением `undefined`; его просто нет, и `'text'` нигде не **хранится**.

6. **Опция-объект мёржится, а не заменяется.** Значение хранится как частичный
   конфиг и сливается с дефолтами под-свойств (`_bindInnerWidgetOptions`,
   `_options.cache(...)`). В `defaultOptions` всегда лежит объект (минимум `{}`),
   `undefined` там не бывает. Seed-ы:
   `drop_down_editor.ts:252` — `dropDownOptions: { showTitle: false }`;
   `drop_down_button.ts:120` — `dropDownOptions: {}`;
   `chat.ts:118` — `sendButtonOptions: { icon: 'arrowright', action: 'send', onClick: undefined }`.

7. **Под-свойства config-item — point-of-use, не хранятся.** `TextEditorButton.location`
   применяется как `const { location = 'after' } = buttonInfo`
   ([texteditor_button_collection/index.ts:167](../packages/devextreme/js/__internal/ui/text_box/texteditor_button_collection/index.ts)).
   Объект кнопки `'after'` не получает; `name` вообще обязателен (рантайм кидает
   `E1054`, если отсутствует, [index.ts:28](../packages/devextreme/js/__internal/ui/text_box/texteditor_button_collection/index.ts)).
   Сама опция `buttons` дефолтится в `void 0` (undefined),
   [drop_down_editor.ts:251](../packages/devextreme/js/__internal/ui/drop_down_editor/drop_down_editor.ts).

---

## 4. Конвенция

### 4.1. Две оси (ядро правила)

**Ось `| undefined`** — отвечает на «**может ли значение поля быть `undefined`**»:

> `| undefined` ⟺ поле — **опция**, чей seed в `defaultOptions` равен `undefined`.
>
> - опция со seed `undefined` (`accessKey`, `buttons`, коллбэки) → `T | undefined`;
> - опция со seed конкретного значения (`activeStateEnabled: false`) → `T`;
> - опция-объект A-obj (seed `{}`/объект) → `T`;
> - **свойство объекта B** (поле данных или под-свойство config-item) → `T`
>   (его не seed-ят; `undefined` — не нужное входное значение, `?` уже покрывает «опустить»);
> - рантайм делает смысловой `=== null` → `T | null` (отдельно от undefined).

**Ось `@default` (P2)** — отвечает на «**какое значение реально хранится по умолчанию**»:

> `@default <X>` ⟺ `X` физически лежит в storage (`defaultOptions` для опции;
> seed-объект для A-obj). Дефолт «в точке использования» (`switch default`,
> деструктуризация, `??`) **не хранится** → `@default` **не ставим**; поведение
> при отсутствии описываем в **текстовом описании** поля.

Эти оси **независимы**: первая — про значение, которое поле может держать; вторая —
про значение, которое реально хранится как дефолт.

### 4.2. Как определить категорию

```
Поле — ключ в defaultOptions (опция компонента)?
   ├─ значение — конфиг-объект (*Properties / *Options / inline)?  → A-obj
   └─ скаляр / коллекция / коллбэк                                 → A

Иначе (поле объекта — внутри значения опции):
   • поле данных (Message, User, Alert)            → B
   • под-свойство config-item (TextEditorButton…)  → B
```

> **Важная поправка** (была ошибка в раннем черновике): под-свойства config-item
> (`TextEditorButton.location/name/options`) — это **категория B**, а не A. По обеим
> осям они ведут себя как поля данных: голый `?`, без `| undefined`, без `@default`
> (point-of-use дефолт → в описание). Их не seed-ят, и `undefined` им передавать не
> нужно — `name`/`options`/`location` ты **задаёшь или опускаешь**.

### 4.3. Категория A — скаляр/коллекция-опция

| seed в `defaultOptions` | тип | `@default` |
|---|---|---|
| конкретное значение (`false` / `true` / число / строка / `[]`) | `foo?: T` | `@default <value>` |
| `undefined` («не задано») | `foo?: T \| undefined` | `@default undefined` |
| `null` со смысловым `=== null` | `foo?: T \| null` | `@default null` |

**Почему seed `undefined` ⇒ `| undefined`:** для опции `undefined` — реальное
хранимое значение домена; плюс генератор обёртки теряет `?`, и без `| undefined`
в обёртке нельзя выразить «не задано» → strictTemplates ломает легальные
`[input]="undefined"`, `[input]="obs$ | async"` (async-pipe до первого значения
`Observable` отдаёт `null`/`undefined`), `[input]="signal()"` (доказано в §2).

Коллбэки/события — частный случай seed `undefined`: `onFoo?: ((e) => void) | undefined`,
`@default undefined`. **Никогда `| null`.**

### 4.4. Категория A-obj — опция-объект

Значение — частичный конфиг, который рантайм **мёржит** с дефолтами под-свойств
(`dropDownOptions?: PopupProperties`, `sendButtonOptions?: SendButtonProperties`,
`editing?: EditingBase<…>`).

**Что считается опцией-объектом** (по форме типа, как видит детектор §6): inline
`{ … }`; ссылка на `*Properties`/`*Options`/`*Base`; `Record<…>`; утилита-обёртка
`Omit`/`Pick`/`Partial`/`Required`/`Readonly` над таким типом (напр.
`Omit<FileUploaderProperties, 'value'>` — это `fileUploaderOptions`/`speechToTextOptions`).
Union с `| null`/`| undefined` — тоже (смотрим на члены без `null`/`undefined`).

**Объектные опции — два вида** (различаются по seed; lint их **не** различает — seed в рантайме):

| Вид | Примеры | seed | тип | `@default` |
|---|---|---|---|---|
| «всегда-вкл» конфиг (merge + вложенные пути `option('editing.mode')`) | `editing`, `dropDownOptions`, `sendButtonOptions` | объект (под-дефолты / `{}`) | `foo?: NestedProperties` | объект-seed |
| «опц. фича, выключена» | `fileUploaderOptions`, `speechToTextOptions` | `undefined` | `foo?: NestedProperties \| undefined` | `undefined` |

«Всегда-вкл» **не может быть `undefined`**: рантайм адресует под-опции по пути
(`option('editing.mode')`, [m_editing.ts:209](../packages/devextreme/js/__internal/grids/grid_core/editing/m_editing.ts))
и мёржит частичные апдейты — нужен базовый объект. «Опц. фича» по умолчанию не
сконфигурирована → `undefined`. (Это правит §3.6: «всегда объект» верно только для merge-вида.)

Таблица ниже — про **«всегда-вкл»** вид:

| Что | Как |
|---|---|
| **тип** | `foo?: NestedProperties` — без `\| undefined`, без `\| null` |
| **`@default`** | **зеркалит seed-объект из `defaultOptions`** (см. ниже) |
| **дефолты под-свойств** | на **членах** `NestedProperties`, каждый со своим `@default` |

**`@default` = хранимый seed (P2).** Никаких «`{}` или дельта» — просто отражаем то,
что лежит в `defaultOptions`:

| Поле | seed в рантайме | `@default` |
|---|---|---|
| `drop_down_button.dropDownOptions` | `{}` | `@default {}` |
| `autocomplete.dropDownOptions` | `{ showTitle: false }` | `@default { showTitle: false }` |
| `chat.sendButtonOptions` | `{ icon: 'arrowright', action: 'send', onClick: undefined }` | `@default { icon: 'arrowright', action: 'send' }` |
| `grids.editing` | seed-объект | `@default { …seed }` (или `{}`, если seed пуст) |

(Так `@default {}` остаётся честным только там, где seed реально `{}`. Для
`sendButtonOptions` пустой `{}` **врал бы** — реальный seed не пуст; зеркалим его.
Дедупликация seed-ов, дублирующих под-дефолты, — отдельный код-клинап, §8.)

### 4.5. Категория B — свойство объекта (данные и config-item)

`Message`/`User`/`Alert` (данные) и под-свойства `TextEditorButton`/`Column`/… (config-item) —
**не опции**, в `defaultOptions` их нет.

| правило | тип | `@default` |
|---|---|---|
| всегда | `foo?: T` (без `\| undefined`) | **нет** — поведение при отсутствии в **описании** |

**Почему голый `?` без `| undefined`:** поле не seed-ят, `undefined` ему передавать не
нужно (задаёшь значение или опускаешь — `?` это и значит); под
`exactOptionalPropertyTypes: true` `foo?: T` корректно запрещает мусорное `foo: undefined`.
Если у потребителя `undefined` пришёл из формы/async — он опускает ключ
(`...(x !== undefined && { foo: x })`) или подставляет своё (`foo: x ?? fallback`).

**Почему без `@default` (P2):** у этих полей дефолт — point-of-use fallback (§3.5, §3.7),
значение нигде не хранится. Поведение пишем в описание:
- `Message.type` → описание: *«If not specified, the message is rendered as a text message.»*
- `TextEditorButton.location` → описание: *«If not specified, the button is placed after the input field.»*
  (соответствует [текущей API-доке](https://js.devexpress.com/jQuery/Documentation/ApiReference/UI_Components/dxAutocomplete/Configuration/buttons/#location)).

### 4.6. Сквозное правило по `defaultOptions`

«Значения нет» в `defaultOptions` пишем **`undefined`**, не `null`. Легаси `null`
мигрируем. `null` остаётся только при смысловом `=== null`. Обоснование: код и так
трактует null≡undefined через `isDefined` (§3.4).

### 4.7. Сводка «тип ↔ `@default`» (что чему соответствует)

| тип | допустимый `@default` |
|---|---|
| `T` (опция, конкр. seed) | значение seed |
| `T \| undefined` (опция, seed undefined) | `undefined` |
| `T \| null` | `null` |
| `NestedProperties` (A-obj) | seed-объект |
| `T` (категория B) | **тега нет** (поведение → описание) |

---

## 5. Примеры

```ts
// ── A: скаляр/коллекция-опция ───────────────────────────────────────────────
activeStateEnabled?: boolean;              // @default false       (seed false)
accessKey?: string | undefined;            // @default undefined   (seed undefined)
buttons?: Array<DropDownPredefinedButton | TextEditorButton> | undefined;
                                           // @default undefined   (seed void 0) ← фикс: было без | undefined
onMessageEntered?: ((e: ...) => void) | undefined; // @default undefined
value?: boolean | null;                    // @default false; null = indeterminate (check_box.tsx: checked === null)

// ── A-obj: опция-объект (@default = хранимый seed) ──────────────────────────
dropDownOptions?: PopupProperties;         // @default {}                                  (drop_down_button)
dropDownOptions?: PopupProperties;         // @default { showTitle: false }                (autocomplete)
sendButtonOptions?: SendButtonProperties;  // @default { icon: 'arrowright', action: 'send' } (chat)

// ── B: свойство объекта — голый ?, без | undefined, без @default ────────────
// MessageBase (данные):
export type MessageBase = {
    id?: number | string;                  // нет дефолта
    type?: MessageType;                    // нет @default; описание: "If not set — rendered as text"
    timestamp?: Date | number | string;
    author?: User;
    isDeleted?: boolean;
    [key: string]: any;
};
// TextEditorButton (config-item):
location?: TextEditorButtonLocation;       // нет @default; описание: "If not set — placed after the input"
name?: string;                             // нет @default (фактически required в рантайме)
options?: ButtonProperties;                // нет @default
```

**Разбор расхождения `focusedRowKey` (как чинить):**

```ts
// Сейчас: focusedRowKey?: TKey | undefined; @default undefined; а рантайм хранит null.
// Должно быть (рантайм seed-ит null и сбрасывает в null → категория A, null-ветка):
/** @default null */
focusedRowKey?: TKey | null;               // + defaultOptions: { focusedRowKey: null } (уже так)
```

---

## 6. Контроль и энфорсмент

Единый источник истины — **eslint-плагин `devextreme-custom`** (Фаза 1 выполнена). Два правила:

- **`jsdoc-default-matches-type`**
  ([eslint_plugins/jsdoc_default_matches_type.js](../packages/devextreme/eslint_plugins/jsdoc_default_matches_type.js)) —
  синтаксическое (TSESTree, per-file, без type info): **R1, R2, R4, R6**.
- **`literal-union-needs-default-doc`**
  ([eslint_plugins/literal_union_needs_default_doc.js](../packages/devextreme/eslint_plugins/literal_union_needs_default_doc.js)) —
  **type-aware** (через TypeChecker; резолвит литерал-union даже через cross-file алиас
  типа `MessageType`): **R5** (review). Общие хелперы — `annotation_core.js`.

Оба включены для `js/**/*.d.ts` в `eslint.config.mjs` как **`warn`** — видны в редакторе
и в `lint-dts`, но сами CI не валят (легаси-нарушений ещё много). Прогон по 295 `.d.ts`:

| Правило | Смысл | Кол-во | Тип | eslint-rule |
|---|---|---|---|---|
| **R1** | `@default null`, но в типе нет `null` | **399** | hard | jsdoc-default-matches-type |
| **R2** | конкретный `@default`, но в типе `\| undefined` | **30** | hard | jsdoc-default-matches-type |
| **R3** | конкретный `@default`, но в типе `null` | **1** (`check_box.value`) | review | — (исключение, в правило не выносим) |
| **R4** | опция-объект (A-obj) без `@default` | **128** | hard | jsdoc-default-matches-type |
| **R5** | литерал-union (≥2 литерала) без `@default` | **85** | review | literal-union-needs-default-doc |
| **R6** | `@default undefined`, но в типе нет `\| undefined` | **73** (вкл. `buttons` и объект-опции) | hard | jsdoc-default-matches-type |
| | **итого hard (R1+R2+R4+R6)** | **630** | | |

R3 не выносим в правило — единственный кейс (`check_box.value`) легитимен. R5 — type-aware
review (шумит на enum-подобных константах), потому `warn`, не блок; под P2 фикс — проза в
описании, не `@default`.

**Детект опции-объекта (R4/R6)** смотрит **сквозь** union (`Props | undefined`) и
утилиты (`Omit`/`Pick`/`Partial`/`Required`/`Readonly`/`Record`). R6 объектные опции
**не исключает**: для них `@default undefined` без `| undefined` — тоже рассогласование
(чинится либо `| undefined` для «опц.фичи», либо `@default {}` для «всегда-вкл» — по seed, §4.4).

**Регресс-гейт (ратчет).** Правила на `warn` сами CI не валят, поэтому новый warning ловит
ратчет — **тонкий счётчик поверх вывода правил** (НЕ второй детектор: логика только в
правилах):
- [build/linters/default-convention-ratchet.js](../packages/devextreme/build/linters/default-convention-ratchet.js)
  считает warning'и наших правил и сравнивает с baseline
  ([default-convention.baseline.json](../packages/devextreme/build/linters/default-convention.baseline.json));
- **падает, если число выросло** (добавлен новый warning);
- `pnpm run lint-dts-convention` — CI-шаг в `lint.yml` (после «Lint .d.ts»);
- `pnpm run lint-dts-convention:update` — пересчитать baseline (когда нарушения починены, тем же PR).

**glob-override.** Чистые области флипаем в `error` через отдельный блок в `eslint.config.mjs`
(`files: [...]` → `error`): новое нарушение там — хард-фейл сразу, не дожидаясь ратчета. По
мере чистки наполняем glob; в конце всё `error`, ратчет выкидываем.

**Граница инструмента.** Lint видит слой «тип ↔ `@default`», но **не рантайм**
(`defaultOptions`, `=== null`, seed-значения). Категорию различает статически по §4.2.
Поэтому массовую правку делаем руками, со чтением `_getDefaultOptions` (codemod отклонён).

---

## 7. План миграции (для раската на команды)

**Автоматический codemod отклонён.** Массовую правку делаем **руками**, по командам:
`lint-dts` (warn'и правил) даёт **worklist** (что чинить), ратчет **держит от регресса**
(§6), `error`-glob строго запрещает в уже чистых областях. Порядок — от дёшево-безопасного
к дорого-спорному.

**Шаг 0. Зафиксировать правило.** Внести §4 в
[.github/instructions/API_conventions.instructions.md](../.github/instructions/API_conventions.instructions.md)
как нормативный раздел. (Энфорсмент — §6 — уже приземлён.)

**Шаг 1. Пилот — `chat.d.ts`.** Категория B: убрать `| undefined`/`@default` у полей
`Message`. A-obj: проставить `@default = seed` (`sendButtonOptions`, `editing`).
Прогнать `regenerate-all` → `update-ts-reexports` → `lint-dts`. Песочница (§2) — приёмочный
тест. Один PR, один ревьюер: эталон стиля.

**Шаг 2. Категория A с явными расхождениями.** `focusedRowKey`, `editRowKey`,
`selectedRowKey`, `editCardKey` — выровнять тип/JSDoc/`defaultOptions` под рантайм.
С регресс-тестами гридов.

**Шаг 3. Массовая правка руками по командам** под надзором ратчета + `error`-glob (§6). Для
каждого optional-поля: найти в `_getDefaultOptions`, определить категорию (§4.2), свести
к таблицам §4. Починив область до 0 → добавить её glob в `error`-блок + `lint-dts-convention:update`.
Точки со строгим `=== null` — отдельным списком (ручное решение).

**Шаг 4. Унификация `defaultOptions` (`null → undefined`).** Отдельный поток в ядре.
Безопасно благодаря `isDefined` (§3.4), кроме списка из шага 3.

---

## 8. Вне этой конвенции (отдельные задачи)

- **`dataSource?: ... | null` × 45.** Рантайм везде loose truthiness → `| null` лишний.
  Но 45 точек + возможные `dataSource: null` в туториалах/демо → нужен план совместимости.
- **template/icon-поля** (`messageTemplate`, `emptyViewTemplate`, `expandIcon`,
  `collapseIcon`): `null` декоративный (нет `=== null`) → по конвенции `undefined`, низкий приоритет.
- **Дедупликация seed-ов опций-объектов** (`chat.sendButtonOptions` дублирует под-дефолты):
  код-клинап.
- **Coordination с тех.райтерами:** P2 переносит «поведение при отсутствии» в текстовые
  описания. До раската — договориться о шаблоне формулировки («If not specified, …») и
  пройтись по затронутым типам (`Message.type`, `TextEditorButton.location` и т.п.),
  иначе пользователь теряет инфу. **Открытый пункт.**

---

## 9. Принятое решение по `@default`: P2 (запись для истории)

Развилка, которую обсуждали: **что отражает `@default` — «эффективный дефолт»
(поведение при отсутствии) или только то, что РЕАЛЬНО хранится?**

- **P1 — «эффективный дефолт».** Ведёт себя как `X` → `@default X`, даже если `X` нигде
  не хранится. → `@default 'text'` у `Message.type`, `@default 'after'` у `location`,
  `@default {}` у `sendButtonOptions`.
- **P2 — «только хранимое» (ПРИНЯТО).** `@default` только когда значение лежит в storage.
  Point-of-use дефолт → тега нет, поведение в описание. → у `Message.type` и `location`
  тега **нет**; `sendButtonOptions` → `@default { icon, action }` (реальный seed).

**Почему P2:** честнее (тег не утверждает того, чего нет в рантайме); механически
проверяем детектором («`@default` == то, что в `defaultOptions`/объекте»); убирает
субъективное «является ли это эффективным дефолтом». Минус — `@default` в API-доке
больше не показывает поведение при отсутствии; закрывается описанием типа (см. §8,
открытый пункт с тех.райтерами).

Три кейса под P2 (с пруфами):

| Кейс | Рантайм | Решение (P2) |
|---|---|---|
| `chat.sendButtonOptions` | seed `{ icon:'arrowright', action:'send', onClick:undefined }` ([chat.ts:118](../packages/devextreme/js/__internal/ui/chat/chat.ts)) | `@default { icon: 'arrowright', action: 'send' }` (зеркало seed); НЕ `{}` |
| `TextEditorButton.location` | `const { location = 'after' } = buttonInfo` ([index.ts:167](../packages/devextreme/js/__internal/ui/text_box/texteditor_button_collection/index.ts)) — не хранится | `@default` убрать; поведение в описание |
| `MessageBase.type` | `switch (type) { … default: text }` ([messagebubble.ts:120](../packages/devextreme/js/__internal/ui/chat/messagebubble.ts)) — не хранится | `@default` не ставить; поведение в описание |

---

## Артефакты

- [undefined-research.component.ts](undefined-research.component.ts) — песочница.
- [tsconfig.research.json](tsconfig.research.json) — изолированный конфиг.
- Воспроизведение песочницы: `cd apps/demos && pnpm exec ngc --noEmit --project ../../docs/tsconfig.research.json`.
- Энфорсмент (Фаза 1, в `packages/devextreme/`):
  - `eslint_plugins/jsdoc_default_matches_type.js` (+ `.test.js`) — R1/R2/R4/R6;
  - `eslint_plugins/literal_union_needs_default_doc.js` (+ `.test.js`) — R5 (type-aware);
  - `eslint_plugins/annotation_core.js` (+ `.test.js`) — общие хелперы;
  - `build/linters/default-convention-ratchet.js` + `default-convention.baseline.json` — ратчет;
  - CI-шаг в `.github/workflows/lint.yml`;
  - запуск: `pnpm run lint-dts-convention` (`:update` — пересчёт baseline).
