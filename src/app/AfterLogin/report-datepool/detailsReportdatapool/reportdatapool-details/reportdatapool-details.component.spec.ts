import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportdatapoolDetailsComponent } from './reportdatapool-details.component';

describe('ReportdatapoolDetailsComponent', () => {
  let component: ReportdatapoolDetailsComponent;
  let fixture: ComponentFixture<ReportdatapoolDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportdatapoolDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportdatapoolDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
