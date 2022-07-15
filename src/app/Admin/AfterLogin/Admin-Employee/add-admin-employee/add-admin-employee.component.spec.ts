import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminEmployeeComponent } from './add-admin-employee.component';

describe('AddAdminEmployeeComponent', () => {
  let component: AddAdminEmployeeComponent;
  let fixture: ComponentFixture<AddAdminEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
