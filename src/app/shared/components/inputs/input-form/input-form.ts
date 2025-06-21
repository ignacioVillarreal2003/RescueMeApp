import {Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-input-form',
  imports: [],
  templateUrl: './input-form.html',
  styleUrl: './input-form.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputForm),
      multi: true
    }
  ]
})
export class InputForm {
  id: string = `input-${Math.random().toString(36).substr(2, 9)}`;
  @Input() type: 'text' | 'password' | 'number' = 'text';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() error = '';
  value: string = '';
  disabled = false;
  isActive: boolean = false;


  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
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
    this.value = inputElement.value;
    this.onChange(this.value);
    this.isActive = true;
  }
}
