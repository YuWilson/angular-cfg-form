import { CfgFormModule } from './cfg-form/cfg-form.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DEFAULT_FORM_ERROR_MESSAGES, FORM_DEFAULT_STYLE, FORM_ERROR_MESSAGES, FormErrorMessageRules } from './cfg-form/cfg-form.type';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        CfgFormModule,
        BrowserAnimationsModule,
    ],
    providers: [
        { provide: FORM_DEFAULT_STYLE, useValue: 'fill' },
        { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'YYYY.MM.DD',
                },
                display: {
                    dateInput: 'YYYY.MM.DD',
                    monthYearLabel: 'MMM YYYY',
                    dateA11yLabel: 'LL',
                    monthYearA11yLabel: 'MMMM YYYY'
                },
            }
        },
        {
            provide: FORM_ERROR_MESSAGES,
            useValue: {
                ...DEFAULT_FORM_ERROR_MESSAGES,
                test12345: () => '數值必須為12345'
            } as FormErrorMessageRules
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
