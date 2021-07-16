import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { CfgFormComponent } from './cfg-form/cfg-form.component';
import { ClassicComponent } from './styles/classic/classic.component';
import { MaterialComponent } from './styles/material/material.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FORM_DEFAULT_STYLE } from './cfg-form.type';
import { MobileComponent } from './styles/mobile/mobile.component';
import { CfgFormErrorMessagePipe } from './pipes/cfg-form-error-message.pipe';

const components = [CfgFormComponent, ClassicComponent, MaterialComponent, MobileComponent];
const pipes = [CfgFormErrorMessagePipe];

@NgModule({
    declarations: [...components, ...pipes],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatRippleModule,
    ],
    exports: [...components],
    providers: [
        { provide: FORM_DEFAULT_STYLE, useValue: 'classic' },
    ]
})
export class CfgFormModule { }
