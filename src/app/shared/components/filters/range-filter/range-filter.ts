import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-range-filter',
  imports: [],
  templateUrl: './range-filter.html',
  styleUrl: './range-filter.css'
})
export class RangeFilter {
  @Input() title: string | undefined;
  @Input() minValue: number | undefined;
  @Input() maxValue: number | undefined;
  @Input() savedValue: number | undefined;

  value: number | undefined;

  ngOnInit(): void {
    if (this.maxValue != undefined && this.minValue != undefined) {
      this.value = this.maxValue;
    }
    if (this.savedValue != undefined) {
      this.value = this.savedValue;
    }
  }

  reset(): void {
    if (this.maxValue != undefined) {
      this.value = this.maxValue;
    }
  }

  changeValue(event: Event): void {
    const value = event.target as HTMLInputElement;
    this.value = value.valueAsNumber;
  }

  getValue(): number {
    return this.value ?? this.maxValue ?? 0;
  }
}
