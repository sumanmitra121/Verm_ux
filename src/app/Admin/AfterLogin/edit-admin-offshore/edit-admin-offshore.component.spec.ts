import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminOffshoreComponent } from './edit-admin-offshore.component';

describe('EditAdminOffshoreComponent', () => {
  let component: EditAdminOffshoreComponent;
  let fixture: ComponentFixture<EditAdminOffshoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminOffshoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminOffshoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
