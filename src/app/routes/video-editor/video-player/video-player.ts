
import type { VideoEditorModel } from "../shared/video-editor-model.type";
import type { VideoPlayer as IVideoPlayer } from "./video-player.interface";
import type { ElementRef } from "@angular/core";

export abstract class VideoPlayer implements IVideoPlayer {
    protected player: VideoEditorModel['player'];

    public abstract make(elRef: ElementRef<HTMLVideoElement>): void;

    public abstract dispose(): void;
}
