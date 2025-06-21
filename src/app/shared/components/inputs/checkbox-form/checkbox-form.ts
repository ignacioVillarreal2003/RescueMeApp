import {Component, forwardRef, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-checkbox-form',
    imports: [
        NgIf
    ],
  templateUrl: './checkbox-form.html',
  styleUrl: './checkbox-form.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxForm),
      multi: true
    }
  ]
})
export class CheckboxForm {
  id: string = `checkbox-${Math.random().toString(36).substring(2, 9)}`;

  @Input() label = '';

  value: boolean = false;
  disabled: boolean = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateValue(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.checked;
    this.onChange(this.value);
  }
}
