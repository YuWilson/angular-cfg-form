import { Inject, Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { FormErrorMessageRules, FORM_ERROR_MESSAGES } from '../cfg-form.type';

/**
 * Transform Validation Errors To Message
 */
@Pipe({ name: 'CfgFormErrorMessage' })
export class CfgFormErrorMessagePipe implements PipeTransform {

    constructor(@Inject(FORM_ERROR_MESSAGES) private messages: FormErrorMessageRules) {}

    transform(v: ValidationErrors | null | undefined): string {

        if( !this.messages || Object.keys(this.messages).length == 0 )
        {
            return 'No error message provided';
        }

        if( v && Object.keys( v ).length )
        {
            let msg = '';
            for( const key of Object.keys( v ) )
            {
                if( this.messages[key] )
                {
                    msg = this.messages[key](v[key]);
                    break;
                }
            }
            if( !msg )
            {
                msg = 'Unknow error ' + Object.keys( v.errors )[0];
            }
            return msg;
        }

        return '';

    }

}
