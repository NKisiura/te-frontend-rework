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

@Component({
  selector: 'te-icon',
  template: '<ng-content></ng-content>',
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
