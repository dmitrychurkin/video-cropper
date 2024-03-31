import type { VideoSourceParams } from "../shared/video-editor-settings";
import type { VideoPlayer as IVideoPlayer } from "./video-player.interface";
import type { ElementRef } from "@angular/core";

export abstract class VideoPlayer implements IVideoPlayer {
    protected player: VideoSourceParams['player'];

    public abstract make(elRef: ElementRef<HTMLVideoElement>): void;

    public abstract dispose(): void;
}
