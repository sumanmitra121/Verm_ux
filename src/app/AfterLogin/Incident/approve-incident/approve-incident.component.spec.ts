import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveIncidentComponent } from './approve-incident.component';

describe('ApproveIncidentComponent', () => {
  let component: ApproveIncidentComponent;
  let fixture: ComponentFixture<ApproveIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveIncidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
