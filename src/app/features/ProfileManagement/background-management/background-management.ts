import {Component, Input} from '@angular/core';
import {SectionGlass} from "../../../shared/components/section-glass/section-glass";
import {BackgroundValues} from '../../../core/constants/background.constants';
import {UserHttpService} from '../../../core/services/http/user-http.service';
import {SessionService} from '../../../core/services/session/session.service';
import {UpdateUser, User} from '../../../core/models/user';
import {finalize, Subject, takeUntil} from 'rxjs';
import {SessionData} from '../../../core/models/session-data';

@Component({
  selector: 'app-background-management',
    imports: [
        SectionGlass
    ],
  templateUrl: './background-management.html',
  styleUrl: './background-management.css'
})
export class BackgroundManagement {
  @Input() user: User | undefined;
  backgrounds = BackgroundValues;
  currentBackground: string | undefined;
  private isUpdating = false;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private userHttpService: UserHttpService,
              protected sessionService: SessionService) {
  }

  ngOnInit(): void {
    if (this.user != undefined) {
      this.currentBackground = this.user.background ?? 'background-1.jpg';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBackgroundChange(background: string): void {
    if (background === this.currentBackground || this.isUpdating) return;

    this.isUpdating = true;

    const body: UpdateUser = {
      background : background
    };

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

          this.applyBackgroundClass(background)
          this.currentBackground = background;
        }
      });
  }

  private applyBackgroundClass(background: string): void {
    const main: HTMLElement = document.querySelector(".main-page__background") as HTMLElement;
    main.style.backgroundImage = `url(/backgrounds/${background})`;
  }
}
