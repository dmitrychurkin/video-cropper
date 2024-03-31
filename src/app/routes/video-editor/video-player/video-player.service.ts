import { ElementRef, Injectable, inject } from '@angular/core';
import { VideoPlayer } from './video-player';
import type { VideoPlayer as IVideoPlayer } from './video-player.interface';
import videojs from 'video.js';
import { VideoEditor } from '../shared/video-editor';

@Injectable({
    providedIn: 'root'
})
export class VideoPlayerService extends VideoPlayer implements IVideoPlayer {
    readonly #videoEditor = inject(VideoEditor);

    public override make(videoElementRef: ElementRef<HTMLVideoElement>): void {
        const videoSource = this.#videoEditor.videoSource();

        const player = videojs(videoElementRef.nativeElement, {
            sources: [videoSource.fileSrc]
        });

        player.one('loadedmetadata', () => {
            this.#videoEditor.videoPlayer = player;
        });

        this.player = player;
    }

    public override dispose(): void {
        this.player?.dispose();
    }
}
