import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoEditorComponent } from './video-editor.component';

describe('VideoEditorComponent', () => {
  let component: VideoEditorComponent;
  let fixture: ComponentFixture<VideoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
