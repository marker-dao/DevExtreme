/*
 * SANDBOX: доказывает, что форма типа `T` vs `T | undefined` в .d.ts ядра
 * напрямую управляет тем, примет ли Angular-обёртка `undefined` во входном
 * биндинге при включённом strictTemplates у потребителя.
 *
 * Запуск (ngc нужен из apps/demos, конфиг — в docs/):
 *   cd apps/demos
 *   pnpm exec ngc --noEmit --project ../../docs/tsconfig.research.json
 *
 * Ожидаемый вывод (ровно одна ошибка — на [type]):
 *   undefined-research.component.ts:38:28 - error TS2322:
 *     Type 'undefined' is not assignable to type 'MessageType'.
 *         [type]="undefined"
 *
 * Разбор:
 *   • [accessKey]="undefined"  — ошибки НЕТ.
 *       WidgetOptions.accessKey объявлен как `accessKey?: string | undefined`,
 *       генератор обёртки выпустил `set accessKey(value: string | undefined)`.
 *   • [type]="undefined"       — TS2322.
 *       MessageBase.type объявлен как `type?: MessageType` (без | undefined),
 *       генератор обёртки выпустил `set type(value: MessageType)`.
 *
 *   Других различий между этими двумя биндингами нет. Значит, наличие
 *   `| undefined` в .d.ts ядра — единственная причина разного поведения.
 *
 * Почему отдельный файл, а не app.component.ts: AppComponent использует
 * динамический templateUrl (`./${modulePrefix}/app.component.html`), который
 * Angular AOT не резолвит статически и пропускает template type-check.
 * Здесь — inline-шаблон, он проверяется.
 */
import { Component } from '@angular/core';
import { DxChatModule } from 'devextreme-angular';

@Component({
  selector: 'demo-undefined-research',
  template: `
    <dx-chat [accessKey]="undefined">
      <dxi-chat-chat-item [type]="undefined"></dxi-chat-chat-item>
    </dx-chat>
  `,
  imports: [DxChatModule],
})
export class UndefinedResearchComponent {}
