import { CfgFormModule } from './cfg-form/cfg-form.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_DEFAULT_STYLE } from './cfg-form/cfg-form.type';
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
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
