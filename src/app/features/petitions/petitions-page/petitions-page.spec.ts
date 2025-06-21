import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitionsPage } from './petitions-page';

describe('PetitionsPage', () => {
  let component: PetitionsPage;
  let fixture: ComponentFixture<PetitionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetitionsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetitionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
