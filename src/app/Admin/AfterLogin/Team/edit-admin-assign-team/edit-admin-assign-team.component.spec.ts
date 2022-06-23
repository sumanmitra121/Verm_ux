import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminAssignTeamComponent } from './edit-admin-assign-team.component';

describe('EditAdminAssignTeamComponent', () => {
  let component: EditAdminAssignTeamComponent;
  let fixture: ComponentFixture<EditAdminAssignTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminAssignTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminAssignTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
