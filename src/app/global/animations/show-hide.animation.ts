import { animate, style, transition, trigger } from '@angular/animations';

/**
 * ## Animation to create smooth fade-in and fade-out effects when elements are inserted or removed from the DOM
 *
 * The `showHideAnimation` is an animation designed to create smooth fade-in and fade-out effects when elements are inserted or removed from the DOM.
 * It is particularly useful when you want to animate the visibility of elements, such as displaying or hiding components or any other UI element.
 *
 * ### The `showHideAnimation` doesn't require any input properties.
 * <br>
 * @example
 * //template
 * <your-component *ngIf="condition" [@showHide]=""></your-component>
 *
 * //component decorator
 * Component({
 *   selector: 'your-component-selector',
 *   templateUrl: './your.component.html',
 *   animations: [showHideAnimation],
 * })
 */
export const showHideAnimation = trigger('showHide', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('200ms ease-out', style({ opacity: 0 })),
  ]),
]);
