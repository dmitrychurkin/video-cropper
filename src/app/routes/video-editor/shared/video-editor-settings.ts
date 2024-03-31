import type { ChildProcess } from "@tauri-apps/api/shell";
import type videojs from "video.js";

export type VideoSourceParams = {
    readonly inputPath: string;
    readonly fileSrc: string;
    readonly childProcess?: ChildProcess | null;
    readonly player?: ReturnType<typeof videojs> | null;
};

export interface VideoSource extends VideoSourceParams {
    update(params: Partial<VideoSourceParams>): VideoSource;

    getOutputPath(): Promise<string>;

    isEmpty(): boolean;

    hasResult(): boolean;

    getChildProcessCode(): number | null;

    getVideoDuration(): number;
};

export type TrimFileSettings = {
    readonly startTimeMilliseconds: number;
    readonly endTimeMilliseconds: number;
};

export const enum ProcessingFileName {
    Input = 'input',
    Output = 'output'
};

export enum ExecStatusCode {
    Success = 0
};
