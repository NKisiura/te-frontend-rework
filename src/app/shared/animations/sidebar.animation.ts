import {
  animate,
  AUTO_STYLE,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const sidebarAnimation = trigger('sidebarOpenClose', [
  state('open', style({ width: 250 })),
  state('closed', style({ width: '46px' })),
  transition('open <=> closed', [animate('300ms ease-in-out')]),
]);

export const sidebarGroupAnimation = trigger('sidebarGroupOpenClose', [
  state('open', style({ height: AUTO_STYLE })),
  state('closed', style({ height: '38px' })),
  transition('open <=> closed', [animate('200ms ease-in-out')]),
]);
