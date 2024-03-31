import { Component, inject, signal } from '@angular/core';
import { VideoUploaderComponent } from './video-uploader/video-uploader.component';
import { VideoEditor } from './shared/video-editor';
import { VideoEditorService } from './shared/video-editor.service';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoTrimmerComponent } from './video-trimmer/video-trimmer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExecStatusCode } from './shared/video-editor-settings';
import { Processor } from './shared/processor';

@Component({
    selector: 'app-video-editor',
    standalone: true,
    imports: [
        VideoUploaderComponent,
        VideoPlayerComponent,
        VideoTrimmerComponent,
        MatButtonModule,
        MatIconModule
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
export class VideoEditorComponent extends Processor {
    public readonly ExecStatusCode = ExecStatusCode;
    public readonly videoEditor = inject(VideoEditor);

    public save() {
        this.process(() => this.videoEditor.saveVideoFile());
    }
}
