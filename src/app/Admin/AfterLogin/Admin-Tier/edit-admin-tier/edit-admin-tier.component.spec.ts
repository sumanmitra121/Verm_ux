import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminTierComponent } from './edit-admin-tier.component';

describe('EditAdminTierComponent', () => {
  let component: EditAdminTierComponent;
  let fixture: ComponentFixture<EditAdminTierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminTierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
