import type videojs from "video.js";
import type { VideoPlayer as IVideoPlayer } from "./video-player.interface";
import type { ElementRef } from "@angular/core";

export abstract class VideoPlayer implements IVideoPlayer {
    public player!: ReturnType<typeof videojs>;

    public abstract make(elRef: ElementRef<HTMLVideoElement>): void;

    public abstract dispose(): void;
}
