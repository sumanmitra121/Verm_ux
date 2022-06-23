import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDatepoolComponent } from './report-datepool.component';

describe('ReportDatepoolComponent', () => {
  let component: ReportDatepoolComponent;
  let fixture: ComponentFixture<ReportDatepoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDatepoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDatepoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
