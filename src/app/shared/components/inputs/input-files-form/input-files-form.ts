import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input-files-form',
  imports: [],
  templateUrl: './input-files-form.html',
  styleUrl: './input-files-form.css'
})
export class InputFilesForm {
  @Input() multiple: boolean = false;
  label: string = 'Click to upload image';
  @Output() onFilesSelected = new EventEmitter<FileList>();
  selectedFileCount: number = 0;

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    this.selectedFileCount = files?.length ?? 0;
    if (files && files.length > 0) {
      this.onFilesSelected.emit(files);
    }
  }
}
