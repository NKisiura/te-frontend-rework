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

  @Input() public size: FormControlSize = 'md';
  @Input() public color: TeButtonColor = 'primary';
  @Input() public outline = false;

  @Output() private btnClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() private btnFocus: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly changeDetectionRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.enableAutofocus) {
      this.buttonElement.nativeElement.focus();
      this.changeDetectionRef.markForCheck();
      this.changeDetectionRef.detectChanges();
    }
  }

  public click(): void {
    this.btnClick.emit();
  }

  public focus(): void {
    this.btnFocus.emit();
  }
}
