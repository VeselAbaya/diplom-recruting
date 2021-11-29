import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'input[appThinInput]'
})
export class ThinInputDirective {
  constructor(renderer: Renderer2,
              elRef: ElementRef<HTMLInputElement>) {
    renderer.setStyle(elRef.nativeElement, 'border', '0');
    renderer.setStyle(elRef.nativeElement, 'background-color', 'transparent');
    renderer.setStyle(elRef.nativeElement, 'outline', 'none');
    renderer.setStyle(elRef.nativeElement, 'padding', '0');
  }
}
