import {Directive, ElementRef, Input, OnInit} from '@angular/core';

declare var jQuery: any;

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[vt-textfield]'
})
export class TextFieldDirective implements OnInit {
    @Input() model: string;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        this.el.nativeElement.setAttribute('type', 'number');
    }

}
