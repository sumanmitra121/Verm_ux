import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminDepartmentComponent } from './add-admin-department.component';

describe('AddAdminDepartmentComponent', () => {
  let component: AddAdminDepartmentComponent;
  let fixture: ComponentFixture<AddAdminDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
