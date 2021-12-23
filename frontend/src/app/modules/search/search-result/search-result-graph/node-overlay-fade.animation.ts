import { animate, style, transition, trigger } from '@angular/animations';

export const nodeOverlayFade = trigger('nodeOverlayFade', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.1)' }),
    animate('150ms cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'none', opacity: 1 }))
  ]),
  transition(':leave',
    animate('75ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 0, transform: 'scale(0.7)' }))
  ),
]);
