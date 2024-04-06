import type { OpenDialogOptions } from "@tauri-apps/api/dialog";
import type { VideoEditor as IVideoEditor } from "./video-editor.interface";
import type { TrimFileSettings } from "./video-editor-settings";

export abstract class VideoEditor implements IVideoEditor {
    public abstract selectVideoFile(openDialogOptions?: OpenDialogOptions): Promise<void>;

    public abstract trimVideoFile(settings: TrimFileSettings): Promise<void>;

    public abstract saveVideoFile(): Promise<void>;
}
