import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlogsheetComponent } from './addlogsheet.component';

describe('AddlogsheetComponent', () => {
  let component: AddlogsheetComponent;
  let fixture: ComponentFixture<AddlogsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddlogsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlogsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
