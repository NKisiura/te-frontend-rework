import { Injectable } from '@angular/core';
import { TeIcon } from './te-icon.interface';
import { TeIconName } from './te-icon-name.type';

@Injectable({
  providedIn: 'root',
})
export class TeIconsRegistry {
  private registry: Map<string, string> = new Map<string, string>();

  public registerIcon(icons: TeIcon[]): void {
    icons.forEach(icon => this.registry.set(icon.name, icon.data));
  }

  public getIcon(iconName: TeIconName): string | undefined {
    if (!this.registry.has(iconName)) {
      console.warn(
        `We could not find icon with name ${iconName}, did you add it to the icon-registry?`
      );
    }
    return this.registry.get(iconName);
  }
}
