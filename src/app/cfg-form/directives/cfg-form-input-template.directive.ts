import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';

@Directive({ selector: '[cfg-form-input]', host: { class: 'cfg-form-input' } })
export class CfgFormInputDefDirective
{
    constructor(public template: TemplateRef<any>) { }
}

@Directive({ selector: '[cfg-form-label]', host: { class: 'cfg-form-label' } })
export class CfgFormLabelDefDirective
{
    constructor(public template: TemplateRef<any>) { }
}

@Directive({ selector: '[cfg-form-error-label]', host: { class: 'cfg-form-error' } })
export class CfgFormErrorLabelDefDirective
{
    constructor(public template: TemplateRef<any>) { }
}

@Directive({ selector: '[cfg-form-hint-label]', host: { class: 'cfg-form-hint' } })
export class CfgFormHintLabelDefDirective
{
    constructor(public template: TemplateRef<any>) { }
}

/**
 * Define the form filed
 *
 * ex:
 *  <ng-container cfg-form-field="password">
 *      <div *cfg-form-input="let form" let-input="input">
 *          <input [formControl]="input" class="my-class" />
 *      </div>
 *
 *      <div *cfg-form-label="let form" let-config="config">
 *          <mat-icon>person</mat-icon> {{ config.label }}
 *      </div>
 *
 *      <div *cfg-form-label="let form" let-config="config" let-input="input">
 *          <span *ngIf="form.errors?.confirm_pwd"> Please confirm password </span>
 *          <span *ngIf="input.errors?.required"> This field is requred </span>
 *      </div>
 *  </ng-container>
 */
@Directive({ selector: '[cfg-form-field]' })
export class CfgFormFieldDefDirective {

    @Input('cfg-form-field')
    get formInputDef(): string { return this._name; }
    set formInputDef(name: string) { this._setNameInput(name); }

    get name() { return this._name; }
    protected _name: string = '';
    protected _setNameInput(value: string) {
        if (value) {
            this._name = value;
        }
    }

    @ContentChild(CfgFormInputDefDirective) inputDef!: CfgFormInputDefDirective;
    @ContentChild(CfgFormLabelDefDirective) labelDef!: CfgFormLabelDefDirective;
    @ContentChild(CfgFormErrorLabelDefDirective) errLabelDef!: CfgFormErrorLabelDefDirective;
    @ContentChild(CfgFormHintLabelDefDirective) hintLabelDef!: CfgFormHintLabelDefDirective;

}
