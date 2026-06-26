/*
 * SANDBOX: доказывает, что форма типа `T` vs `T | undefined` в .d.ts ядра
 * напрямую управляет тем, примет ли Angular-обёртка `undefined` во входном
 * биндинге при включённом strictTemplates у потребителя.
 *
 * Запуск (ngc нужен из apps/demos, конфиг — в root/):
 *   pnpm --dir apps/demos exec ngc --noEmit --project ../../tsconfig.research.json
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
