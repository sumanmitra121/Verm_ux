import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormschecklistfilesComponent } from './formschecklistfiles.component';

describe('FormschecklistfilesComponent', () => {
  let component: FormschecklistfilesComponent;
  let fixture: ComponentFixture<FormschecklistfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormschecklistfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormschecklistfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
