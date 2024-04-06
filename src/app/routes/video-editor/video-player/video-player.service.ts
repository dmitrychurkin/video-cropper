import { Injectable, inject, type ElementRef } from '@angular/core';
import videojs from 'video.js';
import { VideoPlayer } from './video-player';
import type { VideoPlayer as IVideoPlayer } from './video-player.interface';
import { VideoEditorModel } from '../shared/video-editor-model';

@Injectable({
    providedIn: 'root'
})
export class VideoPlayerService extends VideoPlayer implements IVideoPlayer {
    readonly #model = inject(VideoEditorModel);

    public override make(videoElementRef: ElementRef<HTMLVideoElement>): void {
        const player = videojs(videoElementRef.nativeElement, {
            sources: [this.#model.fileSrc]
        });

        player.one('loadedmetadata', () => {
            this.#model.player = player;
        });

        this.player = player;
    }

    public override dispose(): void {
        this.player?.dispose();
    }
}
