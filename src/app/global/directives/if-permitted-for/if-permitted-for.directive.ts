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
