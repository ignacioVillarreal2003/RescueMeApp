import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageItem } from './message-item';

describe('MessageItem', () => {
  let component: MessageItem;
  let fixture: ComponentFixture<MessageItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
