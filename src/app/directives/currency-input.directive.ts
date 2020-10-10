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
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[vtCurrencyInput]'
})
export class CurrencyInputDirective implements OnInit, AfterViewInit {

  constructor(el: ElementRef, renderer: Renderer2, private model: NgModel,
              private translateService: TranslateService) {
    this.elementRef = el;
    // console.log(getLocaleNumberFormat(locale, NumberFormatStyle.Decimal));
  }

  private static currentLocale: string;

  private static thousandSeparator: RegExp;

  private elementRef: ElementRef;

  ngOnInit(): void {
    if (this.translateService.getDefaultLang() === 'vi') {
      CurrencyInputDirective.thousandSeparator = /(\.)/g;
      CurrencyInputDirective.currentLocale = 'vi-VN';
    } else {
      CurrencyInputDirective.thousandSeparator = /(,)/g;
      CurrencyInputDirective.currentLocale = 'en-US';
    }
  }

  @HostListener('submit', ['$event.target'])
  onSubmit(el) {
    console.log('formValue', el);
  }

  @HostListener('input', ['$event.target'])
  onInput(el) {
    const strWithNoComma = el.value.toString().replace(CurrencyInputDirective.thousandSeparator, '');
    const strDigitOnly = strWithNoComma.replace(/\D/g, '');
    if (Number(strDigitOnly)) {
      el.value = Number(strDigitOnly).toLocaleString(CurrencyInputDirective.currentLocale);
    } else {
      el.value = strDigitOnly.replace(/\D/g, '');
    }
    this.model.control.setValue(strDigitOnly);
    this.model.valueAccessor.writeValue(el.value);
  }

  ngAfterViewInit(): void {
  }

}
