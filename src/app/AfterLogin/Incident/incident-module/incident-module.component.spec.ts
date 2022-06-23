import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentModuleComponent } from './incident-module.component';

describe('IncidentModuleComponent', () => {
  let component: IncidentModuleComponent;
  let fixture: ComponentFixture<IncidentModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
