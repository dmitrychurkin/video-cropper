import type { VideoEditorModel as VideoEditorModelType } from './video-editor-model.type';

export interface VideoEditorModel {
    readonly isEmpty: boolean;

    readonly outputPath: Promise<string>;

    readonly childProcessCode: number | null;

    readonly videoDuration: number;

    update(params: Partial<VideoEditorModelType>): void;

    reset(): void;
};