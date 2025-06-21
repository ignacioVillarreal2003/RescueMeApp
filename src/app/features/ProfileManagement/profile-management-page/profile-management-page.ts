import { Component } from '@angular/core';
import {PersonalDataManagement} from '../personal-data-management/personal-data-management';
import {PasswordManagement} from '../password-management/password-management';
import {ThemeManagement} from '../theme-management/theme-management';
import {BackgroundManagement} from '../background-management/background-management';
import {User} from '../../../core/models/user';
import {SessionService} from '../../../core/services/session/session.service';
import {Message} from '../../../core/models/message';
import {Pet} from '../../../core/models/pet';
import {Petition} from '../../../core/models/petition';

@Component({
  selector: 'app-profile-management-page',
  imports: [
    PersonalDataManagement,
    PasswordManagement,
    ThemeManagement,
    BackgroundManagement
  ],
  templateUrl: './profile-management-page.html',
  styleUrl: './profile-management-page.css'
})
export class ProfileManagementPage {
  user: User | undefined;

  constructor(private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.user = this.sessionService.session()?.user;
  }
}
