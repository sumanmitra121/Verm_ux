import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPositionComponent } from './admin-position.component';

describe('AdminPositionComponent', () => {
  let component: AdminPositionComponent;
  let fixture: ComponentFixture<AdminPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
