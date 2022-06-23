import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminDepartmentComponent } from './edit-admin-department.component';

describe('EditAdminDepartmentComponent', () => {
  let component: EditAdminDepartmentComponent;
  let fixture: ComponentFixture<EditAdminDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
