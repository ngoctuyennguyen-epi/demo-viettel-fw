import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberOnlyDirective } from './number-only.directive';
import { CurrencyInputDirective } from './currency-input.directive';

@NgModule({
  declarations: [NumberOnlyDirective, CurrencyInputDirective],
  exports: [
    NumberOnlyDirective,
    CurrencyInputDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
