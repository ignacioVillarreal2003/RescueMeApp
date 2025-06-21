import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePublicPage } from './profile-public-page';

describe('ProfilePublicPage', () => {
  let component: ProfilePublicPage;
  let fixture: ComponentFixture<ProfilePublicPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePublicPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePublicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
