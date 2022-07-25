import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminEmployeeComponent } from './edit-admin-employee.component';

describe('EditAdminEmployeeComponent', () => {
  let component: EditAdminEmployeeComponent;
  let fixture: ComponentFixture<EditAdminEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
