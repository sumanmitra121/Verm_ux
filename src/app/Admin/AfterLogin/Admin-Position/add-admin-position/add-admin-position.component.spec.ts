import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminPositionComponent } from './add-admin-position.component';

describe('AddAdminPositionComponent', () => {
  let component: AddAdminPositionComponent;
  let fixture: ComponentFixture<AddAdminPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
