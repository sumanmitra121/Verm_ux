import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminOffshoreComponent } from './add-admin-offshore.component';

describe('AddAdminOffshoreComponent', () => {
  let component: AddAdminOffshoreComponent;
  let fixture: ComponentFixture<AddAdminOffshoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminOffshoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminOffshoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
