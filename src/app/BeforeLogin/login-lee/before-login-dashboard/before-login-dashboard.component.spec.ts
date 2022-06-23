import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeLoginDashboardComponent } from './before-login-dashboard.component';

describe('BeforeLoginDashboardComponent', () => {
  let component: BeforeLoginDashboardComponent;
  let fixture: ComponentFixture<BeforeLoginDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeforeLoginDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeLoginDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
