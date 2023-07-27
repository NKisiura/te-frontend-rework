import { Meta, StoryObj } from '@storybook/angular';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { ModalContainerComponent } from '@shared/components/modal-container/modal-container.component';
import { ModalData } from '@shared/services/modal/modal-data';
import { ModalService } from '@shared/services/modal/modal.service';

@Component({
  selector: 'app-modal-story',
  standalone: true,
  template: ` <app-modal-container></app-modal-container> `,
  styles: [
    `
      ::ng-deep .modal-wrapper {
        position: absolute !important;
      }
    `,
  ],
  imports: [ModalContainerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ModalStoryComponent implements OnInit {
  private readonly modalService = inject(ModalService);

  @Input() public modalData!: ModalData;

  ngOnInit() {
    this.modalService.modalData$.next(this.modalData);
  }
}

const meta: Meta = {
  title: 'Modal Service',
  component: ModalStoryComponent,
};

export default meta;
type Story = StoryObj<ModalStoryComponent>;

export const Full: Story = {
  args: {
    modalData: {
      content: 'Modal content',
      options: {
        header: { title: 'Header title', closeButton: true },
        footer: {
          leftContent: {
            button: {
              output: 'left',
              text: 'Left Content Button',
              color: 'primary',
            },
          },
          centerContent: {
            content: 'Center Content',
          },
          rightContent: {
            button: [
              {
                output: 'save',
                text: 'Save',
                color: 'success',
              },
              {
                output: 'cancel',
                text: 'Cancel',
                color: 'danger',
              },
            ],
          },
        },
      },
    },
  },
};

export const InnerContentOnly: Story = {
  args: {
    modalData: {
      content:
        '<span style="background-color: #333; color: #ddd; border-radius: 10px; padding: 5px 10px">Modal content</span>',
    },
  },
};

export const HeaderOnly: Story = {
  args: {
    modalData: {
      content:
        '<span style="background-color: #333; color: #ddd; border-radius: 10px; padding: 5px 10px">Modal content</span>',
      options: {
        header: { title: 'Header title' },
      },
    },
  },
};

export const FooterOnly: Story = {
  args: {
    modalData: {
      content:
        '<span style="background-color: #333; color: #ddd; border-radius: 10px; padding: 5px 10px">Modal content</span>',
      options: {
        footer: { centerContent: { content: 'Center Content' } },
      },
    },
  },
};
