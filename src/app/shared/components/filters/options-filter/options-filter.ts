import {Component, Input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-options-filter',
  imports: [
    MatIcon
  ],
  templateUrl: './options-filter.html',
  styleUrl: './options-filter.css'
})
export class OptionsFilter {
  @Input() title: string | undefined;
  @Input() options: string[] | undefined;
  @Input() savedValues: string[] | undefined;
  values: { option: string, isSelected: boolean }[] = [];
  selectedOptions: string[] = [];
  isActive: boolean = false;

  ngOnInit(): void {
    if (!this.options) return;

    if (this.savedValues !== undefined) {
      this.values = this.options.map(option => ({
        option,
        isSelected: this.savedValues!.includes(option)
      }));
    } else {
      this.values = this.options.map(option => ({
        option,
        isSelected: true
      }));
    }

    this.selectedOptions = this.values
      .filter(value => value.isSelected)
      .map(value => value.option);
  }

  toggleActive(): void {
    this.isActive = !this.isActive;
  }

  toggleOption(value: { option: string, isSelected: boolean }): void {
    value.isSelected = !value.isSelected;
    if (value.isSelected) {
      this.selectedOptions.push(value.option);
    } else {
      this.selectedOptions = this.selectedOptions.filter(option => option != value.option);
    }
  }

  deselectOption(option: string): void {
    const item = this.values.find(value => value.option === option);
    if (item) {
      item.isSelected = false;
      this.selectedOptions = this.selectedOptions.filter(option => option != item.option);
    }
  }

  getSelectedValues(): string[] {
    return this.selectedOptions;
  }

  reset(): void {
    this.values.forEach(value => value.isSelected = true);
    this.values.forEach((value: { option: string, isSelected: boolean }): void => {
      this.selectedOptions.push(value.option);
    })
  }

  clean(): void {
    this.values.forEach(value => value.isSelected = false);
    this.selectedOptions = [];
  }
}
