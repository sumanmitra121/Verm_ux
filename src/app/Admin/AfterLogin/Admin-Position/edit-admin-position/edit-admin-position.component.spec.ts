import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminPositionComponent } from './edit-admin-position.component';

describe('EditAdminPositionComponent', () => {
  let component: EditAdminPositionComponent;
  let fixture: ComponentFixture<EditAdminPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
