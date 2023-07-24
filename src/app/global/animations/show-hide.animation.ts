import { animate, style, transition, trigger } from '@angular/animations';

export const showHideAnimation = trigger('showHide', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: '*' }),
    animate('200ms ease-out', style({ opacity: 0 })),
  ]),
]);
