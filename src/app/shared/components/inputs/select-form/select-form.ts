import {Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-select-form',
  imports: [],
  templateUrl: './select-form.html',
  styleUrl: './select-form.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectForm),
      multi: true
    }
  ]
})
export class SelectForm {
  id: string = `select-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label = '';
  @Input() options: string[] = [];
  value: string = '';
  disabled = false;
  isActive = false;

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
    const selectElement = event.target as HTMLSelectElement;
    this.value = selectElement.value;
    this.onChange(this.value);
    this.isActive = true;
  }
}

