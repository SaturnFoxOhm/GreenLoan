import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UiSelectComponent } from './ui-select.component';

describe('UiSelectComponent', () => {
  let component: UiSelectComponent;
  let fixture: ComponentFixture<UiSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, UiSelectComponent],
      providers: [FormBuilder]
    });

    fixture = TestBed.createComponent(UiSelectComponent);
    component = fixture.componentInstance;

    const formBuilder = TestBed.inject(FormBuilder);
    const formGroup: FormGroup = formBuilder.group({
      demo: ['', Validators.required],
    });
    const optionMock = [
        {value: "test1", label: 'test1'},
        {value: "test2", label: 'test2'},
        {value: "test3", label: 'test3', disabled: true},
        {value: "test4", label: 'test4'},
    ]
    component.styleClass = "w-full";
    component.inputConfig = {
      labelAndPlaceholderVariable: 'demo',
      isLabelLeftSide: true,
      formControl: formGroup.get('demo') as FormControl,
      options: optionMock,
      formValidateType: ['required'],
      isDisabled: false
    };
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.styleClass).toBe('w-full');
    expect(component.inputConfig.labelAndPlaceholderVariable).toBe('demo');
    expect(component.inputConfig.isLabelLeftSide).toBe(true);
    expect(component.inputConfig.options).toEqual([
        {value: "test1", label: 'test1'},
        {value: "test2", label: 'test2'},
        {value: "test3", label: 'test3', disabled: true},
        {value: "test4", label: 'test4'},
    ]);
    expect(component.inputConfig.formControl instanceof FormControl).toBeTruthy();
    expect(component.inputConfig.formValidateType.length).toBe(1);
    expect(component.inputConfig.isDisabled).toBe(false);
    expect(component.label).toBe('demo');
    expect(component.placeholder).toBe('กรุณาเลือก');
    expect(component.isRequired).toBe(true);
    expect(component.isInvalid).toBe(false);
    expect(component.clicked).toBe(false);
  });

  it('should set error message correctly', () => {
    component.inputConfig.formControl.setValue(null);
    component.setErrorMessage();
    component.checkClick();
    component.onFormControlChange();
    component.inputConfig.formControl.markAsTouched();

    expect(component.checkInvalid()).toBe(true);
    expect(component.errorMessage).toBe('กรุณาเลือก');
    expect(component.inputConfig.formControl.invalid).toBe(true);
  });

  it('should disable form control when isDisabled is true', () => {
    component.inputConfig.isDisabled = true;
    component.ngOnInit();

    expect(component.inputConfig.formControl.disabled).toBe(true);
  });

  it('should enable form control when isDisabled is false', () => {
    component.inputConfig.isDisabled = false;
    component.ngOnInit();

    expect(component.inputConfig.formControl.enabled).toBe(true);
  });
});
