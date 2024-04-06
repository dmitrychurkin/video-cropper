import { Injectable } from '@angular/core';
import { dirname, extname, resolve } from '@tauri-apps/api/path';
import { ProcessingFileName } from './video-editor-settings';
import { VideoEditorModel } from './video-editor-model';
import type { VideoEditorModel as IVideoEditorModel } from './video-editor-model.interface';

@Injectable({
    providedIn: 'root'
})
export class VideoEditorModelService extends VideoEditorModel implements IVideoEditorModel {
    public get isEmpty(): boolean {
        return !this.inputPath;
    }

    public get childProcessCode(): number | null {
        return this.childProcess?.code ?? null;
    }

    public get videoDuration(): number {
        return this.player?.duration() || 0;
    }

    public get outputPath(): Promise<string> {
        return Promise.all([
            dirname(this.inputPath),
            extname(this.inputPath)
        ]).then(([dir, extension]) => resolve(
            dir,
            [
                ProcessingFileName.Output,
                extension
            ].join('.')
        ));
    }
}
