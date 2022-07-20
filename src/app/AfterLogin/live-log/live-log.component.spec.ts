import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveLogComponent } from './live-log.component';

describe('LiveLogComponent', () => {
  let component: LiveLogComponent;
  let fixture: ComponentFixture<LiveLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
