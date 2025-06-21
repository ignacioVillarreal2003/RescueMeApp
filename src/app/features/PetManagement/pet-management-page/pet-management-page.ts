import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {PetContextService} from '../../../core/services/context/pet-context-service';
import {PetHttpService} from '../../../core/services/http/pet-http.service';
import {Pet} from '../../../core/models/pet';
import {LoaderService} from '../../../core/services/components/loader-service';
import {finalize, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-pet-management-page',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './pet-management-page.html',
  styleUrl: './pet-management-page.css'
})
export class PetManagementPage {
  petId: number | undefined;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private petHttpService: PetHttpService,
              private petContextService: PetContextService,
              private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.loaderService.show();

    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.petId = id;
    this.petHttpService.getPet(id)
      .pipe(finalize((): void => this.loaderService.hide()))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: Pet): void => {
          this.petContextService.setPet(result);
        }
      });
  }

  ngOnDestroy(): void {
    this.petContextService.clearPet();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
