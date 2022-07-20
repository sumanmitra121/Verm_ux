import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminTierComponent } from './add-admin-tier.component';

describe('AddAdminTierComponent', () => {
  let component: AddAdminTierComponent;
  let fixture: ComponentFixture<AddAdminTierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminTierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
