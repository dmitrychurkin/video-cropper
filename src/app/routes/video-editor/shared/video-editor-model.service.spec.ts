import { TestBed } from '@angular/core/testing';

import { VideoEditorModelService } from './video-editor-model.service';

describe('VideoEditorModelService', () => {
  let service: VideoEditorModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoEditorModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
