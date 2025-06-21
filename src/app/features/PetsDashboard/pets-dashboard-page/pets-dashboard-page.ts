import {Component} from '@angular/core';
import {IconBtn} from "../../../shared/components/buttons/icon-btn/icon-btn";
import {Paginator} from "../../../shared/components/paginator/paginator";
import {SectionGlass} from "../../../shared/components/section-glass/section-glass";
import {MatDialog} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import {PetList} from '../../../shared/components/pet-list/pet-list';
import {Pet} from '../../../core/models/pet';
import {finalize, Subject, takeUntil, tap} from 'rxjs';
import {PetHttpService} from '../../../core/services/http/pet-http.service';
import {LoaderService} from '../../../core/services/components/loader-service';
import {ActivatedRoute} from '@angular/router';
import {PetQueryParams} from '../../../core/models/pet-query-params';
import {Page} from '../../../core/models/page';
import {PetSearchFilters} from '../pet-search-filters/pet-search-filters';

@Component({
  selector: 'app-pets-dashboard-page',
  imports: [
    IconBtn,
    Paginator,
    SectionGlass,
    PetList
  ],
  templateUrl: './pets-dashboard-page.html',
  styleUrl: './pets-dashboard-page.css'
})
export class PetsDashboardPage {
  totalPages: number = 0;
  pets: Pet[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog,
              private overlay: Overlay,
              private petHttpService: PetHttpService,
              private loaderService: LoaderService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$),
        tap((params: any) => this.getPets(params)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openModal(): void {
    this.dialog.open(PetSearchFilters, {
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
  }

  getPets(params: PetQueryParams): void {
    this.loaderService.show();

    this.petHttpService.getPets(params)
      .pipe(finalize((): void => this.loaderService.hide()))
      .subscribe((page: Page<Pet>): void => {
        this.pets = page.content;
        this.totalPages = page.totalPages;
      });
  }
}
