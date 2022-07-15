import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLEEComponent } from './login-lee.component';

describe('LoginLEEComponent', () => {
  let component: LoginLEEComponent;
  let fixture: ComponentFixture<LoginLEEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginLEEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginLEEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
