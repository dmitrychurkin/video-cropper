import { signal } from "@angular/core";
import type { OpenDialogOptions } from "@tauri-apps/api/dialog";
import type { VideoEditor as IVideoEditor } from "./video-editor.interface";
import type { TrimFileSettings, VideoSource as IVideoSource, VideoSourceParams } from "./video-editor-settings";
import { VideoSource } from "./video-source";

export abstract class VideoEditor implements IVideoEditor {
    public readonly videoSource = signal<IVideoSource>(new VideoSource);

    public get videoPlayer(): VideoSourceParams['player'] {
        return this.videoSource().player;
    }

    public set videoPlayer(player: VideoSourceParams['player']) {
        this.videoSource.update(videoSource => videoSource.update({
            player
        }));
    }

    public abstract selectVideoFile(openDialogOptions?: OpenDialogOptions): Promise<void>;

    public abstract trimVideoFile(settings: TrimFileSettings): Promise<void>;

    public abstract saveVideoFile(): Promise<void>;
}
