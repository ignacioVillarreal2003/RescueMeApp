import {Component, Input} from '@angular/core';
import {SectionGlass} from "../../../shared/components/section-glass/section-glass";
import {ThemeValues} from '../../../core/constants/theme.constants';
import {UserHttpService} from '../../../core/services/http/user-http.service';
import {SessionService} from '../../../core/services/session/session.service';
import {UpdateUser, User} from '../../../core/models/user';
import {finalize, Subject, takeUntil} from 'rxjs';
import {SessionData} from '../../../core/models/session-data';

@Component({
  selector: 'app-theme-management',
    imports: [
        SectionGlass
    ],
  templateUrl: './theme-management.html',
  styleUrl: './theme-management.css'
})
export class ThemeManagement {
  @Input() user: User | undefined;
  themeList = ThemeValues;
  currentTheme: string | undefined;
  private isUpdating = false;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private userHttpService: UserHttpService,
              protected sessionService: SessionService) {
  }

  ngOnInit(): void {
    if (this.user) {
      this.currentTheme = this.user.theme ?? 'light-default';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onThemeChange(themeValue: string): void {
    if (themeValue === this.currentTheme || this.isUpdating) return;

    this.isUpdating = true;

    const body: UpdateUser = { theme: themeValue };

    this.userHttpService.update(body)
      .pipe((finalize((): void => {
        this.isUpdating = false;
      })))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: User): void => {
          const session: SessionData | undefined = this.sessionService.session();
          if (session) {
            session.user = result;
            this.sessionService.setData(session);
          }

          this.applyThemeClass(themeValue);
          this.currentTheme = themeValue;
        }
      });
  }

  private applyThemeClass(theme: string): void {
    const html = document.documentElement;
    this.themeList.forEach(({ value }) => html.classList.remove(value));
    html.classList.add(theme);
  }
}
