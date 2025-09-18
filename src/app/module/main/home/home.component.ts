import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../shared/service/toast-alert.service';
import { inputConfigTm, selectConfigTm } from '../../../../shared/interface/input.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  step = 1;
  progress = 20;
  formGroup!: FormGroup;
  idCardInputConfig!: inputConfigTm;
  firstNameInputConfig!: inputConfigTm;
  lastNameInputConfig!: inputConfigTm;
  addressInputConfig!: inputConfigTm;
  salaryInputConfig!: inputConfigTm;
  loanInputConfig!: inputConfigTm;
  countryDropdownSelectConfig!: selectConfigTm;

  stepLabels: string[] = [
    'รายละเอียดผลิตภัณฑ์',
    'การให้ความยินยอม',
    'ยืนยันตัวตน',
    'กรอกข้อมูลเพิ่มเติม',
    'ยืนยันและส่งคำขอ'
  ];

  country = [
    { label: 'ไทย', value: 'TH' },
    { label: 'รัสเซีย', value: 'RU' },
    { label: 'พม่า', value: 'MM' },
    { label: 'เบลารุส', value: 'BY' },
  ];

  occupation = [
    { label: 'หมอ', value: 'TH' },
    { label: 'พยาบาล', value: 'RU' },
    { label: 'software developer', value: 'MM' },
    { label: 'นายก', value: 'BY' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      idCard: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      firstName: ['Somchai', [Validators.required]],
      lastName: ['Jaiboon', [Validators.required]],
      address: ['KTB', [Validators.required]],
      salary: [10.0],
      loan: [10.0],
      country: [''],
    });
    this.initialComponent();
    this.setupComponentValue();
  }

  nextStepConsentForm() {
    const consentItems = document.querySelectorAll('input[type="radio"]:checked');
    if (consentItems.length < 3) {
      this.alertService.incomplete()
      return;
    }
    this.step++;
    this.progress = this.step * 20;
  }

  nextStepIdCard(): void {
    this.formGroup.markAllAsTouched();

    const idCardControl = this.formGroup.get('idCard');

    if (!idCardControl || idCardControl.invalid) {
      this.alertService.incomplete()
      return;
    }

    this.step++;
    this.progress = (this.step / 5) * 100;
  }

  nextStepForm(): void {
    this.formGroup.markAllAsTouched();

    const firstNameControl = this.formGroup.get('firstName');
    const lastNameControl = this.formGroup.get('firstName');
    const addressControl = this.formGroup.get('address');

    if (!firstNameControl || firstNameControl.invalid || !lastNameControl || lastNameControl.invalid || !addressControl || addressControl.invalid) {
      this.alertService.incomplete()
      return;
    }

    this.step++;
    this.progress = (this.step / 5) * 100;
  }

  nextStep() {
    this.step++;
    this.progress = this.step * 20;
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
      this.progress = this.step * 20;
    }
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']); // <-- your route path
  }

  async setupComponentValue() {
    this.countryDropdownSelectConfig = {
      ...this.countryDropdownSelectConfig,
      options: this.country,
    };
  }

  initialComponent() {
    this.idCardInputConfig = {
      labelAndPlaceholderVariable: 'idCard',
      isLabelLeftSide: false,
      formControl: this.formGroup.get('idCard'),
      type: 'string',
      formValidateType: ['required'],
      isDisabled: false,
      isOnlyNumber: true,
    };
    this.firstNameInputConfig = {
      labelAndPlaceholderVariable: 'firstName',
      isLabelLeftSide: false,
      formControl: this.formGroup.get('firstName'),
      type: 'string',
      formValidateType: ['required'],
      isDisabled: false,
    };
    this.lastNameInputConfig = {
      labelAndPlaceholderVariable: 'lastName',
      isLabelLeftSide: false,
      formControl: this.formGroup.get('lastName'),
      type: 'string',
      formValidateType: ['required'],
      isDisabled: false,
    };
    this.addressInputConfig = {
      labelAndPlaceholderVariable: 'address',
      isLabelLeftSide: false,
      formControl: this.formGroup.get('address'),
      type: 'string',
      formValidateType: ['required'],
      isDisabled: false,
    };
    this.salaryInputConfig = {
      labelAndPlaceholderVariable: 'salary',
      isLabelLeftSide: false,
      formControl: this.formGroup.get('salary'),
      type: 'float',
      formValidateType: ['required'],
      isDisabled: false,
      isOnlyNumber: true,
    };
    this.loanInputConfig = {
      labelAndPlaceholderVariable: 'loan',
      isLabelLeftSide: false,
      formControl: this.formGroup.get('loan'),
      type: 'float',
      formValidateType: ['required'],
      isDisabled: false,
      isOnlyNumber: true,
    };
    this.countryDropdownSelectConfig = {
      labelAndPlaceholderVariable: 'country',
      isLabelLeftSide: true,
      formControl: this.formGroup.get('country'),
      options: [
        { label: 'ไทย', value: 'TH' },
        { label: 'รัสเซีย', value: 'RU' },
        { label: 'พม่า', value: 'MM' },
        { label: 'เบลารุส', value: 'BY' },
      ],
      formValidateType: [],
      isDisabled: false,
    };
  }
}
