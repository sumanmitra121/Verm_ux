import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioVideoConferenceComponent } from './audio-video-conference.component';

describe('AudioVideoConferenceComponent', () => {
  let component: AudioVideoConferenceComponent;
  let fixture: ComponentFixture<AudioVideoConferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioVideoConferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioVideoConferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
