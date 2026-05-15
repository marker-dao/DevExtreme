/* tslint:disable:max-line-length */


import {
    Component,
    OnInit,
    OnDestroy,
    NgModule,
    Host,
    SkipSelf,
    Input,
    Output,
    EventEmitter
} from '@angular/core';




import type { FileUploadMode } from 'devextreme/ui/file_uploader';

import {
    DxIntegrationModule,
    NestedOptionHost,
} from 'devextreme-angular/core';
import { NestedOption } from 'devextreme-angular/core';


@Component({
    selector: 'dxo-chat-file-uploader-options',
    template: '',
    styles: [''],
    imports: [ DxIntegrationModule ],
    providers: [NestedOptionHost]
})
export class DxoChatFileUploaderOptionsComponent extends NestedOption implements OnDestroy, OnInit  {
    @Input()
    get dialogTrigger(): any | string | undefined {
        return this._getOption('dialogTrigger');
    }
    set dialogTrigger(value: any | string | undefined) {
        this._setOption('dialogTrigger', value);
    }

    @Input()
    get showFileList(): boolean {
        return this._getOption('showFileList');
    }
    set showFileList(value: boolean) {
        this._setOption('showFileList', value);
    }

    @Input()
    get uploadMode(): FileUploadMode {
        return this._getOption('uploadMode');
    }
    set uploadMode(value: FileUploadMode) {
        this._setOption('uploadMode', value);
    }

    @Input()
    get value(): Array<any> {
        return this._getOption('value');
    }
    set value(value: Array<any>) {
        this._setOption('value', value);
    }


    /**
    
     * This member supports the internal infrastructure and is not intended to be used directly from your code.
    
     */
    @Output() valueChange: EventEmitter<Array<any>>;
    protected get _optionPath() {
        return 'fileUploaderOptions';
    }


    constructor(@SkipSelf() @Host() parentOptionHost: NestedOptionHost,
            @Host() optionHost: NestedOptionHost) {
        super();
        this._createEventEmitters([
            { emit: 'valueChange' }
        ]);

        parentOptionHost.setNestedOption(this);
        optionHost.setHost(this, this._fullOptionPath.bind(this));
    }


    ngOnInit() {
        this._addRecreatedComponent();
    }

    ngOnDestroy() {
        this._addRemovedOption(this._getOptionPath());
    }


}

@NgModule({
  imports: [
    DxoChatFileUploaderOptionsComponent
  ],
  exports: [
    DxoChatFileUploaderOptionsComponent
  ],
})
export class DxoChatFileUploaderOptionsModule { }
