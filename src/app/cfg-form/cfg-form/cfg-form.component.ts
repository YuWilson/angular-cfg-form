import { FormControl } from '@angular/forms';
import { CfgFormFieldDefDirective } from '../directives/cfg-form-input-template.directive';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit, TemplateRef, ViewChildren } from '@angular/core';
import { CfgForm, FormInput } from '../cfg-form.type';
import { QueryList } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'cfg-form, [cfg-form]',
    templateUrl: './cfg-form.component.html',
    styleUrls: ['./cfg-form.component.scss'],
    host: {
        'class': 'cfg-form'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CfgFormComponent implements OnInit {

    @Input('CfgForm') CfgForm!: CfgForm;

    @ViewChildren(CfgFormFieldDefDirective) fieldDefs!: QueryList<CfgFormFieldDefDirective>;

    @HostBinding('style') get getStyle() {
        return {
            '--cfg-form-cols': this.CfgForm.cols,
        }
    }

    private subscriptions: Subscription[] = [];

    constructor(
        private changeDet: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        this.subscriptions.push(
            this.CfgForm.form.valueChanges.subscribe(() => this.changeDet.markForCheck())
        );
    }

    ngOnDestroy()
    {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Get field def
    getFieldDef(field: string): CfgFormFieldDefDirective | null
    {
        if( !(this.fieldDefs instanceof QueryList) ){ return null;}
        return this.fieldDefs.find( c => c.name == field ) || null;
    }

    // Get inpu template by field name
    getInputTemplate(field: string): TemplateRef<any> | null
    {
        const def = this.getFieldDef(field);
        if ( !def || !def.inputDef ) return null;

        return def.inputDef.template;
    }

    // Get inpu template by field name
    getHintTemplate(field: string): TemplateRef<any> | null
    {
        const def = this.getFieldDef(field);
        if ( !def || !def.hintLabelDef ) return null;

        return def.hintLabelDef.template;
    }

    // Get inpu template by field name
    getLabelTemplate(field: string): TemplateRef<any> | null
    {
        const def = this.getFieldDef(field);
        if ( !def || !def.labelDef ) return null;

        return def.labelDef.template;
    }

    // Get inpu template by field name
    getErrorLabelTemplate(field: string): TemplateRef<any> | null
    {
        const def = this.getFieldDef(field);
        if ( !def || !def.errLabelDef ) return null;

        return def.errLabelDef.template;
    }

    getFormControl(i: FormInput): FormControl | null
    {
        const input = this.CfgForm.form.get( i.name );

        if( input ) return input as FormControl;

        return null;
    }

    getCol(i: FormInput)
    {
        return Math.ceil(Math.min(this.CfgForm.cols, i.cols) / this.CfgForm.cols  * 12);
    }

}
