import { FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";

/**
 * Form Settings
 */
export type FormInputStyles =
    | 'classic'
    | 'float'
    | 'fill'
    | 'outline';

export class CfgForm {

    // Define input type
    style: FormInputStyles;

    // FormGroup validators.
    validators: Array<ValidatorFn>;

    // Inputs
    inputs: Array<FormInput>;

    // Form instance;
    form!: FormGroup;

    // File Store
    fileStore: {[key: string]: FileList | null} = {};

    cols: 1 | 2| 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

    colMinWidth?: string;

    constructor(config: {
        // Define input type - default is classic
        style?: FormInputStyles,

        // FormGroup validators.
        validators?: Array<ValidatorFn>,

        // The inputs of this form
        inputs: Array<FormInput>,

        cols?: 1 | 2| 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,

        colMinWidth?: string,
    })
    {
        this.style = config.style || 'classic';
        this.validators = config.validators || [];
        this.inputs = config.inputs;
        this.cols = config.cols || 1;
        this.colMinWidth = config.colMinWidth;

        this.initForm();
    }

    // Init form group
    initForm()
    {
        const form_controls: any = {};
        this.inputs.forEach((i, index) => {

            const fc = new FormControl(i.defaultValue != undefined ? i.defaultValue : '', i.validators ? i.validators : []);
            if( i.disabled != undefined || i.readonly != undefined ) {
                if( i.disabled != undefined && i.disabled || i.readonly != undefined && i.readonly ) {
                    fc.disable();
                }
            }
            form_controls[i.name] = fc;

            if( i.type == 'file' ) {
                this.fileStore[i.name] = null;
            }

            if( i.type == 'time' && i.defaultValue && typeof i.defaultValue != 'string' ) {
                let h: string = (''+(i.defaultValue.hour || 0)).padStart(2, '0');
                let m: string = (''+(i.defaultValue.minute || 0)).padStart(2, '0');

                fc.patchValue(`${h}:${m}`);
            }

        });

        this.form = new FormGroup(form_controls, this.validators);
    }

    getValue(): any
    {
        const value: any = this.form.value;
        this.inputs.forEach(i => {
            if( i.type == 'file' ) {
                value[i.name] = this.fileStore[i.name];
            }
        });

        return value;
    }

    // Lock form
    lock() { this.form.disable(); }

    // Unlock form
    unlock()
    {
        this.form.enable();
        this.updateInputDisabledState();
    }

    updateInputDisabledState()
    {
        this.inputs.forEach( i => {
            const ctrl = this.form.get(i.name);

            if( i.disabled ) { ctrl?.disable(); }
        });
    }

    setFile( name: string, files: FileList )
    {
        this.fileStore[name] = files;
    }

}


/**
 * Input Settings
 */
export type FormInput =
    | TextInput
    | TextareaInput
    | NumberInput
    | SelectInput
    | CheckboxInput
    | RadioInput
    | DateInput
    | TimeInput
    | FileInput
    | CustomInput;

export interface FormInputInterface extends
      TextInput
    , TextareaInput
    , NumberInput
    , SelectInput
    , CheckboxInput
    , RadioInput
    , DateInput
    , TimeInput
    , FileInput
    , CustomInput
{}


// Available input types
export type FormInputType =
    | 'text'
    | 'password'
    | 'textarea'
    | 'select'
    | 'number'
    | 'checkbox'
    | 'radio'
    | 'date'
    | 'time'
    | 'file'
    | 'custom';

// An default select option struct
export interface FormSelectOption {

    label: string;

    value: unknown;

    disabled?: boolean;

    hidden?: boolean;

}

interface BASE_OPTIONS {
    name: string,
    label: string,
    defaultValue?: unknown,
    validators?: Array<ValidatorFn>,
    hint?: string;
    readonly?: boolean,
    disabled?: boolean,
    cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
    disableAutoScale?: boolean,
}
// Input setting base class
export class BaseInput
{

    // Define input type
    type: FormInputType;

    // The name of the reactive form
    name: string;

    // The name of the html element
    label: string;

    // Reactive form control validators.
    validators: Array<ValidatorFn>;

    // Mark input is required
    required: boolean;

    // Default value of this input
    defaultValue: any;

    // Readonly
    readonly: boolean;

    // Disable
    disabled: boolean;

    // Hint
    hint: string;

    // Input Span Columns
    cols: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

    // Disable auto scale width
    disableAutoScale: boolean;

    constructor(type: FormInputType, config: {} & BASE_OPTIONS)
    {
        this.type = type;
        this.name = config.name;
        this.label = config.label;
        this.validators = config.validators || [];
        this.required = this.validators.indexOf( Validators.required ) >= 0;
        this.defaultValue = config.defaultValue || null;
        this.disabled = config.disabled || false;
        this.readonly = config.readonly || false;
        this.hint = config.hint || '';
        this.cols = config.cols || 1;
        this.disableAutoScale = config.disableAutoScale || false;
    }

}

// Text input
export class TextInput extends BaseInput
{
    constructor(config: {} & BASE_OPTIONS)
    {
        super('text', config);
    }
}

// Password input
export class PasswordInput extends BaseInput
{
    constructor(config: {} & BASE_OPTIONS)
    {
        super('password', config);
    }
}

// Textarea
export class TextareaInput extends BaseInput
{
    constructor(config: {} & BASE_OPTIONS)
    {
        super('textarea', config);
    }
}

// Number input
export class NumberInput extends BaseInput
{

    min?: number;

    max?: number;

    constructor(config: {
        min?: number,
        max?: number,
    } & BASE_OPTIONS)
    {
        super('number', config);

        this.min = config.min;
        this.max = config.max;
    }
}

// Dropdown input
export class SelectInput extends BaseInput
{

    // Disable reset
    disableReset?: boolean;

    // Selectable  options
    options?: Array<FormSelectOption>;

    // select multiple option
    multiple?: boolean;

    constructor(config: {
        options: Array<FormSelectOption>,
        multiple?: boolean,
        disableReset?: boolean,
    } & BASE_OPTIONS)
    {
        super('select', config);

        this.options = config.options;
        this.multiple = config.multiple || false;
        this.disableReset = config.disableReset || false;
    }

}

// Checkbox Input
export class CheckboxInput extends BaseInput
{

    // Selectable  options
    options?: Array<FormSelectOption>;

    // style min width
    minWidth?: string;

    constructor(config: {
        options: Array<FormSelectOption>,
        minWidth?: string,
    } & BASE_OPTIONS)
    {
        super('checkbox', config);

        this.options = config.options;
        this.minWidth = config.minWidth;
    }

}

// Radio Input
export class RadioInput extends BaseInput
{

    // Selectable  options
    options?: Array<FormSelectOption>;

    // style min width
    minWidth?: string;

    constructor(config: {
        options: Array<FormSelectOption>,
        minWidth?: string;
    } & BASE_OPTIONS)
    {
        super('radio', config);

        this.options = config.options;
        this.minWidth = config.minWidth;
    }

}

// Date Input
export class DateInput extends BaseInput
{

    // After this date can be selectable
    minDate?: Date;

    // Before this date can be selectable
    maxDate?: Date;

    constructor(config: {
        min?: Date,
        max?: Date,
    } & BASE_OPTIONS)
    {
        super('date', config);

        this.minDate = config.min;
        this.maxDate = config.max;
    }

}

// Time input available hour options.
export type TimeInputHourOptions = 0  | 1  | 2  | 3  | 4  | 5  | 6  | 7  | 8  | 9
                                 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
                                 | 20 | 21 | 22 | 23 ;

// Time input available minute options.
export type TimeInputMinuteOptions = 0  | 1  | 2  | 3  | 4  | 5  | 6  | 7  | 8  | 9
                                   | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
                                   | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29
                                   | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39
                                   | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49
                                   | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 ;

// Time input
export class TimeInput extends BaseInput
{

    minTime?: { hour: TimeInputHourOptions, minute: TimeInputMinuteOptions };

    maxTime?: { hour: TimeInputHourOptions, minute: TimeInputMinuteOptions };

    hourOptions?: Array<FormSelectOption> = [];

    minuteOptions?: Array<FormSelectOption> = [];

    constructor(config: {
        min?: { hour: TimeInputHourOptions, minute: TimeInputMinuteOptions },
        max?: { hour: TimeInputHourOptions, minute: TimeInputMinuteOptions },
    } & BASE_OPTIONS)
    {
        super('time', config);

        if( config.defaultValue && typeof config.defaultValue == 'string' ) {
            const [hour, minute] = config.defaultValue.split(':');
            this.defaultValue = {
                hour: parseInt(hour),
                minute: parseInt(minute),
            };
        }

        this.minTime = config.min;
        this.maxTime = config.max;

        // Gen options
        if( this.hourOptions && this.minuteOptions )
        {
            for( let i = 0 ; i < 24 ; i++ ) this.hourOptions.push({ value: i, label: (''+i).padStart(2, '0') });
            for( let i = 0 ; i < 60 ; i++ ) this.minuteOptions.push({ value: i, label: (''+i).padStart(2, '0') });
        }
    }

}

// File input
export class FileInput extends BaseInput
{

    // select multiple option
    multiple?: boolean;

    // Accept file filter
    accept?: string;

    constructor(config: {
        multiple?: boolean,
        accept?: string,
    } & BASE_OPTIONS)
    {
        super('file', config);

        this.multiple = config.multiple || false;
        this.accept = config.accept;
    }

}

// Input by custom templateRef
export class CustomInput extends BaseInput {
    constructor(config: {} & BASE_OPTIONS)
    {
        super('custom', config);
    }
}
