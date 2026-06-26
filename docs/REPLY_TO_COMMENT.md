# Ответ на комментарий по конвенции (RU)

Спасибо. По сути мы описываем одно и то же правило — расхождение ровно в одном пункте, и его можно проверить воспроизводимо, поэтому давай зафиксирую факты, а не позиции.

Главное: новая статья **не отменяет и не противоречит** прежней договорённости. Она (а) делает то же правило проверяемым автоматически — линтер плюс Copilot-ревью, и (б) доопределяет краевые случаи, которые прежняя версия оставляла на усмотрение. Разница между «договорились» и «соблюдается» — это и есть энфорсмент: сейчас линтер насчитывает 502 расхождения тип/`@default`, то есть прежнее правило де-факто не выдерживается. Поэтому акцент новой версии — инструмент, а не новая формулировка.

**1. Nullish default → `null`, как possible type, с `@default`.**
Согласен полностью, добавить нечего — в конвенции это категория A со смысловым `=== null`. Единственное уточнение, на котором я делаю акцент: большинство `null`, которые сейчас лежат в `_getDefaultOptions`, смыслового `=== null` не имеют — обращения к ним идут через `isDefined`, где `null ≡ undefined`. Для **нового** кода такие «нет значения» — это `undefined`, а не `null`; существующие `null` мы при этом не мигрируем (это breaking change). Это не спорит с твоим пунктом 1, а уточняет, **когда** `null` оправдан.

**2. Default `undefined` → optional type, без `| undefined` и без `@default`; Angular-issue исправлен.**
Здесь единственное расхождение. Для полей-данных и под-свойств config-item (категория B) — да, ровно как ты пишешь: голый `?`, без `| undefined`, без `@default`. Но для **опции** с дефолтом `undefined` `| undefined` в типе нужен, и причина не в исторической Angular-баге, а в генераторе обёрток: он теряет `?`, поле в Angular-классе становится обязательным с типом ровно из аннотации `.d.ts`.

Это, кстати, зафиксировано в самом старом исследовании, в разделе Angular: «Removing `| undefined` from option type in d.ts causes `@Input()`/`@Output()` decorators change in generated component», и тикет T1093403 был закрыт именно добавлением `| undefined`. То есть `| undefined` — это и есть тот фикс, а не то, что фикс отменил. «Issue исправлен» и «`| undefined` не нужен» — взаимоисключающие утверждения.

Проверяется за минуту, не обязательно верить мне на слово. Положи в корень репозитория `tsconfig.research.json` и `undefined-research.component.ts` и запусти:

```
pnpm --dir apps/demos exec ngc --noEmit --project ../../tsconfig.research.json
```

Получишь ровно одну ошибку:

```
error TS2322: Type 'undefined' is not assignable to type 'MessageType'.
    [type]="undefined"
```

`[accessKey]="undefined"` (тип `string | undefined`) компилируется, `[type]="undefined"` (тип без `| undefined`) — нет. Причина здесь одна: наличие `| undefined` в `.d.ts` ядра у accessKey и отсутствие undefined у свойства type.

**Про #34126.**
#34126 как раз соответствует правилу: он откатывает неодобренные breaking changes (массовую замену `null → undefined` из #33784) и сохраняет существующий рантайм-`null` — это ровно BC-политика конвенции: существующее не мигрируем. Если ты видишь в #34126 конкретное поле, которое читается как противоречие, покажи его — разберём по осям. Уверен, оно ложится в правило: либо это категория B (голый `?`), либо расширение типа под уже существующий рантайм-`null`.

**Про 502 — нет, не все про null vs undefined.**
502 — это baseline линтера `jsdoc-default-matches-type`, то есть жёстко-проверяемые R1 + R2 + R3:
- R1 — `@default null`, а в типе нет `null`: ~399
- R2 — конкретный `@default`, а в типе есть `| undefined`: ~30
- R3 — `@default undefined`, а в типе нет `| undefined`: ~73

Напрямую про `null` vs `undefined` — это R1 + R3 (~472). Оставшиеся ~30 (R2) — другой случай: конкретный дефолт с лишним `| undefined`. Плюс отдельно есть слой ревью (R4 — объект-опции), он в эти 502 не входит. То есть это не один кейс, а несколько разных видов рассогласования тип/`@default`.

---

# Reply to the comment (EN)

Thanks. We are essentially describing the same rule — the disagreement is in exactly one point, and that point can be verified reproducibly, so let me state facts rather than positions.

The key thing first: the new article does **not** revoke or contradict the earlier agreement. It (a) makes the same rule automatically verifiable — a linter plus Copilot review — and (b) pins down the edge cases the earlier version left to individual judgment. The gap between "we agreed" and "it's actually followed" is precisely enforcement: the linter currently counts 502 type/`@default` mismatches, i.e. the earlier rule is de facto not holding. So the emphasis of the new version is the tooling, not a new wording.

**1. Nullish default → `null`, set as a possible type, with `@default`.**
Fully agreed, nothing to add — in the convention this is category A with a meaningful `=== null`. The one clarification I emphasize: most of the `null`s currently sitting in `_getDefaultOptions` have no meaningful `=== null` — they are accessed through `isDefined`, where `null ≡ undefined`. For **new** code such "no value" is `undefined`, not `null`; existing `null`s are not migrated (that would be a breaking change). This doesn't argue with your point 1 — it clarifies **when** `null` is justified.

**2. Default `undefined` → optional type, no `| undefined` and no `@default`; the Angular issue is fixed.**
This is the single point of divergence. For data-object fields and config-item sub-properties (category B) — yes, exactly as you write: a bare `?`, no `| undefined`, no `@default`. But for an **option** whose default is `undefined`, `| undefined` in the type **is** required, and the reason is not the historical Angular bug but the wrapper generator: it drops the `?`, so the field in the Angular class becomes required with exactly the type from the `.d.ts` annotation.

This is, in fact, recorded in the older research itself, in the Angular section: "Removing `| undefined` from option type in d.ts causes `@Input()`/`@Output()` decorators change in generated component", and ticket T1093403 was closed precisely **by adding** `| undefined`. So `| undefined` is that fix — not something the fix removed. "The issue is fixed" and "`| undefined` is not needed" are mutually exclusive statements.

It can be verified in a minute, without taking my word for it. Drop `tsconfig.research.json` and `undefined-research.component.ts` into the repository root and run:

```
pnpm --dir apps/demos exec ngc --noEmit --project ../../tsconfig.research.json
```

You'll get exactly one error:

```
error TS2322: Type 'undefined' is not assignable to type 'MessageType'.
    [type]="undefined"
```

`[accessKey]="undefined"` (type `string | undefined`) compiles, `[type]="undefined"` (type without `| undefined`) does not. The reason here is the single one: `| undefined` is present in the core `.d.ts` for `accessKey` and `undefined` is absent on the `type` property.

**On #34126.**
#34126 actually conforms to the rule: it rolls back the non-approved breaking changes (the mass `null → undefined` replacement from #33784) and keeps the existing runtime `null` — which is exactly the convention's BC policy: we don't migrate existing code. If you see a specific field in #34126 that reads as a contradiction, point me to it and we'll work it through the two axes. I'm confident it fits the rule: either it's category B (a bare `?`), or it's widening the type to match an already-existing runtime `null`.

**On the 502 — no, they are not all about null vs undefined.**
502 is the baseline of the `jsdoc-default-matches-type` linter rule, i.e. the hard-checked R1 + R2 + R3:
- R1 — `@default null`, but the type has no `null`: ~399
- R2 — a concrete `@default`, but the type has `| undefined`: ~30
- R3 — `@default undefined`, but the type has no `| undefined`: ~73

Directly about `null` vs `undefined` — that's R1 + R3 (~472). The remaining ~30 (R2) is a different case: a concrete default with a redundant `| undefined`. On top of that there's a separate review layer (R4 — object-valued options), which is not part of the 502. So it's not a single case — it's several distinct kinds of type/`@default` mismatch.
