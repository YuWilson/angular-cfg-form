import { CfgForm, TextInput, PasswordInput, FileInput, CheckboxInput, SelectInput, TextareaInput, NumberInput, DateInput, TimeInput, RadioInput } from './cfg-form/cfg-form.type';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app-form';

    form: CfgForm = new CfgForm({
        style: 'classic',
        cols: 4,
        colMinWidth: '200px',
        inputs: [
            new SelectInput({ name: 'style', label: 'FormStyle', cols: 1,
                disableReset: true,
                disableAutoScale: true,
                defaultValue: 'classic',
                options: [
                    { value: 'classic', label: 'Classic' },
                    { value: 'float', label: 'Material' },
                    { value: 'fill', label: 'Material Fill' },
                    { value: 'outline', label: 'Material Outline' },
                ]
            }),
            new TextInput({ name: 'name', label: 'User Name', cols: 4 }),
            new TextInput({ name: 'account', label: 'User Account', cols: 2 }),
            new NumberInput({ name: 'age', label: 'User Age', defaultValue: 16, cols: 2 }),
            new PasswordInput({ name: 'password', label: 'User Password', cols: 2 }),
            new DateInput({ name: 'birthday', label: 'User Birthday', cols: 1, min: new Date() }),
            new TimeInput({ name: 'work_start_time', label: 'User Work Start Time', cols: 1, defaultValue: "01:22" }),
            new CheckboxInput({ name: 'role', label: 'Role', cols: 4,
                minWidth: '200px',
                options: [
                    { value: 'admin-user', label: 'Admin' },
                    { value: 'manager', label: 'Manager' },
                    { value: 'doc-manager', label: 'Document Manager' },
                    { value: 'worker', label: 'Worker' },
                    { value: 'it', label: 'IT' },
                ]
            }),
            new FileInput({ name: 'avatar', label: 'User Avatar', cols: 1, accept: '.png,.jpeg,.jpg', multiple: true }),
            new SelectInput({ name: 'select', label: 'Select', cols: 1,
                options: [
                    { value: 'admin-user', label: 'Admin' },
                    { value: 'manager', label: 'Manager' },
                    { value: 'doc-manager', label: 'Document Manager' },
                    { value: 'worker', label: 'Worker' },
                    { value: 'it', label: 'IT' },
                ]
            }),
            new RadioInput({ name: 'sex', label: 'User Gender', cols: 1,
                minWidth: '50%',
                options: [
                    { value: 0, label: 'Woman' },
                    { value: 1, label: 'Man' },
                ]
            }),
            new TextareaInput({ name: 'description', label: 'User Description', cols: 4 }),
        ]
    });

    ngOnInit()
    {
        this.form.form.valueChanges.subscribe(() => {
            this.form.style = this.form.form.value.style;
        });
    }

    exampleCode = `
form: CfgForm = new CfgForm({
    style: 'classic',
    cols: 4,
    colMinWidth: '200px',
    inputs: [
        new SelectInput({ name: 'style', label: 'FormStyle', cols: 1,
            disableReset: true,
            disableAutoScale: true,
            defaultValue: 'classic',
            options: [
                { value: 'classic', label: 'Classic' },
                { value: 'float', label: 'Material' },
                { value: 'fill', label: 'Material Fill' },
                { value: 'outline', label: 'Material Outline' },
            ]
        }),
        new TextInput({ name: 'name', label: 'User Name', cols: 4 }),
        new TextInput({ name: 'account', label: 'User Account', cols: 2 }),
        new NumberInput({ name: 'age', label: 'User Age', defaultValue: 16, cols: 2 }),
        new PasswordInput({ name: 'password', label: 'User Password', cols: 2 }),
        new DateInput({ name: 'birthday', label: 'User Birthday', cols: 1 }),
        new TimeInput({ name: 'work_start_time', label: 'User Work Start Time', cols: 1, defaultValue: "01:22" }),
        new CheckboxInput({ name: 'role', label: 'Role', cols: 4,
            minWidth: '200px',
            options: [
                { value: 'admin-user', label: 'Admin' },
                { value: 'manager', label: 'Manager' },
                { value: 'doc-manager', label: 'Document Manager' },
                { value: 'worker', label: 'Worker' },
                { value: 'it', label: 'IT' },
            ]
        }),
        new FileInput({ name: 'avatar', label: 'User Avatar', cols: 1, accept: '.png,.jpeg,.jpg', multiple: true }),
        new SelectInput({ name: 'select', label: 'Select', cols: 1,
            options: [
                { value: 'admin-user', label: 'Admin' },
                { value: 'manager', label: 'Manager' },
                { value: 'doc-manager', label: 'Document Manager' },
                { value: 'worker', label: 'Worker' },
                { value: 'it', label: 'IT' },
            ]
        }),
        new RadioInput({ name: 'sex', label: 'User Gender', cols: 1,
            minWidth: '50%',
            options: [
                { value: 0, label: 'Woman' },
                { value: 1, label: 'Man' },
            ]
        }),
        new TextareaInput({ name: 'description', label: 'User Description', cols: 4 }),
    ]
});
    `

}
