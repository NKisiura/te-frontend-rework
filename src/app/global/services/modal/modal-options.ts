import { TeIconName } from '@global/components/te-icon/te-icon-name.type';
import { TeButtonColor } from '@global/components/te-button/te-button-color.type';

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
}

export interface ModalFooterContent {
  content?: string;
  button?: ModalFooterButton | ModalFooterButton[];
}

// TODO: Increase by more te-button options when the te-button is completed
export interface ModalFooterButton {
  output: unknown;
  text?: string;
  icon?: TeIconName;
  color?: TeButtonColor;
}
