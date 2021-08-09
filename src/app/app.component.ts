import { CfgForm, TextInput, PasswordInput, FileInput, CheckboxInput, SelectInput, TextareaInput, NumberInput, DateInput, TimeInput, RadioInput, FORM_DEFAULT_STYLE, FormInputStyles } from './cfg-form/cfg-form.type';
import { Component, Inject } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

const Must12345: ValidatorFn = (v) => {
    if( v.value != "12345" && v.value != "123456" ) {
        return { "test12345": true };
    }

    return null;
}

const MustNot123456: ValidatorFn = (v) => {
    if( v.value == "123456" ) {
        return { "test123456": true };
    }

    return null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app-form';

    form: CfgForm = new CfgForm({
        cols: 4,
        colMinWidth: '200px',
        inputs: [
            new SelectInput({ name: 'style', label: 'FormStyle', cols: 1,
                disableReset: true,
                disableAutoScale: true,
                defaultValue: 'classic',
                validators: [Validators.required],
                hint: 'test hint',
                options: [
                    { value: 'classic', label: 'Classic' },
                    { value: 'float', label: 'Material' },
                    { value: 'fill', label: 'Material Fill' },
                    { value: 'outline', label: 'Material Outline' },
                    { value: 'mobile', label: 'Mobile' },
                ]
            }),
            new TextInput({
                name: 'name', label: 'User Name', cols: 4, hint: 'try 123456',
                validators: [ Validators.required, Must12345, MustNot123456 ],
                errorMessages:
                {
                    required: () => 'User Name 是一定要填寫的項目(This is custom error message)',
                    test123456: () => '不要給我123456這個值好嗎 😏' // custom validator
                },
            }),
            new TextInput({ name: 'account', label: 'User Account', cols: 2, validators: [ Validators.required ], hint: 'test-hint', }),
            new NumberInput({ name: 'age', label: 'User Age', defaultValue: 16, cols: 2, validators: [ Validators.required, Validators.min(10), Validators.max(30) ], hint: 'test-hint' }),
            new PasswordInput({ name: 'password', label: 'User Password', cols: 2, validators: [ Validators.required ], hint: 'test-hint', }),
            new DateInput({ name: 'birthday', label: 'User Birthday', cols: 1, min: new Date(), validators: [ Validators.required ], hint: 'test-hint', }),
            new TimeInput({ name: 'work_start_time', label: 'User Work Start Time', cols: 1, defaultValue: "01:22", validators: [ Validators.required ], hint: 'test-hint', }),
            new CheckboxInput({ name: 'role', label: 'Role', cols: 4,
                minWidth: '200px',
                validators: [ Validators.required ], hint: 'test-hint',
                options: [
                    { value: 'admin-user', label: 'Admin' },
                    { value: 'manager', label: 'Manager' },
                    { value: 'doc-manager', label: 'Document Manager' },
                    { value: 'worker', label: 'Worker' },
                    { value: 'it', label: 'IT' },
                ]
            }),
            new FileInput({ name: 'avatar', label: 'User Avatar', cols: 1, accept: '.png,.jpeg,.jpg', multiple: true, hint: 'Can select multiple file.', validators: [ Validators.required ] }),
            new SelectInput({ name: 'select', label: 'Select', cols: 1, hint: 'test hint',
                validators: [ Validators.required ],
                options: [
                    { value: 'admin-user', label: 'Admin' },
                    { value: 'manager', label: 'Manager' },
                    { value: 'doc-manager', label: 'Document Manager' },
                    { value: 'worker', label: 'Worker' },
                    { value: 'it', label: 'IT' },
                ]
            }),
            new RadioInput({ name: 'gender', label: 'User Gender', cols: 1, defaultValue: 0,
                minWidth: '50%',
                validators: [ Validators.required ], hint: 'test-hint',
                options: [
                    { value: 0, label: 'Woman' },
                    { value: 1, label: 'Man' },
                ]
            }),
            new TextareaInput({ name: 'description', label: 'User Description', cols: 4, validators: [ Validators.required ], hint: 'test-hint', }),
        ]
    });

    constructor(@Inject(FORM_DEFAULT_STYLE) private defaultStyle: FormInputStyles) {}

    ngOnInit()
    {
        this.form.style = this.defaultStyle;
        this.form.form.get('style')?.patchValue( this.defaultStyle );
        this.form.form.valueChanges.subscribe(() => {
            this.form.style = this.form.form.value.style;
        });
    }

}
