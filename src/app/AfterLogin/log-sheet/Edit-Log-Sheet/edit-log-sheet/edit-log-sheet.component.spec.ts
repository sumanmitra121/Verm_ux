import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLogSheetComponent } from './edit-log-sheet.component';

describe('EditLogSheetComponent', () => {
  let component: EditLogSheetComponent;
  let fixture: ComponentFixture<EditLogSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLogSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLogSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
