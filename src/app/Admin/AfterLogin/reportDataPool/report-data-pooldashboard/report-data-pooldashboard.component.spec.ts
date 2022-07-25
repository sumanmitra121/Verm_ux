import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDataPooldashboardComponent } from './report-data-pooldashboard.component';

describe('ReportDataPooldashboardComponent', () => {
  let component: ReportDataPooldashboardComponent;
  let fixture: ComponentFixture<ReportDataPooldashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDataPooldashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDataPooldashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
