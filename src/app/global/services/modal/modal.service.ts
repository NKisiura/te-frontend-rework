import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { ModalData } from '@global/services/modal/modal-data';

/**
 * Service for managing modal windows.
 */
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly router = inject(Router);

  /**
   * BehaviorSubject to store the current modal data being displayed or null if no modal is open.
   */
  public modalData$ = new BehaviorSubject<ModalData | null>(null);

  private modalPromiseResolver$ = new Subject<unknown>();

  /**
   * Displays a modal window with the provided data.
   *
   * @param modalData - The data object containing modal content and options.
   * @returns A Promise that resolves with the output passed to the `closeModal` method.
   */
  public showModal(modalData: ModalData): Promise<unknown> {
    this.modalData$.next(modalData);
    this.router.navigate([{ outlets: { modal: ['opened'] } }]);

    return new Promise(resolve => {
      this.modalPromiseResolver$.subscribe(data => {
        resolve(data);
      });
    });
  }

  /**
   * Closes the currently open modal window.
   *
   * @param output - (Optional) The output data to be passed back to the Promise returned by `showModal`.
   */
  public closeModal(output?: unknown) {
    this.modalData$.next(null);
    this.router.navigate([{ outlets: { modal: null } }]);

    this.modalPromiseResolver$.next(output);
    this.modalPromiseResolver$.complete();
  }
}
