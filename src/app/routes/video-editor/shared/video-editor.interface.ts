import type { Signal } from "@angular/core";
import type { OpenDialogOptions } from "@tauri-apps/api/dialog";
import type { TrimFileSettings, VideoSource, VideoSourceParams } from "./video-editor-settings";

export interface VideoEditor {
    videoSource: Signal<VideoSource>;

    videoPlayer: VideoSourceParams['player'];

    selectVideoFile(openDialogOptions?: OpenDialogOptions): Promise<void>;

    trimVideoFile(settings: TrimFileSettings): Promise<void>;

    saveVideoFile(): Promise<void>;
}
