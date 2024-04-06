import { signal } from '@angular/core';
import type { VideoEditorModel as VideoEditorModelType } from './video-editor-model.type';
import type { VideoEditorModel as IVideoEditorModel } from './video-editor-model.interface';

export abstract class VideoEditorModel implements VideoEditorModelType, IVideoEditorModel {
    static get #defaults(): VideoEditorModelType {
        return {
            inputPath: '',
            fileSrc: '',
            childProcess: null,
            player: null
        };
    }

    #model = signal<VideoEditorModelType>(VideoEditorModel.#defaults);

    public get inputPath(): VideoEditorModelType['inputPath'] {
        return this.#model().inputPath;
    };

    public set inputPath(inputPath: VideoEditorModelType['inputPath']) {
        this.#model.update(model => ({
            ...model,
            inputPath
        }));
    };

    public get fileSrc(): VideoEditorModelType['fileSrc'] {
        return this.#model().fileSrc;
    };

    public set fileSrc(fileSrc: VideoEditorModelType['fileSrc']) {
        this.#model.update(model => ({
            ...model,
            fileSrc
        }));
    };

    public get childProcess(): VideoEditorModelType['childProcess'] {
        return this.#model().childProcess;
    };

    public set childProcess(childProcess: VideoEditorModelType['childProcess']) {
        this.#model.update(model => ({
            ...model,
            childProcess
        }));
    };

    public get player(): VideoEditorModelType['player'] {
        return this.#model().player;
    };

    public set player(player: VideoEditorModelType['player']) {
        this.#model.update(model => ({
            ...model,
            player
        }));
    };

    public reset(): void {
        this.#model.set(VideoEditorModel.#defaults);
    }

    public update(params: Partial<VideoEditorModelType>): void {
        this.#model.update(model => ({
            ...model,
            ...params
        }));
    }

    public abstract readonly isEmpty: boolean;

    public abstract readonly childProcessCode: number | null;

    public abstract readonly videoDuration: number;

    public abstract readonly outputPath: Promise<string>;
}
