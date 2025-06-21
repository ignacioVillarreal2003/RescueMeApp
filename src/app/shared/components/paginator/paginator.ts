import {Component, Input} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-paginator',
  imports: [
    MatIcon
  ],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css'
})
export class Paginator {
  @Input() totalPages: number | undefined;
  currentPage: number = 1;
  maxButtons: number = 7;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  private resizeListener = () => {
    this.maxButtons = window.innerWidth < 800 ? 5 : 7;
  };

  ngOnInit(): void {
    this.resizeListener();
    window.addEventListener('resize', this.resizeListener);
    this.route.queryParams.subscribe((params: Params): void => {
      const pageParam: number = parseInt(params['page']);
      if (!isNaN(pageParam)) {
        this.currentPage = pageParam;
      }
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  getPages(): number[] {
    if (this.totalPages) {
      const half: number = Math.floor(this.maxButtons / 2);

      let start: number = Math.max(this.currentPage - half, 1);
      let end: number = Math.min(start + this.maxButtons - 1, this.totalPages);

      start = Math.max(end - this.maxButtons + 1, 1);

      const pages: number[] = [];
      for (let i: number = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
    return [];
  }

  setPage(page: number): void {
    if (this.totalPages && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.goToPage();
    }
  }

  goToNextPage(): void {
    if (this.totalPages && this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.goToPage();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.goToPage();
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.goToPage();
  }

  goToLastPage(): void {
    if (this.totalPages) {
      this.currentPage = this.totalPages;
      this.goToPage();
    }
  }

  goToPage(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge'
    });
  }
}
