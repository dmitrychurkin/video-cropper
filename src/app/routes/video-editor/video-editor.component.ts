import { Component, inject } from '@angular/core';
import { VideoUploaderComponent } from './video-uploader/video-uploader.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoTrimmerComponent } from './video-trimmer/video-trimmer.component';
import { VideoDownloaderComponent } from './video-downloader/video-downloader.component';
import { VideoEditor } from './shared/video-editor';
import { VideoEditorService } from './shared/video-editor.service';
import { ExecStatusCode } from './shared/video-editor-settings';

@Component({
    selector: 'app-video-editor',
    standalone: true,
    imports: [
        VideoUploaderComponent,
        VideoPlayerComponent,
        VideoTrimmerComponent,
        VideoDownloaderComponent
    ],
    templateUrl: './video-editor.component.html',
    styleUrl: './video-editor.component.css',
    providers: [
        {
            provide: VideoEditor,
            useClass: VideoEditorService
        }
    ]
})
export class VideoEditorComponent {
    public readonly ExecStatusCode = ExecStatusCode;

    public readonly videoEditor = inject(VideoEditor);
}
