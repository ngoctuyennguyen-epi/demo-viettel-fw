import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldModule } from './textfield/textfield.module';
import { TextFieldComponent } from './textfield/textfield.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [TextFieldComponent],
  imports: [
    CommonModule, TextFieldModule, PipesModule
  ],
  exports: [TextFieldComponent]
})
export class UiComponentsModule { }
