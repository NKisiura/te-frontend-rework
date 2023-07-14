import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public routingLoading = false;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.initListeners();
  }

  private initListeners(): void {
    this.router.events.subscribe(event => {
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
