import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-carousel',
    imports: [
        NgOptimizedImage,
        MatIcon
    ],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css'
})
export class Carousel {
  @Input() images: string[] | undefined;
  @Input() isAnimated: boolean = true;
  currentIndex: number = 0;
  private intervalId: any;


  ngOnInit(): void {
    if (this.isAnimated) {
      this.resetInterval(3000);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  resetInterval(delay: number): void {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.next(false), delay);
  }

  selectImage(index: number): void {
    this.currentIndex = index;
    if (this.isAnimated) {
      this.resetInterval(6000);
    }
  }

  next(isActive: boolean): void {
    if (this.images?.length) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      if (isActive && this.isAnimated) {
        this.resetInterval(6000);
      }
    }
  }

  prev(isActive: boolean): void {
    if (this.images?.length) {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      if (isActive && this.isAnimated) {
        this.resetInterval(6000);
      }
    }
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }
}
