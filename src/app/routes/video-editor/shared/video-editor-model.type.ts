import type { ChildProcess } from "@tauri-apps/api/shell";
import type videojs from 'video.js';

export type VideoEditorModel = {
    readonly inputPath: string;

    readonly fileSrc: string;

    readonly childProcess?: ChildProcess | null;

    readonly player?: ReturnType<typeof videojs> | null;
};
