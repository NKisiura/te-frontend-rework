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
import { FormControlSize } from '@global/types/form-control-size.type';
import { NgClass } from '@angular/common';
import { TeButtonColor } from '@global/components/te-button/te-button-color.type';

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
