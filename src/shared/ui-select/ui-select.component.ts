import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ERROR_MESSAGE_SELECT } from '../constant/error-message/select.constant';
import { DETAIL_SELECT } from '../constant/label-and-placeholder/select.constant';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'ui-select',
  templateUrl: './ui-select.component.html',
  styleUrl: './ui-select.component.scss',
  standalone: true,
  imports: [
    NzSelectModule,
    ReactiveFormsModule,
    CommonModule
  ],
  animations: [
    trigger('fadeInSlideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translate3d(0, -20%, 0)' }),
        animate('300ms', style({ opacity: 1, transform: 'translate3d(0, 0, 0)' }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translate3d(0, -20%, 0)' }))
      ]),
    ]),
  ],
})
export class UiSelectComponent implements OnInit {
  @Input() styleClass: string = "";
  @Input() styleClassAsterisk: string = "";
  @Input() styleClassLabel: string = "";
  @Input() styleClassInput: string = "";
  @Input() inputConfig: {
    labelAndPlaceholderVariable: string;
    isLabelLeftSide: boolean;
    formControl: FormControl;
    options: { value: string; label: string; }[];
    formValidateType: string[];
    isDisabled: boolean;
    mode?: 'default' | 'multiple' | 'tags';
  } = {
      labelAndPlaceholderVariable: '',
      isLabelLeftSide: false,
      formControl: new FormControl(),
      options: [{ value: "", label: "" }],
      formValidateType: [],
      isDisabled: false,
      mode: 'default',
    };

  @Output() formControlChange: EventEmitter<FormControl> = new EventEmitter<FormControl>();

  errorMessage: string = '';
  isInvalid: boolean = false;
  clicked: boolean = false;

  ngOnInit(): void {
    this.setErrorMessage()
    if (this.inputConfig.isDisabled) {
      this.inputConfig.formControl.disable();
    } else {
      this.inputConfig.formControl.enable();
    }
  }

  get label(): string {
    return DETAIL_SELECT[this.inputConfig?.labelAndPlaceholderVariable as keyof typeof DETAIL_SELECT].label;
  }

  get placeholder(): string {
    return DETAIL_SELECT[this.inputConfig?.labelAndPlaceholderVariable as keyof typeof DETAIL_SELECT].placeholder;
  }

  get isRequired(): boolean {
    return (this.inputConfig?.formValidateType.find((validate) => validate === 'required') === 'required');
  }

  setErrorMessage() {
    for (let i = 0; i < this.inputConfig?.formValidateType.length; i++) {
      const isError = this.hasError(this.inputConfig?.formValidateType[i]);
      if (isError) {
        this.errorMessage = ERROR_MESSAGE_SELECT[this.inputConfig?.formValidateType[i] as keyof typeof ERROR_MESSAGE_SELECT];
        break;
      }
    }
  }

  hasError(validateType: string): boolean {
    const hasError = this.inputConfig?.formControl.hasError(validateType);
    return hasError;
  }

  onFormControlChange() {
    this.setErrorMessage()
    this.formControlChange.emit(this.inputConfig.formControl);
  }

  checkClick() {
    this.clicked = true;
  }

  checkInvalid() {
    this.isInvalid = this.inputConfig.formControl.touched && this.inputConfig.formControl.invalid;
    return this.inputConfig.formControl.touched && this.inputConfig.formControl.invalid;
  }
}
