import { PropType } from "vue";
import { defineComponent } from "vue";
import { prepareComponentConfig } from "./core/index";
import Chat, { Properties } from "devextreme/ui/chat";
import  DataSource from "devextreme/data/data_source";
import  dxChat from "devextreme/ui/chat";
import {
 TextBoxPropertiesWithoutMaxLength,
 Alert,
 Message,
 AttachmentDownloadClickEvent,
 DisposingEvent,
 InitializedEvent,
 InputFieldTextChangedEvent,
 MessageDeletedEvent,
 MessageDeletingEvent,
 MessageEditCanceledEvent,
 MessageEditingStartEvent,
 MessageEnteredEvent,
 MessageUpdatedEvent,
 MessageUpdatingEvent,
 OptionChangedEvent,
 TypingEndEvent,
 TypingStartEvent,
 SendButtonProperties,
 User,
 Attachment,
 SendButtonAction,
 SendButtonClickEvent,
} from "devextreme/ui/chat";
import {
 DataSourceOptions,
} from "devextreme/common/data";
import {
 Store,
} from "devextreme/data/store";
import {
 Format,
} from "devextreme/common/core/localization";
import {
 Format as CommonFormat,
 TextBoxPredefinedButton,
 TextEditorButton,
 LabelMode,
 MaskMode,
 EditorStyle,
 ValidationMessageMode,
 Position,
 ValidationStatus,
 TextEditorButtonLocation,
 ButtonType,
 ButtonStyle,
 SingleMultipleOrNone,
} from "devextreme/common";
import {
 dxSpeechToTextOptions,
 CustomSpeechRecognizer,
 ContentReadyEvent as SpeechToTextContentReadyEvent,
 DisposingEvent as SpeechToTextDisposingEvent,
 EndEvent,
 ErrorEvent,
 InitializedEvent as SpeechToTextInitializedEvent,
 OptionChangedEvent as SpeechToTextOptionChangedEvent,
 ResultEvent,
 StartClickEvent,
 StopClickEvent,
 SpeechRecognitionConfig,
} from "devextreme/ui/speech_to_text";
import {
 dxButtonGroupOptions,
 dxButtonGroupItem,
 ContentReadyEvent as ButtonGroupContentReadyEvent,
 DisposingEvent as ButtonGroupDisposingEvent,
 InitializedEvent as ButtonGroupInitializedEvent,
 ItemClickEvent,
 OptionChangedEvent as ButtonGroupOptionChangedEvent,
 SelectionChangedEvent,
} from "devextreme/ui/button_group";
import {
 TextBoxType,
 ChangeEvent,
 ContentReadyEvent,
 CopyEvent,
 CutEvent,
 DisposingEvent as TextBoxDisposingEvent,
 EnterKeyEvent,
 FocusInEvent,
 FocusOutEvent,
 InitializedEvent as TextBoxInitializedEvent,
 InputEvent,
 KeyDownEvent,
 KeyUpEvent,
 OptionChangedEvent as TextBoxOptionChangedEvent,
 PasteEvent,
 ValueChangedEvent,
} from "devextreme/ui/text_box";
import {
 dxButtonOptions,
 ClickEvent,
 ContentReadyEvent as ButtonContentReadyEvent,
 DisposingEvent as ButtonDisposingEvent,
 InitializedEvent as ButtonInitializedEvent,
 OptionChangedEvent as ButtonOptionChangedEvent,
} from "devextreme/ui/button";
import {
 FileUploadMode,
} from "devextreme/ui/file_uploader";
import { prepareConfigurationComponentConfig } from "./core/index";

type AccessibleOptions = Pick<Properties,
  "a1" |
  "accessKey" |
  "activeStateEnabled" |
  "alerts" |
  "dataSource" |
  "dayHeaderFormat" |
  "disabled" |
  "editing" |
  "elementAttr" |
  "emptyViewTemplate" |
  "fileUploaderOptions" |
  "focusStateEnabled" |
  "height" |
  "hint" |
  "hoverStateEnabled" |
  "inputFieldText" |
  "items" |
  "messageTemplate" |
  "messageTimestampFormat" |
  "onAttachmentDownloadClick" |
  "onDisposing" |
  "onInitialized" |
  "onInputFieldTextChanged" |
  "onMessageDeleted" |
  "onMessageDeleting" |
  "onMessageEditCanceled" |
  "onMessageEditingStart" |
  "onMessageEntered" |
  "onMessageUpdated" |
  "onMessageUpdating" |
  "onOptionChanged" |
  "onTypingEnd" |
  "onTypingStart" |
  "reloadOnChange" |
  "rtlEnabled" |
  "sendButtonOptions" |
  "showAvatar" |
  "showDayHeaders" |
  "showMessageTimestamp" |
  "showUserName" |
  "speechToTextEnabled" |
  "speechToTextOptions" |
  "suggestions" |
  "typingUsers" |
  "user" |
  "visible" |
  "width"
>;

interface DxChat extends AccessibleOptions {
  readonly instance?: Chat;
}

const componentConfig = {
  props: {
    a1: Object as PropType<TextBoxPropertiesWithoutMaxLength>,
    accessKey: String,
    activeStateEnabled: Boolean,
    alerts: Array as PropType<Array<Alert>>,
    dataSource: [Array, Object, String] as PropType<Array<Message> | DataSource | DataSourceOptions | null | Store | string | Record<string, any>>,
    dayHeaderFormat: [Object, String, Function] as PropType<Format | CommonFormat | (((value: number | Date) => string)) | Record<string, any> | string>,
    disabled: Boolean,
    editing: Object as PropType<Record<string, any>>,
    elementAttr: Object as PropType<Record<string, any>>,
    emptyViewTemplate: {},
    fileUploaderOptions: Object as PropType<Record<string, any>>,
    focusStateEnabled: Boolean,
    height: [Number, String],
    hint: String,
    hoverStateEnabled: Boolean,
    inputFieldText: String,
    items: Array as PropType<Array<Message>>,
    messageTemplate: {},
    messageTimestampFormat: [Object, String, Function] as PropType<Format | CommonFormat | (((value: number | Date) => string)) | Record<string, any> | string>,
    onAttachmentDownloadClick: Function as PropType<((e: AttachmentDownloadClickEvent) => void)>,
    onDisposing: Function as PropType<((e: DisposingEvent) => void)>,
    onInitialized: Function as PropType<((e: InitializedEvent) => void)>,
    onInputFieldTextChanged: Function as PropType<((e: InputFieldTextChangedEvent) => void)>,
    onMessageDeleted: Function as PropType<((e: MessageDeletedEvent) => void)>,
    onMessageDeleting: Function as PropType<((e: MessageDeletingEvent) => void)>,
    onMessageEditCanceled: Function as PropType<((e: MessageEditCanceledEvent) => void)>,
    onMessageEditingStart: Function as PropType<((e: MessageEditingStartEvent) => void)>,
    onMessageEntered: Function as PropType<((e: MessageEnteredEvent) => void)>,
    onMessageUpdated: Function as PropType<((e: MessageUpdatedEvent) => void)>,
    onMessageUpdating: Function as PropType<((e: MessageUpdatingEvent) => void)>,
    onOptionChanged: Function as PropType<((e: OptionChangedEvent) => void)>,
    onTypingEnd: Function as PropType<((e: TypingEndEvent) => void)>,
    onTypingStart: Function as PropType<((e: TypingStartEvent) => void)>,
    reloadOnChange: Boolean,
    rtlEnabled: Boolean,
    sendButtonOptions: Object as PropType<SendButtonProperties | Record<string, any>>,
    showAvatar: Boolean,
    showDayHeaders: Boolean,
    showMessageTimestamp: Boolean,
    showUserName: Boolean,
    speechToTextEnabled: Boolean,
    speechToTextOptions: Object as PropType<dxSpeechToTextOptions | Record<string, any>>,
    suggestions: Object as PropType<dxButtonGroupOptions | Record<string, any>>,
    typingUsers: Array as PropType<Array<User>>,
    user: Object as PropType<User | Record<string, any>>,
    visible: Boolean,
    width: [Number, String]
  },
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:a1": null,
    "update:accessKey": null,
    "update:activeStateEnabled": null,
    "update:alerts": null,
    "update:dataSource": null,
    "update:dayHeaderFormat": null,
    "update:disabled": null,
    "update:editing": null,
    "update:elementAttr": null,
    "update:emptyViewTemplate": null,
    "update:fileUploaderOptions": null,
    "update:focusStateEnabled": null,
    "update:height": null,
    "update:hint": null,
    "update:hoverStateEnabled": null,
    "update:inputFieldText": null,
    "update:items": null,
    "update:messageTemplate": null,
    "update:messageTimestampFormat": null,
    "update:onAttachmentDownloadClick": null,
    "update:onDisposing": null,
    "update:onInitialized": null,
    "update:onInputFieldTextChanged": null,
    "update:onMessageDeleted": null,
    "update:onMessageDeleting": null,
    "update:onMessageEditCanceled": null,
    "update:onMessageEditingStart": null,
    "update:onMessageEntered": null,
    "update:onMessageUpdated": null,
    "update:onMessageUpdating": null,
    "update:onOptionChanged": null,
    "update:onTypingEnd": null,
    "update:onTypingStart": null,
    "update:reloadOnChange": null,
    "update:rtlEnabled": null,
    "update:sendButtonOptions": null,
    "update:showAvatar": null,
    "update:showDayHeaders": null,
    "update:showMessageTimestamp": null,
    "update:showUserName": null,
    "update:speechToTextEnabled": null,
    "update:speechToTextOptions": null,
    "update:suggestions": null,
    "update:typingUsers": null,
    "update:user": null,
    "update:visible": null,
    "update:width": null,
  },
  computed: {
    instance(): Chat {
      return (this as any).$_instance;
    }
  },
  beforeCreate() {
    (this as any).$_WidgetClass = Chat;
    (this as any).$_hasAsyncTemplate = true;
    (this as any).$_expectedChildren = {
      a1: { isCollectionItem: false, optionName: "a1" },
      alert: { isCollectionItem: true, optionName: "alerts" },
      chatItem: { isCollectionItem: true, optionName: "items" },
      dayHeaderFormat: { isCollectionItem: false, optionName: "dayHeaderFormat" },
      editing: { isCollectionItem: false, optionName: "editing" },
      fileUploaderOptions: { isCollectionItem: false, optionName: "fileUploaderOptions" },
      item: { isCollectionItem: true, optionName: "items" },
      messageTimestampFormat: { isCollectionItem: false, optionName: "messageTimestampFormat" },
      sendButtonOptions: { isCollectionItem: false, optionName: "sendButtonOptions" },
      speechToTextOptions: { isCollectionItem: false, optionName: "speechToTextOptions" },
      suggestions: { isCollectionItem: false, optionName: "suggestions" },
      typingUser: { isCollectionItem: true, optionName: "typingUsers" },
      user: { isCollectionItem: false, optionName: "user" }
    };
  }
};

prepareComponentConfig(componentConfig);

const DxChat = defineComponent(componentConfig);


const DxA1Config = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:accessKey": null,
    "update:activeStateEnabled": null,
    "update:buttons": null,
    "update:disabled": null,
    "update:elementAttr": null,
    "update:focusStateEnabled": null,
    "update:height": null,
    "update:hint": null,
    "update:hoverStateEnabled": null,
    "update:inputAttr": null,
    "update:isDirty": null,
    "update:isValid": null,
    "update:label": null,
    "update:labelMode": null,
    "update:mask": null,
    "update:maskChar": null,
    "update:maskInvalidMessage": null,
    "update:maskRules": null,
    "update:mode": null,
    "update:name": null,
    "update:onChange": null,
    "update:onContentReady": null,
    "update:onCopy": null,
    "update:onCut": null,
    "update:onDisposing": null,
    "update:onEnterKey": null,
    "update:onFocusIn": null,
    "update:onFocusOut": null,
    "update:onInitialized": null,
    "update:onInput": null,
    "update:onKeyDown": null,
    "update:onKeyUp": null,
    "update:onOptionChanged": null,
    "update:onPaste": null,
    "update:onValueChanged": null,
    "update:placeholder": null,
    "update:readOnly": null,
    "update:rtlEnabled": null,
    "update:showClearButton": null,
    "update:showMaskMode": null,
    "update:spellcheck": null,
    "update:stylingMode": null,
    "update:tabIndex": null,
    "update:text": null,
    "update:useMaskedValue": null,
    "update:validationError": null,
    "update:validationErrors": null,
    "update:validationMessageMode": null,
    "update:validationMessagePosition": null,
    "update:validationStatus": null,
    "update:value": null,
    "update:valueChangeEvent": null,
    "update:visible": null,
    "update:width": null,
  },
  props: {
    accessKey: String,
    activeStateEnabled: Boolean,
    buttons: Array as PropType<Array<string | TextBoxPredefinedButton | TextEditorButton>>,
    disabled: Boolean,
    elementAttr: Object as PropType<Record<string, any>>,
    focusStateEnabled: Boolean,
    height: [Number, String],
    hint: String,
    hoverStateEnabled: Boolean,
    inputAttr: {},
    isDirty: Boolean,
    isValid: Boolean,
    label: String,
    labelMode: String as PropType<LabelMode>,
    mask: String,
    maskChar: String,
    maskInvalidMessage: String,
    maskRules: {},
    mode: String as PropType<TextBoxType>,
    name: String,
    onChange: Function as PropType<((e: ChangeEvent) => void)>,
    onContentReady: Function as PropType<((e: ContentReadyEvent) => void)>,
    onCopy: Function as PropType<((e: CopyEvent) => void)>,
    onCut: Function as PropType<((e: CutEvent) => void)>,
    onDisposing: Function as PropType<((e: TextBoxDisposingEvent) => void)>,
    onEnterKey: Function as PropType<((e: EnterKeyEvent) => void)>,
    onFocusIn: Function as PropType<((e: FocusInEvent) => void)>,
    onFocusOut: Function as PropType<((e: FocusOutEvent) => void)>,
    onInitialized: Function as PropType<((e: TextBoxInitializedEvent) => void)>,
    onInput: Function as PropType<((e: InputEvent) => void)>,
    onKeyDown: Function as PropType<((e: KeyDownEvent) => void)>,
    onKeyUp: Function as PropType<((e: KeyUpEvent) => void)>,
    onOptionChanged: Function as PropType<((e: TextBoxOptionChangedEvent) => void)>,
    onPaste: Function as PropType<((e: PasteEvent) => void)>,
    onValueChanged: Function as PropType<((e: ValueChangedEvent) => void)>,
    placeholder: String,
    readOnly: Boolean,
    rtlEnabled: Boolean,
    showClearButton: Boolean,
    showMaskMode: String as PropType<MaskMode>,
    spellcheck: Boolean,
    stylingMode: String as PropType<EditorStyle>,
    tabIndex: Number,
    text: String,
    useMaskedValue: Boolean,
    validationError: {},
    validationErrors: Array as PropType<Array<any>>,
    validationMessageMode: String as PropType<ValidationMessageMode>,
    validationMessagePosition: String as PropType<Position>,
    validationStatus: String as PropType<ValidationStatus>,
    value: String,
    valueChangeEvent: String,
    visible: Boolean,
    width: [Number, String]
  }
};

prepareConfigurationComponentConfig(DxA1Config);

const DxA1 = defineComponent(DxA1Config);

(DxA1 as any).$_optionName = "a1";
(DxA1 as any).$_expectedChildren = {
  button: { isCollectionItem: true, optionName: "buttons" }
};

const DxAlertConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:id": null,
    "update:message": null,
  },
  props: {
    id: [Number, String],
    message: String
  }
};

prepareConfigurationComponentConfig(DxAlertConfig);

const DxAlert = defineComponent(DxAlertConfig);

(DxAlert as any).$_optionName = "alerts";
(DxAlert as any).$_isCollectionItem = true;

const DxAttachmentConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:name": null,
    "update:size": null,
  },
  props: {
    name: String,
    size: Number
  }
};

prepareConfigurationComponentConfig(DxAttachmentConfig);

const DxAttachment = defineComponent(DxAttachmentConfig);

(DxAttachment as any).$_optionName = "attachments";
(DxAttachment as any).$_isCollectionItem = true;

const DxAuthorConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:avatarAlt": null,
    "update:avatarUrl": null,
    "update:id": null,
    "update:name": null,
  },
  props: {
    avatarAlt: String,
    avatarUrl: String,
    id: [Number, String],
    name: String
  }
};

prepareConfigurationComponentConfig(DxAuthorConfig);

const DxAuthor = defineComponent(DxAuthorConfig);

(DxAuthor as any).$_optionName = "author";

const DxButtonConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:location": null,
    "update:name": null,
    "update:options": null,
  },
  props: {
    location: String as PropType<TextEditorButtonLocation>,
    name: String,
    options: Object as PropType<dxButtonOptions | Record<string, any>>
  }
};

prepareConfigurationComponentConfig(DxButtonConfig);

const DxButton = defineComponent(DxButtonConfig);

(DxButton as any).$_optionName = "buttons";
(DxButton as any).$_isCollectionItem = true;
(DxButton as any).$_expectedChildren = {
  options: { isCollectionItem: false, optionName: "options" }
};

const DxChatItemConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:alt": null,
    "update:attachments": null,
    "update:author": null,
    "update:id": null,
    "update:isDeleted": null,
    "update:isEdited": null,
    "update:src": null,
    "update:text": null,
    "update:timestamp": null,
    "update:type": null,
  },
  props: {
    alt: String,
    attachments: Array as PropType<Array<Attachment>>,
    author: Object as PropType<User | Record<string, any>>,
    id: [Number, String],
    isDeleted: Boolean,
    isEdited: Boolean,
    src: String,
    text: String,
    timestamp: [Date, Number, String],
    type: String
  }
};

prepareConfigurationComponentConfig(DxChatItemConfig);

const DxChatItem = defineComponent(DxChatItemConfig);

(DxChatItem as any).$_optionName = "items";
(DxChatItem as any).$_isCollectionItem = true;
(DxChatItem as any).$_expectedChildren = {
  attachment: { isCollectionItem: true, optionName: "attachments" },
  author: { isCollectionItem: false, optionName: "author" }
};

const DxCustomSpeechRecognizerConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:enabled": null,
    "update:isListening": null,
  },
  props: {
    enabled: Boolean,
    isListening: Boolean
  }
};

prepareConfigurationComponentConfig(DxCustomSpeechRecognizerConfig);

const DxCustomSpeechRecognizer = defineComponent(DxCustomSpeechRecognizerConfig);

(DxCustomSpeechRecognizer as any).$_optionName = "customSpeechRecognizer";

const DxDayHeaderFormatConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:currency": null,
    "update:formatter": null,
    "update:parser": null,
    "update:precision": null,
    "update:type": null,
    "update:useCurrencyAccountingStyle": null,
  },
  props: {
    currency: String,
    formatter: Function as PropType<((value: number | Date) => string)>,
    parser: Function as PropType<((value: string) => number | Date)>,
    precision: Number,
    type: String as PropType<CommonFormat | string>,
    useCurrencyAccountingStyle: Boolean
  }
};

prepareConfigurationComponentConfig(DxDayHeaderFormatConfig);

const DxDayHeaderFormat = defineComponent(DxDayHeaderFormatConfig);

(DxDayHeaderFormat as any).$_optionName = "dayHeaderFormat";

const DxEditingConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:allowDeleting": null,
    "update:allowUpdating": null,
  },
  props: {
    allowDeleting: [Boolean, Function] as PropType<boolean | (((options: { component: dxChat, message: Message }) => boolean))>,
    allowUpdating: [Boolean, Function] as PropType<boolean | (((options: { component: dxChat, message: Message }) => boolean))>
  }
};

prepareConfigurationComponentConfig(DxEditingConfig);

const DxEditing = defineComponent(DxEditingConfig);

(DxEditing as any).$_optionName = "editing";

const DxFileUploaderOptionsConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:dialogTrigger": null,
    "update:showFileList": null,
    "update:uploadMode": null,
    "update:value": null,
  },
  props: {
    dialogTrigger: {},
    showFileList: Boolean,
    uploadMode: String as PropType<FileUploadMode>,
    value: Array as PropType<Array<any>>
  }
};

prepareConfigurationComponentConfig(DxFileUploaderOptionsConfig);

const DxFileUploaderOptions = defineComponent(DxFileUploaderOptionsConfig);

(DxFileUploaderOptions as any).$_optionName = "fileUploaderOptions";

const DxItemConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:alt": null,
    "update:attachments": null,
    "update:author": null,
    "update:disabled": null,
    "update:elementAttr": null,
    "update:hint": null,
    "update:icon": null,
    "update:id": null,
    "update:isDeleted": null,
    "update:isEdited": null,
    "update:src": null,
    "update:template": null,
    "update:text": null,
    "update:timestamp": null,
    "update:type": null,
    "update:visible": null,
  },
  props: {
    alt: String,
    attachments: Array as PropType<Array<Attachment>>,
    author: Object as PropType<User | Record<string, any>>,
    disabled: Boolean,
    elementAttr: Object as PropType<Record<string, any>>,
    hint: String,
    icon: String,
    id: [Number, String],
    isDeleted: Boolean,
    isEdited: Boolean,
    src: String,
    template: {},
    text: String,
    timestamp: [Date, Number, String],
    type: String as PropType<string | ButtonType>,
    visible: Boolean
  }
};

prepareConfigurationComponentConfig(DxItemConfig);

const DxItem = defineComponent(DxItemConfig);

(DxItem as any).$_optionName = "items";
(DxItem as any).$_isCollectionItem = true;
(DxItem as any).$_expectedChildren = {
  attachment: { isCollectionItem: true, optionName: "attachments" },
  author: { isCollectionItem: false, optionName: "author" }
};

const DxMessageTimestampFormatConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:currency": null,
    "update:formatter": null,
    "update:parser": null,
    "update:precision": null,
    "update:type": null,
    "update:useCurrencyAccountingStyle": null,
  },
  props: {
    currency: String,
    formatter: Function as PropType<((value: number | Date) => string)>,
    parser: Function as PropType<((value: string) => number | Date)>,
    precision: Number,
    type: String as PropType<CommonFormat | string>,
    useCurrencyAccountingStyle: Boolean
  }
};

prepareConfigurationComponentConfig(DxMessageTimestampFormatConfig);

const DxMessageTimestampFormat = defineComponent(DxMessageTimestampFormatConfig);

(DxMessageTimestampFormat as any).$_optionName = "messageTimestampFormat";

const DxOptionsConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:accessKey": null,
    "update:activeStateEnabled": null,
    "update:disabled": null,
    "update:elementAttr": null,
    "update:focusStateEnabled": null,
    "update:height": null,
    "update:hint": null,
    "update:hoverStateEnabled": null,
    "update:icon": null,
    "update:onClick": null,
    "update:onContentReady": null,
    "update:onDisposing": null,
    "update:onInitialized": null,
    "update:onOptionChanged": null,
    "update:rtlEnabled": null,
    "update:stylingMode": null,
    "update:tabIndex": null,
    "update:template": null,
    "update:text": null,
    "update:type": null,
    "update:useSubmitBehavior": null,
    "update:validationGroup": null,
    "update:visible": null,
    "update:width": null,
  },
  props: {
    accessKey: String,
    activeStateEnabled: Boolean,
    disabled: Boolean,
    elementAttr: Object as PropType<Record<string, any>>,
    focusStateEnabled: Boolean,
    height: [Number, String],
    hint: String,
    hoverStateEnabled: Boolean,
    icon: String,
    onClick: Function as PropType<((e: ClickEvent) => void)>,
    onContentReady: Function as PropType<((e: ButtonContentReadyEvent) => void)>,
    onDisposing: Function as PropType<((e: ButtonDisposingEvent) => void)>,
    onInitialized: Function as PropType<((e: ButtonInitializedEvent) => void)>,
    onOptionChanged: Function as PropType<((e: ButtonOptionChangedEvent) => void)>,
    rtlEnabled: Boolean,
    stylingMode: String as PropType<ButtonStyle>,
    tabIndex: Number,
    template: {},
    text: String,
    type: String as PropType<ButtonType | string>,
    useSubmitBehavior: Boolean,
    validationGroup: String,
    visible: Boolean,
    width: [Number, String]
  }
};

prepareConfigurationComponentConfig(DxOptionsConfig);

const DxOptions = defineComponent(DxOptionsConfig);

(DxOptions as any).$_optionName = "options";

const DxSendButtonOptionsConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:action": null,
    "update:icon": null,
    "update:onClick": null,
  },
  props: {
    action: String as PropType<SendButtonAction>,
    icon: String,
    onClick: Function as PropType<((e: SendButtonClickEvent) => void)>
  }
};

prepareConfigurationComponentConfig(DxSendButtonOptionsConfig);

const DxSendButtonOptions = defineComponent(DxSendButtonOptionsConfig);

(DxSendButtonOptions as any).$_optionName = "sendButtonOptions";

const DxSpeechRecognitionConfigConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:continuous": null,
    "update:grammars": null,
    "update:interimResults": null,
    "update:lang": null,
    "update:maxAlternatives": null,
  },
  props: {
    continuous: Boolean,
    grammars: Array as PropType<Array<string>>,
    interimResults: Boolean,
    lang: String,
    maxAlternatives: Number
  }
};

prepareConfigurationComponentConfig(DxSpeechRecognitionConfigConfig);

const DxSpeechRecognitionConfig = defineComponent(DxSpeechRecognitionConfigConfig);

(DxSpeechRecognitionConfig as any).$_optionName = "speechRecognitionConfig";

const DxSpeechToTextOptionsConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:accessKey": null,
    "update:activeStateEnabled": null,
    "update:customSpeechRecognizer": null,
    "update:disabled": null,
    "update:elementAttr": null,
    "update:focusStateEnabled": null,
    "update:height": null,
    "update:hint": null,
    "update:hoverStateEnabled": null,
    "update:onContentReady": null,
    "update:onDisposing": null,
    "update:onEnd": null,
    "update:onError": null,
    "update:onInitialized": null,
    "update:onOptionChanged": null,
    "update:onResult": null,
    "update:onStartClick": null,
    "update:onStopClick": null,
    "update:rtlEnabled": null,
    "update:speechRecognitionConfig": null,
    "update:startIcon": null,
    "update:startText": null,
    "update:stopIcon": null,
    "update:stopText": null,
    "update:stylingMode": null,
    "update:tabIndex": null,
    "update:type": null,
    "update:visible": null,
    "update:width": null,
  },
  props: {
    accessKey: String,
    activeStateEnabled: Boolean,
    customSpeechRecognizer: Object as PropType<CustomSpeechRecognizer | Record<string, any>>,
    disabled: Boolean,
    elementAttr: Object as PropType<Record<string, any>>,
    focusStateEnabled: Boolean,
    height: [Number, String],
    hint: String,
    hoverStateEnabled: Boolean,
    onContentReady: Function as PropType<((e: SpeechToTextContentReadyEvent) => void)>,
    onDisposing: Function as PropType<((e: SpeechToTextDisposingEvent) => void)>,
    onEnd: Function as PropType<((e: EndEvent) => void)>,
    onError: Function as PropType<((e: ErrorEvent) => void)>,
    onInitialized: Function as PropType<((e: SpeechToTextInitializedEvent) => void)>,
    onOptionChanged: Function as PropType<((e: SpeechToTextOptionChangedEvent) => void)>,
    onResult: Function as PropType<((e: ResultEvent) => void)>,
    onStartClick: Function as PropType<((e: StartClickEvent) => void)>,
    onStopClick: Function as PropType<((e: StopClickEvent) => void)>,
    rtlEnabled: Boolean,
    speechRecognitionConfig: Object as PropType<Record<string, any> | SpeechRecognitionConfig>,
    startIcon: String,
    startText: String,
    stopIcon: String,
    stopText: String,
    stylingMode: String as PropType<ButtonStyle>,
    tabIndex: Number,
    type: String as PropType<ButtonType | string>,
    visible: Boolean,
    width: [Number, String]
  }
};

prepareConfigurationComponentConfig(DxSpeechToTextOptionsConfig);

const DxSpeechToTextOptions = defineComponent(DxSpeechToTextOptionsConfig);

(DxSpeechToTextOptions as any).$_optionName = "speechToTextOptions";
(DxSpeechToTextOptions as any).$_expectedChildren = {
  customSpeechRecognizer: { isCollectionItem: false, optionName: "customSpeechRecognizer" },
  speechRecognitionConfig: { isCollectionItem: false, optionName: "speechRecognitionConfig" }
};

const DxSuggestionsConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:accessKey": null,
    "update:activeStateEnabled": null,
    "update:buttonTemplate": null,
    "update:disabled": null,
    "update:elementAttr": null,
    "update:focusStateEnabled": null,
    "update:height": null,
    "update:hint": null,
    "update:hoverStateEnabled": null,
    "update:items": null,
    "update:keyExpr": null,
    "update:onContentReady": null,
    "update:onDisposing": null,
    "update:onInitialized": null,
    "update:onItemClick": null,
    "update:onOptionChanged": null,
    "update:onSelectionChanged": null,
    "update:rtlEnabled": null,
    "update:selectedItemKeys": null,
    "update:selectedItems": null,
    "update:selectionMode": null,
    "update:stylingMode": null,
    "update:tabIndex": null,
    "update:visible": null,
    "update:width": null,
  },
  props: {
    accessKey: String,
    activeStateEnabled: Boolean,
    buttonTemplate: {},
    disabled: Boolean,
    elementAttr: Object as PropType<Record<string, any>>,
    focusStateEnabled: Boolean,
    height: [Number, String],
    hint: String,
    hoverStateEnabled: Boolean,
    items: Array as PropType<Array<dxButtonGroupItem>>,
    keyExpr: [Function, String] as PropType<(((item: any) => any)) | string>,
    onContentReady: Function as PropType<((e: ButtonGroupContentReadyEvent) => void)>,
    onDisposing: Function as PropType<((e: ButtonGroupDisposingEvent) => void)>,
    onInitialized: Function as PropType<((e: ButtonGroupInitializedEvent) => void)>,
    onItemClick: Function as PropType<((e: ItemClickEvent) => void)>,
    onOptionChanged: Function as PropType<((e: ButtonGroupOptionChangedEvent) => void)>,
    onSelectionChanged: Function as PropType<((e: SelectionChangedEvent) => void)>,
    rtlEnabled: Boolean,
    selectedItemKeys: Array as PropType<Array<any>>,
    selectedItems: Array as PropType<Array<any>>,
    selectionMode: String as PropType<SingleMultipleOrNone>,
    stylingMode: String as PropType<ButtonStyle>,
    tabIndex: Number,
    visible: Boolean,
    width: [Number, String]
  }
};

prepareConfigurationComponentConfig(DxSuggestionsConfig);

const DxSuggestions = defineComponent(DxSuggestionsConfig);

(DxSuggestions as any).$_optionName = "suggestions";
(DxSuggestions as any).$_expectedChildren = {
  item: { isCollectionItem: true, optionName: "items" },
  suggestionsItem: { isCollectionItem: true, optionName: "items" }
};

const DxSuggestionsItemConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:disabled": null,
    "update:elementAttr": null,
    "update:hint": null,
    "update:icon": null,
    "update:template": null,
    "update:text": null,
    "update:type": null,
    "update:visible": null,
  },
  props: {
    disabled: Boolean,
    elementAttr: Object as PropType<Record<string, any>>,
    hint: String,
    icon: String,
    template: {},
    text: String,
    type: String as PropType<ButtonType | string>,
    visible: Boolean
  }
};

prepareConfigurationComponentConfig(DxSuggestionsItemConfig);

const DxSuggestionsItem = defineComponent(DxSuggestionsItemConfig);

(DxSuggestionsItem as any).$_optionName = "items";
(DxSuggestionsItem as any).$_isCollectionItem = true;

const DxTypingUserConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:avatarAlt": null,
    "update:avatarUrl": null,
    "update:id": null,
    "update:name": null,
  },
  props: {
    avatarAlt: String,
    avatarUrl: String,
    id: [Number, String],
    name: String
  }
};

prepareConfigurationComponentConfig(DxTypingUserConfig);

const DxTypingUser = defineComponent(DxTypingUserConfig);

(DxTypingUser as any).$_optionName = "typingUsers";
(DxTypingUser as any).$_isCollectionItem = true;

const DxUserConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:avatarAlt": null,
    "update:avatarUrl": null,
    "update:id": null,
    "update:name": null,
  },
  props: {
    avatarAlt: String,
    avatarUrl: String,
    id: [Number, String],
    name: String
  }
};

prepareConfigurationComponentConfig(DxUserConfig);

const DxUser = defineComponent(DxUserConfig);

(DxUser as any).$_optionName = "user";

export default DxChat;
export {
  DxChat,
  DxA1,
  DxAlert,
  DxAttachment,
  DxAuthor,
  DxButton,
  DxChatItem,
  DxCustomSpeechRecognizer,
  DxDayHeaderFormat,
  DxEditing,
  DxFileUploaderOptions,
  DxItem,
  DxMessageTimestampFormat,
  DxOptions,
  DxSendButtonOptions,
  DxSpeechRecognitionConfig,
  DxSpeechToTextOptions,
  DxSuggestions,
  DxSuggestionsItem,
  DxTypingUser,
  DxUser
};
import type * as DxChatTypes from "devextreme/ui/chat_types";
export { DxChatTypes };
