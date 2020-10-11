import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UiBase } from 'mobile-money';


export const VT_TEXTFIELD_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextFieldComponent),
    multi: true
};
const noop = () => {
};

@Component({
    selector: 'vt-input-upgrade',
    templateUrl: './textfield.component.html',
    styleUrls: ['./textfield.component.css'],
    providers: [VT_TEXTFIELD_CONTROL_VALUE_ACCESSOR]
})

export class TextFieldComponent extends UiBase implements OnInit, ControlValueAccessor {
    constructor(private renderer: Renderer2) {
        super();
    }

    get value() {
        return this._value;
        // return this.realValue;
        // return TextFieldComponent.convertFromCurrency(this._value);
    }

    set value(val) {
        // this._value = TextFieldComponent.convertToCurrency(val);
        // this.realValue = val;
        this._value = val;
        this.onChange(val);
        this.onTouched();
    }

    @Input() public isDisabled: any;
    // tslint:disable-next-line:no-output-on-prefix
    @Output() public onBlur = new EventEmitter<Event>();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() public onInput = new EventEmitter<Event>();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() public onKeyPress = new EventEmitter<Event>();
    // tslint:disable-next-line:no-output-native
    @Input() public placeholder = '';
    @Input() public maxlength = '100';
    @Input() public type: 'text' | 'number' | 'email' | 'password' = 'text';
    @Input() public turnOffAutoComplete: boolean;
    @Input() public readOnly: boolean;
    @ViewChild('inputReference', { static: false }) public inputRef;

    // tslint:disable-next-line:variable-name
    public _value: any = '';
    public realValue: any = '';


    private static convertToCurrency(value): string {
        const strWithNoComma = value.toString().replace(/(,|\.)/g, '');
        const strDigitOnly = strWithNoComma.replace(/\D/g, '');
        if (Number(strDigitOnly)) {
            return Number(strDigitOnly).toLocaleString();
        } else {
            return strDigitOnly.replace(/\D/g, '');
        }
    }

    private static convertFromCurrency(value): number {
        const strWithNoComma = value.toString().replace(/(,|\.)/g, '');
        return Number(strWithNoComma);
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    public writeValue(obj: any): void {
        this._value = obj;
    }

    public ngOnInit() {
    }

    public inputValue($event) {
        this.value = $event.target.value;
        this.onInput.emit($event);
    }

    public keyPress($event) {
        this.value = $event.target.value;
        this.onKeyPress.emit($event);
        this.onTouched();
    }

    public makeFocus() {
        this.inputRef.nativeElement.focus();
    }

    public onBlurFn($event) {
        this.value = $event.target.value.trim();
        this.onBlur.emit($event);
        this.onTouched();
    }

    public onChange: any = () => {};
    public onTouched: any = () => {};

    submit() {
        console.log('submit');
    }
}

