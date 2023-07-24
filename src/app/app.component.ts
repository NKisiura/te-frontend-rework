import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LoaderService } from '@global/services/loader.service';
import { showHideAnimation } from '@global/animations/show-hide.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [showHideAnimation],
})
export class AppComponent implements OnInit, OnDestroy {
  private ngDestroy$: Subject<void> = new Subject<void>();
  public loaderState$: Observable<boolean> = this.loaderService.loaderState();

  constructor(
    private readonly loaderService: LoaderService,
    private readonly router: Router
  ) {}

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
        this.loaderService.showLoader();
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      )
        this.loaderService.hideLoader();
    });
  }
}
