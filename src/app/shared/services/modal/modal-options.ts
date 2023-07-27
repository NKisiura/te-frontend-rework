import { TeIconName } from '@shared/components/te-icon/te-icon-name.type';
import { TeButtonColor } from '@shared/components/te-button/te-button-color.type';
import { SafeHtml } from '@angular/platform-browser';

export interface ModalOptions {
  contentInputs?: { [key: string]: unknown };
  header?: {
    title?: string;
    closeButton?: boolean;
  };
  footer?: {
    leftContent?: ModalFooterContent;
    centerContent?: ModalFooterContent;
    rightContent?: ModalFooterContent;
  };
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
}

export interface ModalFooterContent {
  content?: string | SafeHtml;
  button?: ModalFooterButton | ModalFooterButton[];
  /**
   * Do not use this property directly. Use the `content` property instead.
   */
  _safeHTMLContent?: SafeHtml;
}

// TODO: Increase by more te-button options when the te-button is completed
export interface ModalFooterButton {
  output: unknown;
  text?: string;
  icon?: TeIconName;
  color?: TeButtonColor;
}
