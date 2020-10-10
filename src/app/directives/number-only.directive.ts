import { Directive, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[vtNumberOnly]'
})
export class NumberOnlyDirective implements OnInit {

  ngOnInit(): void {
  }

  @HostListener('input', ['$event.target'])
  onInput(el) {
    if (el.type === 'text') {
      const noDigitsString = el.value.toString().replace(/[^+,?\d]/g, '');
      el.value = noDigitsString.toString().replace(/(?<=[\d+]+)\+/g, '');
    }
  }

}
