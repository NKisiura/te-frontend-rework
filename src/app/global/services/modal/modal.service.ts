import { Component, inject, Injectable, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { ModalData } from '@global/services/modal/modal-data';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly router = inject(Router);

  public modalData$ = new BehaviorSubject<ModalData | null>(null);
  private modalPromiseResolver$ = new Subject<unknown>();

  public showModal(modalData: ModalData): Promise<unknown> {
    this.modalData$.next(modalData);
    this.router.navigate([{ outlets: { modal: ['opened'] } }]);

    return new Promise(resolve => {
      this.modalPromiseResolver$.subscribe(data => {
        resolve(data);
      });
    });
  }

  public closeModal(output?: unknown) {
    this.modalData$.next(null);
    this.router.navigate([{ outlets: { modal: null } }]);

    this.modalPromiseResolver$.next(output);
    this.modalPromiseResolver$.complete();
  }
}
