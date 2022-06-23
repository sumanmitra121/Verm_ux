import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstloggedinchangePasswordComponent } from './firstloggedinchange-password.component';

describe('FirstloggedinchangePasswordComponent', () => {
  let component: FirstloggedinchangePasswordComponent;
  let fixture: ComponentFixture<FirstloggedinchangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstloggedinchangePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstloggedinchangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
