import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VideoEditor } from '../shared/video-editor';
import { Processor } from '../shared/processor';

@Component({
  selector: 'app-video-downloader',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './video-downloader.component.html',
  styleUrl: './video-downloader.component.css'
})
export class VideoDownloaderComponent extends Processor {
  public readonly videoEditor = inject(VideoEditor);

    public save() {
        this.process(() => this.videoEditor.saveVideoFile());
    }
}
