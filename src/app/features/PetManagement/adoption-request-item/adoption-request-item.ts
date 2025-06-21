import {Component, Input} from '@angular/core';
import {IconBtn} from "../../../shared/components/buttons/icon-btn/icon-btn";
import {SectionGlass} from "../../../shared/components/section-glass/section-glass";
import {Petition, Status, UpdatePetitionStatus} from '../../../core/models/petition';
import {PetitionHttpService} from '../../../core/services/http/petition-http.service';
import {Router} from '@angular/router';
import {NgClass} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {finalize, Subject, takeUntil} from 'rxjs';
import {LoaderService} from '../../../core/services/components/loader-service';

@Component({
  selector: 'app-adoption-request-item',
  imports: [
    IconBtn,
    SectionGlass,
    NgClass,
    MatIcon
  ],
  templateUrl: './adoption-request-item.html',
  styleUrl: './adoption-request-item.css'
})
export class AdoptionRequestItem {
  @Input() petition: Petition | undefined = undefined;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private petitionHttpService: PetitionHttpService,
              private router: Router,
              private loaderService: LoaderService) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToProfile(): void {
    if (this.petition != undefined) {
      this.router.navigate([`/public-profile/${this.petition.requestingUser.id}`]);
    }
  }

  accept(): void {
    if (this.petition != undefined) {
      const body: UpdatePetitionStatus = {
        status: Status.APPROVED
      }
      this.update(body);
    }
  }

  reject(): void {
    if (this.petition != undefined) {
      const body: UpdatePetitionStatus = {
        status: Status.DECLINED
      }
      this.update(body);
    }
  }

  update(body: UpdatePetitionStatus): void {
    if (this.petition != undefined) {
      this.loaderService.show();

      this.petitionHttpService.updateStatus(this.petition.id, body)
        .pipe(finalize((): void => this.loaderService.hide()))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (result: Petition): void => {
            this.petition = result;
          }
        });
    }
  }

  statusClass(status: number): string {
    return Status[status];
  }
}
