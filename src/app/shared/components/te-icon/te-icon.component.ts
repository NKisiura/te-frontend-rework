import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TeIconsRegistry } from './te-icons-registry';
import { TeIconName } from './te-icon-name.type';

/**
 * ## Designed to display SVG icons
 *
 * The `TeIconComponent` designed to display SVG icons in your application. It provides a flexible and efficient way of rendering icons by loading only the icons that are required,
 * rather than loading all the icons at once. This approach helps to optimize the performance of your application.
 *
 * ### The `TeIconComponent` requires one input property:
 * - `name: TeIconName` - Specifies the name of the icon to be displayed
 *
 * ### Additional information
 * - See all icons preview in StoryBook documentation
 * - To generate te-icons.ts & te-icon-name.type.ts files use script "npm run regenerate-icons"
 * <br>
 * @example
 * //template
 * <te-icon name="icon-name"></te-icon>
 * <te-icon [name]="'icon-name'"></te-icon>
 *
 * //component or module
 * import { icon1, icon2, icon3 } from '@shared/components/te-icon/te-icons';
 *
 * export class YourComponentOrModule {
 *   constructor(private readonly teIconRegistry: TeIconsRegistry) {
 *     this.teIconRegistry.registerIcon([icon1, icon2, icon3]);
 *   }
 * }
 */
@Component({
  selector: 'te-icon',
  template: '',
  styles: [
    `
      :host ::ng-deep > * {
        height: 1em;
        width: 1em;
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeIconComponent {
  private svgIcon?: SVGElement;

  @Input()
  set name(iconName: TeIconName) {
    if (this.svgIcon) {
      this.element.nativeElement.removeChild(this.svgIcon);
    }
    const svgData = this.teIconRegistry.getIcon(iconName);
    if (svgData) {
      this.svgIcon = this.svgElementFromString(svgData);
      this.element.nativeElement.appendChild(this.svgIcon);
      this.element.nativeElement.style.display = 'inline-flex';
    }
  }

  constructor(
    private element: ElementRef,
    private teIconRegistry: TeIconsRegistry,
    @Inject(DOCUMENT) private document: Document
  ) {}

  private svgElementFromString(svgContent: string): SVGElement {
    const div = this.document.createElement('DIV');
    div.innerHTML = svgContent;
    return (
      div.querySelector('svg') ||
      this.document.createElementNS('http://www.w3.org/2000/svg', 'path')
    );
  }
}
