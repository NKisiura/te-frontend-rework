import { TemplateRef } from '@angular/core';
import { ModalOptions } from '@shared/services/modal/modal-options';
import { SafeHtml } from '@angular/platform-browser';

export interface ModalData {
  content: TemplateRef<unknown> | unknown | string | SafeHtml;
  options?: ModalOptions;
}
