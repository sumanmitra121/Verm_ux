import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminIncidentComponent } from './add-admin-incident.component';

describe('AddAdminIncidentComponent', () => {
  let component: AddAdminIncidentComponent;
  let fixture: ComponentFixture<AddAdminIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminIncidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
