import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationModuleComponent } from './activation-module.component';

describe('ActivationModuleComponent', () => {
  let component: ActivationModuleComponent;
  let fixture: ComponentFixture<ActivationModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
