import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaddashboardComponent } from './uploaddashboard.component';

describe('UploaddashboardComponent', () => {
  let component: UploaddashboardComponent;
  let fixture: ComponentFixture<UploaddashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploaddashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaddashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
