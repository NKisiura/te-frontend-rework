import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
  Injector,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { ModalService } from '@global/services/modal/modal.service';
import { Subject, takeUntil } from 'rxjs';
import {
  NgComponentOutlet,
  NgForOf,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import { ModalData } from '@global/services/modal/modal-data';
import { TeButtonComponent } from '@global/components/te-button/te-button.component';
import { TeIconComponent } from '@global/components/te-icon/te-icon.component';
import { TeIconsRegistry } from '@global/components/te-icon/te-icons-registry';
import { cross } from '@global/components/te-icon/te-icons';
import { MODAL_INPUTS_INJECTOR } from '@global/components/modal-container/modal-inputs.injector';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ModalFooterContent } from '@global/services/modal/modal-options';

/**
 * Component for rendering modal windows.
 */
@Component({
  selector: 'app-modal-container',
  standalone: true,
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgComponentOutlet,
    NgTemplateOutlet,
    TeButtonComponent,
    TeIconComponent,
    NgForOf,
  ],
  providers: [TeIconsRegistry],
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  private readonly ngOnDestroy$ = new Subject<null>();

  private readonly modalService = inject(ModalService);
  private readonly teIconsRegistry = inject(TeIconsRegistry);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly injector = inject(Injector);
  private readonly domSanitizer: DomSanitizer = inject(DomSanitizer);

  /**
   * The data representing the currently open modal window.
   */
  public modalData!: ModalData;

  /**
   * Reference to the inner template of the modal window if the content is a TemplateRef.
   */
  public innerTemplateRef?: TemplateRef<unknown>;

  /**
   * Reference to the inner component of the modal window if the content is a function.
   */
  public innerComponent?: any;

  /**
   * Injector for the inner component.
   */
  public componentInjector?: Injector;

  /**
   * Safe HTML content for the modal window if the content is a string (HTML markup).
   */
  public innerTextContent?: SafeHtml;

  ngOnInit(): void {
    // Register the "cross" icon.
    this.teIconsRegistry.registerIcon([cross]);

    // Subscribe to changes in the modalData$ BehaviorSubject from the modal service.
    this.modalService.modalData$
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(content => {
        if (content) this.drawContent(content);
      });

    // If the component is initialized with an initial modalData, draw the content.
    if (this.modalData) this.drawContent(this.modalData);
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(null);
    this.ngOnDestroy$.complete();
  }

  private drawContent(data: ModalData) {
    // Sanitize HTML content for footer content if provided.
    if (data.options?.footer) {
      this.processFooterContent(data.options.footer?.leftContent);
      this.processFooterContent(data.options.footer?.centerContent);
      this.processFooterContent(data.options.footer?.rightContent);
    }

    // Determine the type of content (TemplateRef, string, or function) and set the corresponding properties.
    if (data.content instanceof TemplateRef) {
      this.innerTemplateRef = data.content;
      this.provideCloseModalMethod(data);
    }

    if (typeof data.content === 'string') {
      this.innerTextContent = this.domSanitizer.bypassSecurityTrustHtml(
        data.content
      );
    }

    if (typeof data.content === 'function') {
      this.provideCloseModalMethod(data);

      this.componentInjector = Injector.create({
        providers: [
          {
            provide: MODAL_INPUTS_INJECTOR,
            useValue: data.options?.contentInputs,
          },
        ],
        parent: this.injector,
      });

      this.innerComponent = data.content;
    }

    // Update the modalData and trigger change detection.
    this.modalData = data;
    this.changeDetector.detectChanges();
  }

  /**
   * Closes the currently open modal window with an optional output data.
   *
   * @param output - (Optional) The output data to be passed back to the Promise returned by `showModal`.
   */
  public closeModal(output?: unknown): void {
    this.modalService.closeModal(output);
  }

  private provideCloseModalMethod(modalData: ModalData): void {
    if (!modalData.options) modalData.options = {};
    if (!modalData.options.contentInputs) modalData.options.contentInputs = {};

    modalData.options.contentInputs['closeModal'] = (output?: unknown) =>
      this.closeModal(output);
  }

  /**
   * Handles the "Escape" keyup event and closes the modal window if the "closeOnEscape" option is enabled.
   */
  @HostListener('document:keyup.escape')
  public handleEscapeKeyup(): void {
    if (this.modalData.options?.closeOnEscape) this.closeModal();
  }

  /**
   * Handles the backdrop click event and closes the modal window if the "closeOnBackdrop" option is enabled.
   *
   * @param $event - The mouse event object.
   */
  public handleBackdropClick($event: MouseEvent): void {
    if ($event.target !== $event.currentTarget) return;
    if (this.modalData.options?.closeOnBackdrop) this.closeModal();
  }

  processFooterContent(content?: ModalFooterContent) {
    if (content?.content) {
      content._safeHTMLContent = this.domSanitizer.bypassSecurityTrustHtml(
        content.content as string
      );
    }
  }
}
