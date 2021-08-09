import { Inject, Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { FormErrorMessageRules, FORM_ERROR_MESSAGES } from '../cfg-form.type';

/**
 * Transform Validation Errors To Message
 */
@Pipe({ name: 'CfgFormErrorMessage' })
export class CfgFormErrorMessagePipe implements PipeTransform {

    constructor(@Inject(FORM_ERROR_MESSAGES) private messages: FormErrorMessageRules) {}

    transform(v: ValidationErrors | null | undefined, additional_messages?: FormErrorMessageRules): string {

        if
        (
              v &&
            (!this.messages || Object.keys(this.messages).length == 0) &&
            (!additional_messages || Object.keys(additional_messages).length == 0)
        )
        {
            return 'No error message provided : ' + Object.keys(v)[0];
        }

        if( v && Object.keys( v ).length )
        {

            let msg = '';

            // Common Error Messages
            for( const key of Object.keys( v ) )
            {
                // Additional Message (or override)
                if( additional_messages && additional_messages[key] )
                {
                    msg = additional_messages[key](v[key]);
                    break;
                }
                if( this.messages[key] )
                {
                    msg = this.messages[key](v[key]);
                    break;
                }
            }

            if( !msg )
            {
                console.log( v )
                msg = 'Unknown error ' + Object.keys( v )[0];
            }
            return msg;
        }

        return '';

    }

}
