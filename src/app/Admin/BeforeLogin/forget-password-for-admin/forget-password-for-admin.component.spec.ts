import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordForAdminComponent } from './forget-password-for-admin.component';

describe('ForgetPasswordForAdminComponent', () => {
  let component: ForgetPasswordForAdminComponent;
  let fixture: ComponentFixture<ForgetPasswordForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPasswordForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
