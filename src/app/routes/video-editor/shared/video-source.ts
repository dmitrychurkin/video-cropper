import { dirname, extname, resolve } from '@tauri-apps/api/path';
import { ProcessingFileName, type VideoSource as IVideoSource, VideoSourceParams } from './video-editor-settings';
import type { ChildProcess } from '@tauri-apps/api/shell';

export class VideoSource implements IVideoSource {
    public inputPath: string;
    public fileSrc: string;
    public childProcess: ChildProcess | null;

    public constructor({
        inputPath = '',
        fileSrc = '',
        childProcess = null
    }: VideoSourceParams = {} as VideoSourceParams) {
        this.inputPath = inputPath;
        this.fileSrc = fileSrc;
        this.childProcess = childProcess;
    }

    public isEmpty(): boolean {
        return !this.inputPath;
    }

    public hasResult(): boolean {
        return Boolean(this.childProcess);
    }

    public getChildProcessCode(): number | null {
        return this.childProcess?.code ?? null;
    }

    public async getOutputPath(): Promise<string> {
        return resolve(
            await dirname(this.inputPath),
            [
                ProcessingFileName.Output,
                await extname(this.inputPath)
            ].join('.')
        );
    }

    public update(params: Partial<VideoSourceParams>): IVideoSource {
        return new VideoSource({
            ...this,
            ...params
        });
    }
}
