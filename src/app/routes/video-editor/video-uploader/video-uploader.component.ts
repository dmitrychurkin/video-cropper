
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VideoEditor } from '../shared/video-editor';

@Component({
  selector: 'app-video-uploader',
  templateUrl: './video-uploader.component.html',
  styleUrl: './video-uploader.component.css',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatIconModule
  ]
})
export class VideoUploaderComponent {
  readonly #videoEditor = inject(VideoEditor);

  public selectVideoFile() {
    return this.#videoEditor.selectVideoFile();
  }
}
