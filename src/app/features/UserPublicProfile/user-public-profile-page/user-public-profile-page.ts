import { Component } from '@angular/core';
import {SectionGlass} from '../../../shared/components/section-glass/section-glass';
import {User} from '../../../core/models/user';
import {UserHttpService} from '../../../core/services/http/user-http.service';
import {ActivatedRoute} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-user-public-profile-page',
  imports: [
    SectionGlass
  ],
  templateUrl: './user-public-profile-page.html',
  styleUrl: './user-public-profile-page.css'
})
export class UserPublicProfilePage {
  user: User | undefined = undefined;
  indexImage: number = 0;
  indexAvatar: number = 0;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private userHttpService: UserHttpService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: any): void => {
        const id = params.get('id');
        this.getUser(id);
        this.indexImage = Math.floor(Math.random() * 7) + 1;
        this.indexAvatar = Math.floor(Math.random() * 7) + 1;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getUser(id: number): void {
    this.userHttpService.getUser(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: User): void => {
          this.user = result;
        },
        error: (err: Error): void => {
          this.user = {
            id: 1,
            email: "ignacio@example.com",
            password: '',
            firstName: 'Ignacio',
            lastName: 'Chacon',
            phone: '1234567890',
            address: 'sad asjda ksjdnkasjdkasj da',
            createdAt: '',
            updatedAt: '',
            sentMessages: [],
            receivedMessages: [],
            ownedPets: [],
            sentPetitions: []
          }
        }
      });
  }
}
