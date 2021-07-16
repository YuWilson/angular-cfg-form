import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { CfgFormFieldDefDirective } from '../../directives/cfg-form-input-template.directive';
import { CfgForm, FormInputInterface, FormSelectOption, FormInput } from '../../cfg-form.type';

@Component({
  selector: 'cfg-form-material-input',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

    @Input() appearance: MatFormFieldAppearance = 'standard';

    @Input() CfgForm!: CfgForm;

    @Input() form!: FormGroup;

    @Input() input!: FormControl | null;

    @Input('config') i!: FormInputInterface;

    @Input('template-def') templateDef!: CfgFormFieldDefDirective | null;

    TemplateVariables: any = {}

    private _checkbox_selected: Array<unknown> = [];

    private subscriptions: Subscription[] = [];

    constructor(private changeDet: ChangeDetectorRef) { }

    ngOnInit()
    {
        this.TemplateVariables = {
            $implicit: this.i,
            input: this.input,
            form: this.form,
        };
        if( this.input )
        {
            this.subscriptions.push( this.input.valueChanges.subscribe( () => this.changeDet.markForCheck() ) );
        }
    }

    handleCheckboxChange(value: unknown, e: MatCheckboxChange)
    {
        const selected = this._checkbox_selected.find( v => v == value );
        if( e.checked )
        {
            if( !selected )
            {
                this._checkbox_selected.push( value );
            }
        }
        else
        {
            if( selected )
            {
                this._checkbox_selected = this._checkbox_selected.filter( v => v != value );
            }
        }

        this.input?.markAsDirty();
        this.input?.markAsTouched();
        this.input?.patchValue( this._checkbox_selected );
    }

    isChecked(opt: FormSelectOption)
    {
        return this._checkbox_selected.indexOf( opt.value ) >= 0;
    }

    handleTimeChange(hour: number, minute: number)
    {
        this.input?.patchValue( (''+hour).padStart(2, '0') + ':' + (''+minute).padStart(2, '0') );
    }

    handleFileSelect(input: FormInput, files?: FileList | null)
    {
        if( !files )
        {
            files = new FileList();
        }
        this.CfgForm.setFile(input.name, files);

        let fname = files[0]?.name || '';
        if( files.length > 1 ) { fname += `(+${files.length - 1} items)`; }

        this.input?.markAsTouched();
        this.input?.markAsDirty();
        this.input?.patchValue(fname);
    }

    handleFilterOption(target: string)
    {
        target = target.toLowerCase();
        this.i.options?.forEach(opt => {
            if( target )
            {
                opt.hidden = !opt.label.toLowerCase().includes(target);
            }
            else
            {
                opt.hidden = false;
            }
        });
        this.changeDet.markForCheck();
    }

}
