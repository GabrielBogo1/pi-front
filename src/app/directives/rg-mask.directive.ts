import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appRgMask]'
})
export class RgMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = event.target;
    const value = input.value.replace(/\D/g, '');

    if (value.length <= 9) {
      input.value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
    } else {
      input.value = value.slice(0, 9).replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
    }
  }

}
