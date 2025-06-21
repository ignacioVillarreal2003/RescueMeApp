import { Component } from '@angular/core';
import {User} from '../../../core/models/user';
import {UserHttpService} from '../../../core/services/http/user-http.service';
import {ActivatedRoute} from '@angular/router';
import {SectionGlass} from '../../../shared/components/section-glass/section-glass';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile-public-page',
  imports: [
    SectionGlass,
    NgIf
  ],
  templateUrl: './profile-public-page.html',
  styleUrl: './profile-public-page.css'
})
export class ProfilePublicPage {
  user: User | undefined = undefined;
  indexImage: number = 0;
  indexAvatar: number = 0;

  constructor(private userHttpService: UserHttpService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    /*this.getUser();*/
    this.indexImage = Math.floor(Math.random() * 7) + 1;
    this.indexAvatar = Math.floor(Math.random() * 7) + 1;
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

  getUser(): void {
    this.route.paramMap.subscribe((params: any): void => {
      const id = params.get('id');
      this.userHttpService.getUser(id).subscribe({
        next: (result: User): void => {
          this.user = result;
        },
        error: (error: Error): void => {
/*
          this.alertService.showError('Error getting user. Please try again later.');
*/
        }
      });
    });
  }
}
