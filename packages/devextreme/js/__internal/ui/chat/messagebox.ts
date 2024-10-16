import $ from '@js/core/renderer';
import type { NativeEventInfo } from '@js/events';
import messageLocalization from '@js/localization/message';
import type { ClickEvent } from '@js/ui/button';
import Button from '@js/ui/button';
import type { Properties as DOMComponentProperties } from '@ts/core/widget/dom_component';
import DOMComponent from '@ts/core/widget/dom_component';
import type { OptionChanged } from '@ts/core/widget/types';

import type { EnterKeyEvent } from '../../../ui/text_area';
import type dxTextArea from '../../../ui/text_area';
import TextArea from '../m_text_area';

const CHAT_MESSAGEBOX_CLASS = 'dx-chat-messagebox';
const CHAT_MESSAGEBOX_TEXTAREA_CLASS = 'dx-chat-messagebox-textarea';
const CHAT_MESSAGEBOX_BUTTON_CLASS = 'dx-chat-messagebox-button';

const TYPING_START_DELAY = 1500;
const TYPING_END_DELAY = 2000;

// eslint-disable-next-line @typescript-eslint/no-explicit-any, spellcheck/spell-checker
const debounce = (func: any, delay: number): any => {
  let timestamp = 0;

  // eslint-disable-next-line func-names, @typescript-eslint/no-explicit-any
  return function (...args: any) {
    const now = Date.now();

    if (now - timestamp >= delay) {
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      func.apply(this, args);

      timestamp = now;
    }
  };
};

export type MessageSendEvent =
  NativeEventInfo<MessageBox, KeyboardEvent | PointerEvent | MouseEvent | TouchEvent> &
  { text?: string };

export interface Properties extends DOMComponentProperties<MessageBox> {
  onMessageSend?: (e: MessageSendEvent) => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onTypingStart?: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onTypingEnd?: any;

  activeStateEnabled?: boolean;

  focusStateEnabled?: boolean;

  hoverStateEnabled?: boolean;
}

class MessageBox extends DOMComponent<MessageBox, Properties> {
  _textArea!: dxTextArea;

  _button!: Button;

  _messageSendAction?: (e: Partial<MessageSendEvent>) => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _typingStartAction?: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _typingEndAction?: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, spellcheck/spell-checker
  _debouncedTriggerTypingStartEvent: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _typingStartEventTimeout: any;

  _getDefaultOptions(): Properties {
    return {
      ...super._getDefaultOptions(),
      onMessageSend: undefined,
      activeStateEnabled: true,
      focusStateEnabled: true,
      hoverStateEnabled: true,
    };
  }

  _init(): void {
    super._init();

    this._createMessageSendAction();
    this._createTypingStartAction();
    this._createTypingEndAction();
    this._wrapTriggerTypingStartEvent();
  }

  _wrapTriggerTypingStartEvent(): void {
    // eslint-disable-next-line spellcheck/spell-checker
    this._debouncedTriggerTypingStartEvent = debounce(
      this._triggerTypingStartEvent,
      TYPING_START_DELAY,
    );
  }

  _initMarkup(): void {
    $(this.element()).addClass(CHAT_MESSAGEBOX_CLASS);

    super._initMarkup();

    this._renderTextArea();
    this._renderButton();
  }

  _renderTextArea(): void {
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
    } = this.option();

    const $textArea = $('<div>')
      .addClass(CHAT_MESSAGEBOX_TEXTAREA_CLASS)
      .appendTo(this.element());

    this._textArea = this._createComponent($textArea, TextArea, {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      stylingMode: 'outlined',
      placeholder: messageLocalization.format('dxChat-textareaPlaceholder'),
      autoResizeEnabled: true,
      valueChangeEvent: 'input',
      maxHeight: '8em',
      onInput: (): void => {
        this._onInputToggleButtonStateHandler();
        this._onInputTriggerTypingEventsHandler();
      },
      onEnterKey: (e: EnterKeyEvent): void => {
        if (!e.event?.shiftKey) {
          this._sendHandler(e);
        }
      },
    });

    this._textArea.registerKeyHandler('enter', (event: KeyboardEvent) => {
      if (!event.shiftKey && this._isValuableTextEntered()) {
        event.preventDefault();
      }
    });
  }

  _renderButton(): void {
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
    } = this.option();

    const $button = $('<div>')
      .addClass(CHAT_MESSAGEBOX_BUTTON_CLASS)
      .appendTo(this.element());

    this._button = this._createComponent($button, Button, {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      icon: 'sendfilled',
      type: 'default',
      stylingMode: 'text',
      disabled: true,
      elementAttr: { 'aria-label': messageLocalization.format('dxChat-sendButtonAriaLabel') },
      onClick: (e): void => {
        this._sendHandler(e);
      },
    });
  }

  _createMessageSendAction(): void {
    this._messageSendAction = this._createActionByOption(
      'onMessageSend',
      { excludeValidators: ['disabled', 'readOnly'] },
    );
  }

  _createTypingStartAction(): void {
    this._typingStartAction = this._createActionByOption(
      'onTypingStart',
      { excludeValidators: ['disabled', 'readOnly'] },
    );
  }

  _createTypingEndAction(): void {
    this._typingEndAction = this._createActionByOption(
      'onTypingEnd',
      { excludeValidators: ['disabled', 'readOnly'] },
    );
  }

  _onInputToggleButtonStateHandler(): void {
    const shouldButtonBeDisabled = !this._isValuableTextEntered();

    this._toggleButtonDisableState(shouldButtonBeDisabled);
  }

  _onInputTriggerTypingEventsHandler(): void {
    // eslint-disable-next-line spellcheck/spell-checker
    this._debouncedTriggerTypingStartEvent();
  }

  _triggerTypingStartEvent(): void {
    clearTimeout(this._typingStartEventTimeout);

    // eslint-disable-next-line no-restricted-globals
    this._typingStartEventTimeout = setTimeout(() => {
      this._triggerTypingEndEvent();
    }, TYPING_END_DELAY);

    this._typingStartAction?.();
  }

  _triggerTypingEndEvent(): void {
    this._typingEndAction?.();
  }

  _sendHandler(e: ClickEvent | EnterKeyEvent): void {
    if (!this._isValuableTextEntered()) {
      return;
    }

    const { text } = this._textArea.option();

    this._textArea.reset();
    this._toggleButtonDisableState(true);

    this._messageSendAction?.({ text, event: e.event });
  }

  _toggleButtonDisableState(state: boolean): void {
    this._button.option('disabled', state);
  }

  _isValuableTextEntered(): boolean {
    const { text } = this._textArea.option();

    return !!text?.trim();
  }

  _optionChanged(args: OptionChanged<Properties>): void {
    const { name, value } = args;

    switch (name) {
      case 'activeStateEnabled':
      case 'focusStateEnabled':
      case 'hoverStateEnabled': {
        this._button.option(name, value);
        this._textArea.option(name, value);

        break;
      }
      case 'onMessageSend':
        this._createMessageSendAction();
        break;
      case 'onTypingStart':
        this._createTypingStartAction();
        break;
      case 'onTypingEnd':
        this._createTypingEndAction();
        break;
      default:
        super._optionChanged(args);
    }
  }

  updateInputAria(emptyViewId: string | null): void {
    this._textArea.option({
      inputAttr: {
        'aria-labelledby': emptyViewId,
      },
    });
  }
}

export default MessageBox;
