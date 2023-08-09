import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControlSize } from '@shared/types/form-control-size.type';
import { NgClass } from '@angular/common';
import { TeButtonColor } from '@shared/components/te-button/te-button-color.type';

/**
 * ## Custom reusable button component
 *
 * ### `Inputs`:
 * - `buttonProps: TeButtonProps` : Specifies the list of props that will be added to the button. You can use this instead of adding each property separately. Do not mix with separate properties. `buttonProps` override properties added separately.
 * - `isDisabled: boolean` : Specifies whether the button should be in a disabled state.
 * - `enableAutofocus: boolean` : Specifies whether the button should be in a focused state after rendering.
 * - `label: string` : Specifies the label of the button or use ng-content instead.
 * - `size: FormControlSize` : Specifies the size of the button. Available sizes: 'sm' | 'md' | 'lg'.
 * - `color: TeButtonColor` : Specifies the color of the button. Available colors: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'.
 * - `outlined: boolean` : Specifies whether the button should be in a outlined style.
 * - `iconOnly: boolean` : Indicate whether the button will exclusively contain an icon and, if so, adjust the padding for proper view.
 * - `classList: string[]` : Specifies the list of classes that will be added to the button.
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
 *   [buttonProps]="{color: 'success', size: 'sm'}"
 *   [isDisabled]="false"
 *   [enableAutofocus]="false"
 *   [label]="'te-button'"
 *   [size]="'md'"
 *   [color]="'primary'"
 *   [outlined]="false"
 *   [iconOnly]="false"
 *   [classList]="['my-class']"
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
export class TeButtonComponent implements OnChanges, AfterViewInit {
  private readonly changeDetectionRef = inject(ChangeDetectorRef);

  @ViewChild('button') public buttonElement!: ElementRef<HTMLButtonElement>;

  @Input() public buttonProps: TeButtonProps = {};
  @Input() public isDisabled = false;
  @Input() public enableAutofocus = false;

  @Input() public label = '';
  @Input() public size: FormControlSize = 'md';
  @Input() public color: TeButtonColor = 'primary';
  @Input() public outlined = false;
  @Input() public iconOnly = false;
  @Input() public classList: string[] = [];

  @Output() private btnClick: EventEmitter<MouseEvent> =
    new EventEmitter<MouseEvent>();
  @Output() private btnFocus: EventEmitter<FocusEvent> =
    new EventEmitter<FocusEvent>();
  @Output() private btnBlur: EventEmitter<FocusEvent> =
    new EventEmitter<FocusEvent>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['buttonProps']) {
      this.applyPropsValues();
    }
  }

  ngAfterViewInit(): void {
    if (this.enableAutofocus) {
      this.buttonElement.nativeElement.focus();
      this.changeDetectionRef.markForCheck();
      this.changeDetectionRef.detectChanges();
    }
  }

  private applyPropsValues(): void {
    const { label, size, color, outlined, iconOnly, classList } =
      this.buttonProps;
    this.label = label ?? this.label;
    this.size = size ?? this.size;
    this.color = color ?? this.color;
    this.outlined = outlined ?? this.outlined;
    this.iconOnly = iconOnly ?? this.iconOnly;
    this.classList = classList ?? this.classList;
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

export interface TeButtonProps {
  readonly label?: string;
  readonly size?: FormControlSize;
  readonly color?: TeButtonColor;
  readonly outlined?: boolean;
  readonly iconOnly?: boolean;
  readonly classList?: string[];
}
