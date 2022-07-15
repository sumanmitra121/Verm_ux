import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminIncidentComponent } from './edit-admin-incident.component';

describe('EditAdminIncidentComponent', () => {
  let component: EditAdminIncidentComponent;
  let fixture: ComponentFixture<EditAdminIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminIncidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
