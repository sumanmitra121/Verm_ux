import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsChecklistComponent } from './forms-checklist.component';

describe('FormsChecklistComponent', () => {
  let component: FormsChecklistComponent;
  let fixture: ComponentFixture<FormsChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
