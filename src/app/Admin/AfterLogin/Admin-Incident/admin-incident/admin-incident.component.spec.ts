import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIncidentComponent } from './admin-incident.component';

describe('AdminIncidentComponent', () => {
  let component: AdminIncidentComponent;
  let fixture: ComponentFixture<AdminIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIncidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
