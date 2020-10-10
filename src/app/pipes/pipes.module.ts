import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from './currenry.pipe';

@NgModule({
  declarations: [CurrencyPipe],
  imports: [
    CommonModule
  ],
  exports: [CurrencyPipe]
})
export class PipesModule { }
