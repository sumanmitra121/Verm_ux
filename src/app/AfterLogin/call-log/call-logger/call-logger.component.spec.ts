import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLoggerComponent } from './call-logger.component';

describe('CallLoggerComponent', () => {
  let component: CallLoggerComponent;
  let fixture: ComponentFixture<CallLoggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallLoggerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
