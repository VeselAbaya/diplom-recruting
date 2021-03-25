import { Directive, DoCheck, ElementRef, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

// todo ~ Most correct way to make 'dynamic-sized' input is described in angular material date-range component

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d') as CanvasRenderingContext2D;
function calculateTextWidth(text: string, font: string): number {
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

@Directive({
  selector: '[appThinInput]'
})
export class ThinInputDirective extends OnDestroyMixin implements DoCheck {
  constructor(private elRef: ElementRef<HTMLInputElement>, private renderer: Renderer2) {
    super();
    renderer.setStyle(elRef.nativeElement, 'border', '0');
    renderer.setStyle(elRef.nativeElement, 'background-color', 'transparent');
    renderer.setStyle(elRef.nativeElement, 'outline', 'none');
    renderer.setStyle(elRef.nativeElement, 'padding-right', '0');
    fromEvent(elRef.nativeElement, 'input').pipe(
      untilComponentDestroyed(this)
    ).subscribe(() => this.ngDoCheck());
  }

  ngDoCheck(): void {
    const inputEl = this.elRef.nativeElement;
    const text = inputEl.value || inputEl.placeholder || 'm';
    this.renderer.setStyle(inputEl, 'width', `${calculateTextWidth(text, getComputedStyle(inputEl).font)}px`);
  }
}
