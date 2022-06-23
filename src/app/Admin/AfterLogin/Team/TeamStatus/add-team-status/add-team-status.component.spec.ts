import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamStatusComponent } from './add-team-status.component';

describe('AddTeamStatusComponent', () => {
  let component: AddTeamStatusComponent;
  let fixture: ComponentFixture<AddTeamStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeamStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeamStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
