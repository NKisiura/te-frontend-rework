import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public showLoader(): void {
    this.loaderState$.next(true);
  }

  public hideLoader(): void {
    this.loaderState$.next(false);
  }

  public loaderState(): Observable<boolean> {
    return this.loaderState$.asObservable();
  }

  public getLoaderState(): boolean {
    return this.loaderState$.getValue();
  }
}
