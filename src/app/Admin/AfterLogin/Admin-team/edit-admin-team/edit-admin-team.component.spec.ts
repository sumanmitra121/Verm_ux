import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminTeamComponent } from './edit-admin-team.component';

describe('EditAdminTeamComponent', () => {
  let component: EditAdminTeamComponent;
  let fixture: ComponentFixture<EditAdminTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
