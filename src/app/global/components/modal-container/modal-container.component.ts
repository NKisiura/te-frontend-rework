import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Injector,
  Input,
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
  private readonly modalService = inject(ModalService);
  private readonly teIconsRegistry = inject(TeIconsRegistry);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly injector = inject(Injector);
  private readonly domSanitizer: DomSanitizer = inject(DomSanitizer);

  private readonly ngOnDestroy$ = new Subject<null>();

  @Input() public modalData!: ModalData;

  public innerTemplateRef?: TemplateRef<unknown>;

  public innerComponent?: any;
  public componentInjector?: Injector;

  public innerTextContent?: SafeHtml;

  ngOnInit(): void {
    this.teIconsRegistry.registerIcon([cross]);

    this.modalService.modalData$
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(content => {
        if (content) this.drawContent(content);
      });

    if (this.modalData) this.drawContent(this.modalData);
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(null);
    this.ngOnDestroy$.complete();
  }

  private drawContent(data: ModalData) {
    if (data.options?.footer?.leftContent?.content) {
      data.options.footer.leftContent.content =
        this.domSanitizer.bypassSecurityTrustHtml(
          data.options?.footer?.leftContent?.content
        ) as string;
    }

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

    this.modalData = data;
    this.changeDetector.detectChanges();
  }

  public closeModal(output?: unknown): void {
    this.modalService.closeModal(output);
  }

  private provideCloseModalMethod(modalData: ModalData): void {
    if (!modalData.options) modalData.options = {};
    if (!modalData.options.contentInputs) modalData.options.contentInputs = {};

    modalData.options.contentInputs['closeModal'] = (output?: unknown) =>
      this.closeModal(output);
  }
}
