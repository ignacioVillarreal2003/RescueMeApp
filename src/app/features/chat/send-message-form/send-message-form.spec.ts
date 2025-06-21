import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessageForm } from './send-message-form';

describe('SendMessageForm', () => {
  let component: SendMessageForm;
  let fixture: ComponentFixture<SendMessageForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendMessageForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendMessageForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
