import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTierComponent } from './admin-tier.component';

describe('AdminTierComponent', () => {
  let component: AdminTierComponent;
  let fixture: ComponentFixture<AdminTierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
