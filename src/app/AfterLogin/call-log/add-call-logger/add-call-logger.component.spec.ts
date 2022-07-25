import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCallLoggerComponent } from './add-call-logger.component';

describe('AddCallLoggerComponent', () => {
  let component: AddCallLoggerComponent;
  let fixture: ComponentFixture<AddCallLoggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCallLoggerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCallLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
