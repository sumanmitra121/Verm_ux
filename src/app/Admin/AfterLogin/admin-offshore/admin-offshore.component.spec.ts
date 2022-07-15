import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOffshoreComponent } from './admin-offshore.component';

describe('AdminOffshoreComponent', () => {
  let component: AdminOffshoreComponent;
  let fixture: ComponentFixture<AdminOffshoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOffshoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOffshoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
