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
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { CfgFormComponent } from './cfg-form/cfg-form.component';
import { ClassicComponent } from './styles/classic/classic.component';
import { MaterialComponent } from './styles/material/material.component';
import { MatFormFieldModule } from '@angular/material/form-field';

const components = [CfgFormComponent, ClassicComponent, MaterialComponent];

@NgModule({
    declarations: [...components],
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
    ],
    exports: [...components],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
        { provide: MAT_DATE_FORMATS,
          useValue: {
            parse: {
                dateInput: ['l', 'LL'],
            },
            display: {
                dateInput: 'L',
                monthYearLabel: 'MMM YYYY',
                dateA11yLabel: 'LL',
                monthYearA11yLabel: 'MMMM YYYY',
            },
          }
        },
    ]
})
export class CfgFormModule { }
