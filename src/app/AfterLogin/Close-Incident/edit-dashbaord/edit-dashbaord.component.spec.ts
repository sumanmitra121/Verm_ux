import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDashbaordComponent } from './edit-dashbaord.component';

describe('EditDashbaordComponent', () => {
  let component: EditDashbaordComponent;
  let fixture: ComponentFixture<EditDashbaordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDashbaordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
