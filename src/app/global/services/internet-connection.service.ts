import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';

export interface InternetConnectionState {
  readonly hasInternetConnection: boolean;
}

export const DEFAULT_INTERNET_CONNECTION_STATE: InternetConnectionState = {
  hasInternetConnection: true,
};

@Injectable({
  providedIn: 'root',
})
export class InternetConnectionService {
  private stateChanged$: BehaviorSubject<InternetConnectionState> =
    new BehaviorSubject<InternetConnectionState>(
      DEFAULT_INTERNET_CONNECTION_STATE
    );

  private currentConnectionState: InternetConnectionState =
    DEFAULT_INTERNET_CONNECTION_STATE;

  constructor() {
    fromEvent(window, 'online').subscribe(() => {
      this.currentConnectionState = {
        hasInternetConnection: true,
      };
      this.handleConnectionStateChange();
    });

    fromEvent(window, 'offline').subscribe(() => {
      this.currentConnectionState = {
        hasInternetConnection: false,
      };
      this.handleConnectionStateChange();
    });
  }

  private handleConnectionStateChange(): void {
    this.stateChanged$.next(this.currentConnectionState);
    this.showToasterMessage();
  }

  private showToasterMessage(): void {
    const message = `Internet connection ${
      this.currentConnectionState.hasInternetConnection ? 'restored' : 'lost'
    }`;
    // TODO: change alert on toaster message
    alert(message);
  }

  public monitor(): Observable<InternetConnectionState> {
    return this.stateChanged$.asObservable();
  }

  public getCurrentState(): InternetConnectionState {
    return this.currentConnectionState;
  }
}
