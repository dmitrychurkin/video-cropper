import {
    Component,
    ViewChild,
    inject,
    type AfterViewInit,
    type ElementRef,
    type OnDestroy
} from '@angular/core';
import { VideoPlayer } from './video-player';
import { VideoPlayerService } from './video-player.service';

@Component({
    selector: 'app-video-player',
    standalone: true,
    imports: [],
    templateUrl: './video-player.component.html',
    styleUrl: './video-player.component.css',
    providers: [
        {
            provide: VideoPlayer,
            useClass: VideoPlayerService
        }
    ]
})
export class VideoPlayerComponent implements AfterViewInit, OnDestroy {
    @ViewChild('videoPlayer', {
        static: false
    })
    public readonly videoPlayer!: ElementRef<HTMLVideoElement>;

    public readonly videoPlayerSettings = {
        maxWidth: 680
    };

    readonly #videoPlayer = inject(VideoPlayer);

    public ngAfterViewInit(): void {
        this.#videoPlayer.make(this.videoPlayer);
    }

    public ngOnDestroy(): void {
        this.#videoPlayer.dispose();
    }
}
