import {
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectPermissionsSet } from '@pages/dashboard/state/session-params/session-params.selector';

/**
 * ## Allows you to conditionally render content based on user permissions.
 *
 * The `IfPermittedForDirective` allows you to conditionally render content based on user permissions.
 * It checks if the user has specific permissions before rendering the content inside the directive's host element.
 * This is particularly useful when you want to display certain parts of the UI only to users who have specific permissions.
 *
 * ### The `IfPermittedForDirective` requires one input property:
 * - `ifPermittedFor: string | string[]` - Accepts a string or an array of strings representing the permission names required to display the content.
 * If the user has the required permission(s), the content inside the directive's host element will be rendered; otherwise, it will be removed from the DOM.
 * <br>
 * @example
 * //template
 * <div *ifPermittedFor="'permissionName'">
 *   <!-- Your content here -->
 * </div>
 *
 * //template
 * <div *ifPermittedFor="['permission1', 'permission2', 'permission3']">
 *   <!-- Your content here -->
 * </div>
 */
@Directive({
  standalone: true,
  selector: '[ifPermittedFor]',
})
export class IfPermittedForDirective implements OnChanges, OnDestroy {
  private ngDestroy$ = new Subject<void>();

  @Input() ifPermittedFor!: string | string[];

  private permissionSet$: Observable<Set<string> | null>;
  private permissionSet: Set<string> | null = null;

  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<unknown>,
    private store: Store
  ) {
    this.permissionSet$ = this.store.select(selectPermissionsSet);
    this.permissionSet$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((value: Set<string> | null) => {
        this.permissionSet = value;
        this.changeView();
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (Object.hasOwn(changes, 'ifPermittedFor')) {
      this.changeView();
    }
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private changeView(): void {
    if (this.checkPermissions()) {
      if (this.view.length) {
        this.view.clear();
      }

      this.view.createEmbeddedView(this.template);
    } else {
      this.view.clear();
    }
  }

  private checkPermissions(): boolean {
    if (!this.permissionSet?.size) return false;

    if (this.ifPermittedFor) {
      if (typeof this.ifPermittedFor === 'string') {
        return this.permissionSet.has(this.ifPermittedFor);
      }
      if (Array.isArray(this.ifPermittedFor)) {
        return this.ifPermittedFor.every(permission => {
          return this.permissionSet?.has(permission);
        });
      }
    }

    return false;
  }
}
