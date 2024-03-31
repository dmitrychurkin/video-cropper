import { TestBed } from '@angular/core/testing';

import { VideoEditorService } from './video-editor.service';

describe('VideoEditorService', () => {
  let service: VideoEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
