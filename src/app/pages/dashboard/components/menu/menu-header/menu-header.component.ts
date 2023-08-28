import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-header',
  template: `
    <div class="flex flex-col gap-1 bg-secondary-800 px-1">
      <div class="grid items-center">
        <span
          class="absolute -translate-x-20 text-lg leading-none text-white transition-transform duration-300 ease-in-out will-change-transform"
          [ngClass]="{ 'translate-x-1': sidebarState === 'open' }"
        >
          MENU
        </span>
        <button
          type="button"
          class="flex justify-self-end text-white"
          (click)="toggleState()"
        >
          <te-icon
            class="text-3xl"
            [name]="sidebarState === 'open' ? 'cross' : 'bars-burger'"
          ></te-icon>
        </button>
      </div>
      <div class="h-px bg-gray-700"></div>
    </div>
  `,
  styleUrls: ['../menu.component.scss'],
})
export class MenuHeaderComponent {
  @Input() public sidebarState!: 'open' | 'closed';
  @Output() public toggleSidebarState = new EventEmitter<void>();

  public toggleState(): void {
    this.toggleSidebarState.emit();
  }
}
