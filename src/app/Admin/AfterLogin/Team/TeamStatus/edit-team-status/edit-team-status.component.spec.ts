import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamStatusComponent } from './edit-team-status.component';

describe('EditTeamStatusComponent', () => {
  let component: EditTeamStatusComponent;
  let fixture: ComponentFixture<EditTeamStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeamStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeamStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
