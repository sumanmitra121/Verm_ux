import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDataPooldetailsComponent } from './report-data-pooldetails.component';

describe('ReportDataPooldetailsComponent', () => {
  let component: ReportDataPooldetailsComponent;
  let fixture: ComponentFixture<ReportDataPooldetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDataPooldetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDataPooldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
