import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  LOCALE_ID,
  OnInit,
  Renderer2
} from '@angular/core';
import { getLocaleNumberFormat, NumberFormatStyle } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[vtCurrencyInput]'
})
export class CurrencyInputDirective implements OnInit, AfterViewInit {

  constructor(el: ElementRef, renderer: Renderer2, private model: NgControl) {
    this.elementRef = el;
    // console.log(getLocaleNumberFormat(locale, NumberFormatStyle.Decimal));
  }

  private static currentLocale: string;

  private static thousandSeparator: RegExp;

  private elementRef: ElementRef;

  ngOnInit(): void {
    CurrencyInputDirective.thousandSeparator = /(\.)/g;
    CurrencyInputDirective.currentLocale = 'vi-VN';
  }

  @HostListener('submit', ['$event.target'])
  onSubmit(el) {
    console.log('formValue', el);
  }

  @HostListener('input', ['$event.target'])
  @HostListener('focusout', ['$event.target'])
  onInput(el) {
    const strWithNoComma = el.value.toString().replace(CurrencyInputDirective.thousandSeparator, '');
    const strDigitOnly = strWithNoComma.replace(/\D/g, '');

    let newValue;

    if (Number(strDigitOnly)) {
      newValue = Number(strDigitOnly).toLocaleString(CurrencyInputDirective.currentLocale);
    } else {
      newValue = strDigitOnly.replace(/\D/g, '');
    }

    this.model.control.setValue(Number(strDigitOnly));
    this.model.valueAccessor.writeValue(newValue);
  }

  ngAfterViewInit(): void {
  }

}
