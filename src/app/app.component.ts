import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private ngDestroy$: Subject<void> = new Subject<void>();

  public routingLoading = false;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.initListeners();
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private initListeners(): void {
    this.router.events.pipe(takeUntil(this.ngDestroy$)).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.routingLoading = true;
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      )
        this.routingLoading = false;
    });
  }
}
