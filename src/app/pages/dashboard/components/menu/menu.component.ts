import { Component, inject } from '@angular/core';
import { TeIconsRegistry } from '@shared/components/te-icon/te-icons-registry';
import {
  barsBurger,
  calendarFilled,
  car,
  chevronDown,
  chevronTop,
  cross,
  driver,
  fileRowsFilled,
  fork,
  gears,
  globe,
  grid,
  messageDotsFilled,
  starFilled,
  userCardFilled,
} from '@shared/components/te-icon/te-icons';
import { select, Store } from '@ngrx/store';
import { selectSessionParamsData } from '@pages/dashboard/state/session-params/session-params.selector';
import { Observable } from 'rxjs';
import { SessionParams } from '@shared/types/session-params.interface';
import { TeIcon } from '@shared/components/te-icon/te-icon.interface';
import { sidebarAnimation } from '@shared/animations/sidebar.animation';

const sidebarIcons: TeIcon[] = [
  barsBurger,
  cross,
  globe,
  starFilled,
  fork,
  car,
  chevronTop,
  chevronDown,
  calendarFilled,
  fileRowsFilled,
  grid,
  userCardFilled,
  messageDotsFilled,
  gears,
  driver,
];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [sidebarAnimation],
})
export class MenuComponent {
  private readonly store: Store = inject(Store);

  public readonly sessionParams$: Observable<SessionParams | null> =
    this.store.pipe(select(selectSessionParamsData));

  public sidebarState: 'open' | 'closed' = 'closed';
  public sidebarGroupsStates: Record<SidebarGroup, 'open' | 'closed'> = {
    dispatch: 'closed',
    options: 'closed',
  };

  constructor(private readonly iconRegistry: TeIconsRegistry) {
    this.iconRegistry.registerIcon(sidebarIcons);
  }

  public toggleSidebarState(): void {
    this.sidebarState = this.sidebarState === 'open' ? 'closed' : 'open';
  }

  public toggleSidebarGroupState(groupName: SidebarGroup): void {
    this.sidebarGroupsStates[groupName] =
      this.sidebarGroupsStates[groupName] === 'open' ? 'closed' : 'open';
  }
}

export type SidebarGroup = 'dispatch' | 'options';
