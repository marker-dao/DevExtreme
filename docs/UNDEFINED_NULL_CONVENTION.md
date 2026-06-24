# Конвенция: `undefined` / `null` / `| undefined` для optional-полей в `.d.ts` ядра

## TL;DR

Форма optional-поля задаётся **двумя независимыми осями**:

- **Ось «`| undefined`» (тип).** `| undefined` ставим **только** если поле — это
  **опция**, у которой в `defaultOptions` хранится `undefined`. Всё остальное —
  голый `?`.
- **Ось «`@default`» (JSDoc, принцип P2).** `@default <X>` пишем **только когда `X`
  реально ХРАНИТСЯ** как дефолт (`defaultOptions` для опции; дефолтный объект для
  опции-объекта). Дефолт «в точке использования» (`switch (x) {default}`,
  `const { x = 'after' } = …`, `x ?? …`) **не хранится** → `@default` **не ставим**,
  поведение описываем в **текстовом описании** типа/поля.

Три категории — куда отнести поле:

| Категория | Что это | Тип | `@default` |
|---|---|---|---|
| **A** — скаляр/коллекция-опция | ключ в `defaultOptions` | конкретный дефолт → `T`; дефолт `undefined` → `T \| undefined`; семантич. `null` → `T \| null` | `= хранимый дефолт` |
| **A-obj** — опция-объект | ключ в `defaultOptions`, значение — конфиг (merge) | `T` (без `\| undefined`) | `= хранимый дефолтный объект` |
| **B** — свойство объекта | поле объекта-данных (`Message`) **или** под-свойство config-item (`TextEditorButton`) — **не** опция | `T` (без `\| undefined`) | **нет** (поведение → описание) |

Сквозное: в `defaultOptions` «нет значения» = `undefined` (`null` — только при
смысловом `=== null`).

**Новые vs существующие поля (политика BC).** Правило выше — для **нового** кода:
новая опция дефолтится `undefined`, тип и дока пишутся под `undefined`. `null` (как
тип или значение) **не запрещён**, но требует **логического обоснования** (рантайм
реально различает `=== null`) — в большинстве случаев он не нужен. Для
**существующих** полей **breaking changes не делаем**: рантайм-`null` не мигрируем в
`undefined`; рассогласование «тип ↔ `@default`» чиним **расширением типа под рантайм**
(добавить `| null`), а не правкой рантайма. Такие поля — вынужденный компромисс,
**не образец для копирования** (§4.8).

**Два слоя контроля.** Линтер ловит механику (тип ↔ `@default`); выбор
`undefined`-vs-`null` для нового поля линтер сделать **не может** → этот смысловой
выбор закреплён в `API_conventions.instructions.md` для ревью (GitHub Copilot) (§6).

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

**Сколько этого (измерено линтером §6):** жёстких нарушений **630** (R1+R2+R4+R6),
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
   явный `| undefined` в исходнике. **Подтверждено баг-репортом**
   [T1093403](https://isc.devexpress.com/internal/ticket/details/T1093403)
   (I. Kharchenko, 2022, «Angular Components — Properties without the default value
   do not accept undefined»): обёртка генерит `get/set width(): number | Function | string`
   без `| undefined`, из-за чего `[width]="undefined"` нельзя забиндить; правильная
   форма — `… | undefined`.

4. **`isDefined` уравнивает null и undefined.** Канон проверок (248 против 22) —
   `isDefined(x)`. Отсюда два вывода: **(а)** новому полю `null`, как правило, не нужен —
   код всё равно не различает его с `undefined` (потому правило для нового кода —
   `undefined`); **(б)** внутренне миграция `null → undefined` была бы почти нейтральна
   (кроме строгих `=== null`). **Но** на внешней поверхности (возврат `option()`,
   компиляция `[x]="null"`) замена существующего `null` — это **breaking change**,
   поэтому существующее **не мигрируем** (§4.8). Семантическая нейтральность здесь —
   аргумент, что легаси-`null` безвреден и его можно спокойно оставить, а не повод
   его трогать.

5. **Поля объектов данных рантайм не заполняет `undefined`.** Для `Message.type`
   ([messagebubble.ts:120](../packages/devextreme/js/__internal/ui/chat/messagebubble.ts)):
   `switch (type) { case 'image': … case 'text': default: … }` — отсутствие
   `type` уводит в `default` (текст). Поле объекта при этом **не появляется** со
   значением `undefined`; его просто нет, и `'text'` нигде не **хранится**.

6. **Опция-объект объединяется (merge), а не заменяется.** Значение хранится как частичный
   конфиг и сливается с дефолтами под-свойств (`_bindInnerWidgetOptions`,
   `_options.cache(...)`). В `defaultOptions` всегда лежит объект (минимум `{}`),
   `undefined` там не бывает. Seed-ы:
   `drop_down_editor.ts:252` — `dropDownOptions: { showTitle: false }`;
   `drop_down_button.ts:120` — `dropDownOptions: {}`;
   `chat.ts:118` — `sendButtonOptions: { icon: 'arrowright', action: 'send', onClick: undefined }`.

7. **Под-свойства config-item вычисляются в точке использования и не хранятся.** `TextEditorButton.location`
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

> `| undefined` ⟺ поле — **опция**, чей дефолт в `defaultOptions` равен `undefined`.
>
> - опция с дефолтом `undefined` (`accessKey`, `buttons`, коллбэки) → `T | undefined`;
> - опция с конкретным дефолтом (`activeStateEnabled: false`) → `T`;
> - опция-объект A-obj (дефолт `{}`/объект) → `T`;
> - **свойство объекта B** (поле данных или под-свойство config-item) → `T`
>   (его не задают в `defaultOptions`; `undefined` — не нужное входное значение, `?` уже покрывает «опустить»);
> - рантайм делает смысловой `=== null` → `T | null` (отдельно от undefined).

**Ось `@default` (P2)** — отвечает на «**какое значение реально хранится по умолчанию**»:

> `@default <X>` ⟺ `X` физически лежит в storage (`defaultOptions` для опции;
> дефолтный объект для A-obj). Дефолт «в точке использования» (`switch default`,
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
> (дефолт в точке использования → в описание). Их не задают в `defaultOptions`, и `undefined` им передавать не
> нужно — `name`/`options`/`location` ты **задаёшь или опускаешь**.

### 4.3. Категория A — скаляр/коллекция-опция

| дефолт в `defaultOptions` | тип | `@default` |
|---|---|---|
| конкретное значение (`false` / `true` / число / строка / `[]`) | `foo?: T` | `@default <value>` |
| `undefined` («не задано») | `foo?: T \| undefined` | `@default undefined` |
| `null` со смысловым `=== null` | `foo?: T \| null` | `@default null` |

**Почему дефолт `undefined` ⇒ `| undefined`:** для опции `undefined` — реальное
хранимое значение домена; плюс генератор обёртки теряет `?`, и без `| undefined`
в обёртке нельзя выразить «не задано» → strictTemplates ломает легальные
`[input]="undefined"`, `[input]="obs$ | async"` (async-pipe до первого значения
`Observable` отдаёт `null`/`undefined`), `[input]="signal()"` (доказано в §2).

Коллбэки/события — частный случай дефолт `undefined`: `onFoo?: ((e) => void) | undefined`,
`@default undefined`. **Никогда `| null`.**

### 4.4. Категория A-obj — опция-объект

Значение — частичный конфиг, который рантайм **объединяет (merge)** с дефолтами под-свойств
(`dropDownOptions?: PopupProperties`, `sendButtonOptions?: SendButtonProperties`,
`editing?: EditingBase<…>`).

**Что считается опцией-объектом** (по форме типа, как видит линтер §6): inline
`{ … }`; ссылка на `*Properties`/`*Options`/`*Base`; `Record<…>`; утилита-обёртка
`Omit`/`Pick`/`Partial`/`Required`/`Readonly` над таким типом (напр.
`Omit<FileUploaderProperties, 'value'>` — это `fileUploaderOptions`/`speechToTextOptions`).
Union с `| null`/`| undefined` — тоже (смотрим на члены без `null`/`undefined`).

**Объектные опции — два вида** (различаются по дефолту; lint их **не** различает — дефолт в рантайме):

| Вид | Примеры | дефолт | тип | `@default` |
|---|---|---|---|---|
| «всегда-вкл» конфиг (merge + вложенные пути `option('editing.mode')`) | `editing`, `dropDownOptions`, `sendButtonOptions` | объект (под-дефолты / `{}`) | `foo?: NestedProperties` | дефолтный объект |
| «опц. фича, выключена» | `fileUploaderOptions`, `speechToTextOptions` | `undefined` | `foo?: NestedProperties \| undefined` | `undefined` |

«Всегда-вкл» **не может быть `undefined`**: рантайм адресует под-опции по пути
(`option('editing.mode')`, [m_editing.ts:209](../packages/devextreme/js/__internal/grids/grid_core/editing/m_editing.ts))
и объединяет частичные обновления — нужен базовый объект. «Опц. фича» по умолчанию не
сконфигурирована → `undefined`. (Это правит §3.6: «всегда объект» верно только для merge-вида.)

> **«Опц. фича, выключена» не рекомендуется для нового дизайна.** Опция несёт **двойную
> ответственность** — конфиг фичи и флаг её включения (`undefined` = выключена). Лучше
> разнести на две опции: `speechToTextEnabled: boolean` (флаг) + `speechToTextOptions:
> NestedProperties` (конфиг, всегда объект, без `| undefined`). Существующий
> `speechToTextOptions?: … | undefined` не трогаем (BC).

Таблица ниже — про **«всегда-вкл»** вид:

| Что | Как |
|---|---|
| **тип** | `foo?: NestedProperties` — без `\| undefined`, без `\| null` |
| **`@default`** | **зеркалит дефолтный объект из `defaultOptions`** (см. ниже) |
| **дефолты под-свойств** | на **членах** `NestedProperties`, каждый со своим `@default` |

**`@default` = хранимый дефолт (P2).** Никаких «`{}` или дельта» — просто отражаем то,
что лежит в `defaultOptions`:

| Поле | дефолт в рантайме | `@default` |
|---|---|---|
| `drop_down_button.dropDownOptions` | `{}` | `@default {}` |
| `autocomplete.dropDownOptions` | `{ showTitle: false }` | `@default { showTitle: false }` |
| `chat.sendButtonOptions` | `{ icon: 'arrowright', action: 'send', onClick: undefined }` | `@default { icon: 'arrowright', action: 'send' }` |
| `grids.editing` | дефолтный объект | `@default { …дефолт }` (или `{}`, если дефолт пуст) |

(Так `@default {}` остаётся честным только там, где дефолт реально `{}`. Для
`sendButtonOptions` пустой `{}` был бы неверен — реальный дефолт не пуст; зеркалим его.
Дедупликация дефолтов, дублирующих под-дефолты, — отдельная чистка кода, §8.)

### 4.5. Категория B — свойство объекта (данные и config-item)

`Message`/`User`/`Alert` (данные) и под-свойства `TextEditorButton`/`Column`/… (config-item) —
**не опции**, в `defaultOptions` их нет.

| правило | тип | `@default` |
|---|---|---|
| всегда | `foo?: T` (без `\| undefined`) | **нет** — поведение при отсутствии в **описании** |

**Почему голый `?` без `| undefined`:** поле не задают в `defaultOptions`, и передавать ему
`undefined` не нужно — значение либо задают, либо опускают (это и значит `?`). Под
`exactOptionalPropertyTypes: true` тип `foo?: T` разрешает поле **опустить**, но не разрешает
присвоить ему `undefined` напрямую (`{ foo: undefined }` — ошибка компиляции).
Если у потребителя `undefined` пришёл из формы/async — он опускает ключ
(`...(x !== undefined && { foo: x })`) или подставляет своё (`foo: x ?? fallback`).

**Почему без `@default` (P2):** у этих полей дефолт — запасное значение в точке использования
(§3.5, §3.7), оно нигде не хранится. Поэтому через `.option()` это значение не вернётся (в
хранилище его нет) → указывать его в `@default` нельзя: тег утверждал бы то, чего в рантайме
нет. Поведение при отсутствии описываем текстом в описании типа (его пишет технический писатель):
- `Message.type` → описание: *«If not specified, the message is rendered as a text message.»*
- `TextEditorButton.location` → описание: *«If not specified, the button is placed after the input field.»*
  (соответствует [текущей API-доке](https://js.devexpress.com/jQuery/Documentation/ApiReference/UI_Components/dxAutocomplete/Configuration/buttons/#location)).

### 4.6. Сквозное правило по `defaultOptions`

«Значения нет» в `defaultOptions` пишем **`undefined`**, не `null` — **для нового
кода**. Существующий легаси-`null` **не мигрируем** (это BC, §4.8): рантайм
оставляем, тип расширяем под него. `null` пишем осознанно только при смысловом
`=== null`. Обоснование преференции `undefined`: код и так трактует null≡undefined
через `isDefined` (§3.4) — поэтому новому полю `null`, как правило, не нужен.

### 4.7. Сводка «тип ↔ `@default`» (что чему соответствует)

| тип | допустимый `@default` |
|---|---|
| `T` (опция, конкретный дефолт) | значение дефолта |
| `T \| undefined` (опция, дефолт undefined) | `undefined` |
| `T \| null` | `null` |
| `NestedProperties` (A-obj) | дефолтный объект |
| `T` (категория B) | **тега нет** (поведение → описание) |

### 4.8. Новые vs существующие поля — политика BC

Конвенция нормативна для **нового** кода; к существующему применяется **без
breaking changes**.

**Новое поле (опция).**
- `defaultOptions`: `undefined` для «нет значения»;
- тип и `@default`: под `undefined` (§4.3);
- `null` — **по умолчанию нет**. Допустим (как тип/значение) только с **явным
  логическим обоснованием**: рантайм реально различает `=== null`. Без обоснования
  ревью отклоняет (это смысловой слой, §6 — его держит не линтер).

**Существующее поле — без BC.** Если рантайм уже хранит `null`, **рантайм не меняем**
(иначе ломаем потребителей: `option('x')` начнёт отдавать `undefined` вместо `null`,
а `[x]="null"` перестанет компилироваться). Рассогласование «тип ↔ `@default`» чиним
**расширением типа под рантайм**:

> R1 (`@default null`, рантайм `null`, тип без `null`) для **существующего** поля →
> **добавляем `| null` в тип** (расширение, не BC); рантайм и `@default null`
> оставляем как есть.

**Пример — `dxDropDownButtonOptions.selectedItemKey`** (категория A): тип уже
рантайма, поэтому рантайм вынужден прятать дефолт под `@ts-expect-error`.

```ts
// .d.ts (было): тип не допускает null, который кладёт рантайм
selectedItemKey?: string | number;          // @default null

// рантайм (__internal/ui/drop_down_button.ts, _getDefaultOptions):
//   // @ts-expect-error public API needs to be fixed
//   selectedItemKey: null,

// .d.ts (стало): расширяем тип под существующий рантайм
selectedItemKey?: string | number | null;   // @default null  (рантайм НЕ трогаем)
```

Эффект: `selectedItemKey: null` в `_getDefaultOptions` становится валидным →
снимается `// @ts-expect-error public API needs to be fixed`. Потребитель ничего не
теряет — тип только расширили. Рантайм-`null` остаётся «историческим»: обращения идут
через `isDefined` (null ≡ undefined), строгого `=== null` по полю нет.

> Это **компромисс ради совместимости, а не эталон.** По осям конвенции это поле
> отклоняется от «нового» правила (там был бы `undefined`). **Не копируйте его форму
> в новый код** — в новом пишем `undefined`.

---

## 5. Примеры

```ts
// ── A: скаляр/коллекция-опция ───────────────────────────────────────────────
activeStateEnabled?: boolean;              // @default false       (defaultOptions: false)
accessKey?: string | undefined;            // @default undefined   (дефолт undefined)
buttons?: Array<DropDownPredefinedButton | TextEditorButton> | undefined;
                                           // @default undefined   (defaultOptions: void 0) ← фикс: было без | undefined
onMessageEntered?: ((e: ...) => void) | undefined; // @default undefined
value?: boolean | null;                    // @default false; null = indeterminate (check_box.tsx: checked === null)

// ── A-obj: опция-объект (@default = хранимый дефолт) ──────────────────────────
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

**Разбор расхождения `focusedRowKey` (как чинить, без BC):**

```ts
// Сейчас: focusedRowKey?: TKey | undefined; @default undefined; а рантайм хранит null.
// Рантайм НЕ трогаем (миграция null→undefined = BC, §4.8). Выравниваем тип/@default
// под существующий рантайм-null, сохраняя уже допустимый `| undefined`:
/** @default null */
focusedRowKey?: TKey | null | undefined;   // defaultOptions: { focusedRowKey: null } (уже так)
// `| null` — под рантайм-дефолт; `| undefined` сохраняем, чтобы не сломать [focusedRowKey]="undefined".
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
(чинится либо `| undefined` для «опц.фичи», либо `@default {}` для «всегда-вкл» — по дефолту, §4.4).

**Регресс-гейт (ратчет).** Правила на `warn` сами CI не валят, поэтому новый warning ловит
ратчет — **тонкий счётчик поверх вывода правил** (не дублирует детекцию: логика только в
правилах):
- [build/linters/default-convention-ratchet.js](../packages/devextreme/build/linters/default-convention-ratchet.js)
  считает warning'и наших правил и сравнивает с baseline
  ([default-convention.baseline.json](../packages/devextreme/build/linters/default-convention.baseline.json));
- **падает, если число выросло** (добавлен новый warning);
- `pnpm run lint-dts-convention` — CI-шаг в `lint.yml` (после «Lint .d.ts»);
- `pnpm run lint-dts-convention:update` — пересчитать baseline (когда нарушения починены, тем же PR).

**glob-override.** Чистые области переводим в `error` через отдельный блок в `eslint.config.mjs`
(`files: [...]` → `error`): новое нарушение там — хард-фейл сразу, не дожидаясь ратчета. По
мере чистки наполняем glob; в конце всё `error`, ратчет выкидываем.

**Граница инструмента → второй слой защиты.** Lint видит слой «тип ↔ `@default`», но
**не рантайм** (`defaultOptions`, `=== null`, дефолтные значения) и **не может решить, что
правильнее для нового поля — `undefined` или `null`**: это смысловой выбор по рантайму
(§4.8). Линтер ловит рассогласование, но **не направление** фикса. Поэтому энфорсмент
**двухслойный**:

1. **Линтер** (этот §6) — механическая проверка «тип ↔ `@default`» (R1/R2/R4/R5/R6) +
   ратчет от регресса. Объективно, без смысла.
2. **Ревью (GitHub Copilot) через `API_conventions.instructions.md`** — смысловой слой.
   Нормативная часть конвенции (§4, особенно §4.8: «новое поле → `undefined`; `null`
   только с обоснованием») вносится в инструкции, чтобы Copilot на PR-ревью замечал и
   превентил `null` в новом поле без обоснования — то, что линтер зафиксировать не
   способен.

Массовую правку существующего делаем руками, с чтением `_getDefaultOptions`.
Для существующих полей — **без BC** (§4.8): тип расширяем под рантайм,
рантайм не трогаем.

---

## 7. План миграции

**Шаг 0. Зафиксировать правило (оба слоя §6).** Внести §4 (особенно §4.8) в
[.github/instructions/API_conventions.instructions.md](../.github/instructions/API_conventions.instructions.md)
как нормативный раздел — это **смысловой слой**: даёт GitHub Copilot основание
превентить `null` в новом поле без обоснования (линтер §6 — механический слой — это
не ловит). Механический энфорсмент (линтер + ратчет) уже приземлён.

**Шаг 1. Пилот — `chat.d.ts`.** Категория B: убрать `| undefined`/`@default` у полей
`Message`. A-obj: проставить `@default = дефолт` (`sendButtonOptions`, `editing`).
Прогнать `regenerate-all` → `update-ts-reexports` → `lint-dts`. Песочница (§2) — приёмочный
тест. Один PR, один ревьюер: эталон стиля.

**Шаг 2. Категория A с явными расхождениями (без BC).** `focusedRowKey`, `editRowKey`,
`selectedRowKey`, `editCardKey`, `selectedItemKey` — рантайм держит `null`, тип его не
допускает. Чиним **расширением типа под рантайм** (добавить `| null`), `@default null`
и рантайм **оставляем** (§4.8). Побочно снимаются `// @ts-expect-error public API needs
to be fixed` над такими дефолтами. Рантайм не трогаем → регресс-риска нет.

**Шаг 3. Массовая правка руками по командам** под надзором ратчета + `error`-glob (§6). Для
каждого optional-поля: найти в `_getDefaultOptions`, определить категорию (§4.2), свести
к таблицам §4 — для **существующего** поля **без BC** (тип расширяем под рантайм, рантайм
не трогаем, §4.8). Починив область до 0 → добавить её glob в `error`-блок +
`lint-dts-convention:update`.

**Шаг 4. ~~Унификация `defaultOptions` (`null → undefined`)~~ — НЕ делаем для
существующего.** Массовая миграция рантайм-`null → undefined` = **breaking change**
(§4.8: меняет возврат `option()` и компиляцию `[x]="null"`), поэтому **отменена** для
существующих опций — легаси-`null` остаётся. Преференция `undefined` применяется только
к **новому** коду (Шаг 0 + ревью, §6). Точечная миграция существующего `null → undefined`
возможна лишь как осознанный BC в major-релизе с планом совместимости — вне этого плана.

---

## 8. Вне этой конвенции (отдельные задачи)

- **`dataSource?: ... | null` × 42 (остаётся, не трогаем).** Рантайм везде loose
  truthiness → `| null` по-хорошему лишний, но `dataSource: null` документирован
  (`@default null`) и встречается в туториалах/демо → снятие `| null` = **breaking
  change**. По §4.8 (существующее, без BC) **оставляем как есть**. Это канонический
  «терпимый легаси-`null`»: тип/`@default`/рантайм между собой согласованы (линтер
  молчит), поэтому в списке нарушений §6 его и нет. В новом коде так не пишем.
- **template/icon-поля** (`messageTemplate`, `emptyViewTemplate`, `expandIcon`,
  `collapseIcon`): `null` декоративный (нет `=== null`) → по конвенции `undefined`, низкий приоритет.
- **Дедупликация дефолтов опций-объектов** (`chat.sendButtonOptions` дублирует под-дефолты):
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
  тега **нет**; `sendButtonOptions` → `@default { icon, action }` (реальный дефолт).

**Почему P2:** честнее (тег не утверждает того, чего нет в рантайме); механически
проверяем линтером («`@default` == то, что в `defaultOptions`/объекте»); убирает
субъективное «является ли это эффективным дефолтом». Минус — `@default` в API-доке
больше не показывает поведение при отсутствии; закрывается описанием типа (см. §8,
открытый пункт с тех.райтерами).

Три кейса под P2 (с пруфами):

| Кейс | Рантайм | Решение (P2) |
|---|---|---|
| `chat.sendButtonOptions` | дефолт `{ icon:'arrowright', action:'send', onClick:undefined }` ([chat.ts:118](../packages/devextreme/js/__internal/ui/chat/chat.ts)) | `@default { icon: 'arrowright', action: 'send' }` (зеркало дефолта); НЕ `{}` |
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
