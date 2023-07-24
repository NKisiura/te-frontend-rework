import { TemplateRef } from '@angular/core';
import { ModalOptions } from '@global/services/modal/modal-options';

export interface ModalData {
  content: TemplateRef<unknown> | unknown | string;
  options?: ModalOptions;
}
