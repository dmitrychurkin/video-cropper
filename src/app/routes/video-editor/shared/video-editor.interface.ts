import type { OpenDialogOptions } from "@tauri-apps/api/dialog";
import type { TrimFileSettings } from "./video-editor-settings";

export interface VideoEditor {
    selectVideoFile(openDialogOptions?: OpenDialogOptions): Promise<void>;

    trimVideoFile(settings: TrimFileSettings): Promise<void>;

    saveVideoFile(): Promise<void>;
}
