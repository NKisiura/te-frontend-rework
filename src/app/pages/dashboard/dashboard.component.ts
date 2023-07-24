import { Component, inject } from '@angular/core';
import { ModalService } from '@global/services/modal/modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  modalService = inject(ModalService);

  constructor() {
    this.modalService.showModal({
      content: 'Hello world!',
    });
  }
}
