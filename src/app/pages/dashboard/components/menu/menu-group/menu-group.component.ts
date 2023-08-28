import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarGroup } from '@pages/dashboard/components/menu/menu.component';
import { TeIconName } from '@shared/components/te-icon/te-icon-name.type';
import { sidebarGroupAnimation } from '@shared/animations/sidebar.animation';

@Component({
  selector: 'app-menu-group',
  template: `
    <div
      class="menu-group"
      [@sidebarGroupOpenClose]="state"
      [ngClass]="{ open: state === 'open' }"
    >
      <a
        href="#"
        class="menu-link menu-group-link"
        (click)="toggleState($event)"
      >
        <div class="menu-group-link-name">
          <te-icon class="menu-link-icon" [name]="icon"></te-icon>
          <span class="menu-link-name">{{ groupName }}</span>
        </div>
        <te-icon
          class="menu-link-icon"
          [name]="state === 'open' ? 'chevron-top' : 'chevron-down'"
        ></te-icon>
      </a>
      <div class="menu-group-items">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['../menu.component.scss'],
  animations: [sidebarGroupAnimation],
})
export class MenuGroupComponent {
  @Input() public groupName!: SidebarGroup;
  @Input() public icon!: TeIconName;
  @Input() public state!: 'open' | 'closed';
  @Output() public toggleGroupState = new EventEmitter<SidebarGroup>();

  public toggleState(event: MouseEvent): void {
    event.preventDefault();
    this.toggleGroupState.emit(this.groupName);
  }
}
