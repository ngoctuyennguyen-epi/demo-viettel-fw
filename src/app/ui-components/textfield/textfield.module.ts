import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TextFieldDirective} from './textfield.directive';

@NgModule({
    declarations: [TextFieldDirective],
    imports: [
        CommonModule
    ],
    exports: [TextFieldDirective]
})
export class TextFieldModule {
}
