import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControlSize } from '@shared/types/form-control-size.type';
import { NgClass } from '@angular/common';
import { TeButtonColor } from '@shared/components/te-button/te-button-color.type';

/**
 * ## Custom reusable button component
 *
 * ### `Inputs`:
 * - `isDisabled: boolean` : Specifies whether the button should be in a disabled state.
 * - `enableAutofocus: boolean` : Specifies whether the button should be in a focused state after rendering.
 * - `label: string` : Specifies the label of the button or use ng-content instead.
 * - `size: FormControlSize` : Specifies the size of the button. Available sizes: 'sm' | 'md' | 'lg'.
 * - `color: TeButtonColor` : Specifies the color of the button. Available colors: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'.
 * - `outline: boolean` : Specifies whether the button should be in a outlined style.
 *
 * ### `Outputs`:
 * - `btnClick: EventEmitter<MouseEvent>` : Emits when the button is clicked.
 * - `btnFocus: EventEmitter<FocusEvent>` : Emits when the button is focused.
 * - `btnBlur: EventEmitter<FocusEvent>` : Emits when the button is blurred.
 *
 * ### Additional information
 * - See all button states preview in StoryBook documentation
 * <br>
 * @example
 * //template
 * <te-button
 *   [isDisabled]="false"
 *   [enableAutofocus]="false"
 *   [label]="'te-button'"
 *   [size]="'md'"
 *   [color]="'primary'"
 *   [outline]="false"
 *   (btnClick)="btnClick($event)"
 *   (btnFocus)="btnFocus($event)"
 *   (btnBlur)="btnBlur($event)"
 * >
 *    <div>you can use ng-content instead of 'label' property</div>
 * </te-button>
 */
@Component({
  selector: 'te-button',
  templateUrl: './te-button.component.html',
  styleUrls: ['./te-button.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class TeButtonComponent implements AfterViewInit {
  @ViewChild('button') public buttonElement!: ElementRef<HTMLButtonElement>;

  @Input() public isDisabled = false;
  @Input() public enableAutofocus = false;

  @Input() public label = '';
  @Input() public size: FormControlSize = 'md';
  @Input() public color: TeButtonColor = 'primary';
  @Input() public outline = false;

  @Output() private btnClick: EventEmitter<MouseEvent> =
    new EventEmitter<MouseEvent>();
  @Output() private btnFocus: EventEmitter<FocusEvent> =
    new EventEmitter<FocusEvent>();
  @Output() private btnBlur: EventEmitter<FocusEvent> =
    new EventEmitter<FocusEvent>();

  constructor(private readonly changeDetectionRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.enableAutofocus) {
      this.buttonElement.nativeElement.focus();
      this.changeDetectionRef.markForCheck();
      this.changeDetectionRef.detectChanges();
    }
  }

  public click(event: MouseEvent): void {
    this.btnClick.emit(event);
  }

  public focus(event: FocusEvent): void {
    this.btnFocus.emit(event);
  }

  public blur(event: FocusEvent): void {
    this.btnBlur.emit(event);
  }
}
