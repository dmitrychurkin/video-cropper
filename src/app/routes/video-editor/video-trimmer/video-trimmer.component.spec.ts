import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTrimmerComponent } from './video-trimmer.component';

describe('VideoTrimmerComponent', () => {
  let component: VideoTrimmerComponent;
  let fixture: ComponentFixture<VideoTrimmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoTrimmerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoTrimmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
