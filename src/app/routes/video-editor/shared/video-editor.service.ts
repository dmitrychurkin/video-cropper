import { Injectable, inject } from '@angular/core';
import { renameFile } from '@tauri-apps/api/fs';
import { open, message, save } from '@tauri-apps/api/dialog';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { VideoEditor } from './video-editor';
import type { VideoEditor as IVideoEditor } from './video-editor.interface';
import type { OpenDialogOptions } from '@tauri-apps/api/dialog';
import { VideoEditorModel } from './video-editor-model';
import { ExecStatusCode, type TrimFileSettings } from './video-editor-settings';
import { Command } from '@tauri-apps/api/shell';
import { msToHMS } from '@app/util';

@Injectable({
    providedIn: 'root'
})
export class VideoEditorService extends VideoEditor implements IVideoEditor {
    readonly #model = inject(VideoEditorModel);

    public override async selectVideoFile({
        title = this.#getDialogTitle('Select video file'),
        filters = [
            {
                name: 'video',
                extensions: ['mp4', 'avi']
            }
        ]
    }: OpenDialogOptions = {}) {
        const inputPath = await open({
            title,
            filters,
            multiple: false
        });

        if (typeof inputPath === 'string') {
            this.#model.update({
                inputPath,
                fileSrc: convertFileSrc(inputPath)
            });
        }
    }

    public override async trimVideoFile({
        startTimeMilliseconds,
        endTimeMilliseconds
    }: TrimFileSettings): Promise<void> {
        const command = Command.sidecar(
            'external/bin/ffmpeg',
            [
                '-i',
                this.#model.inputPath,
                '-ss',
                msToHMS(startTimeMilliseconds),
                '-to',
                msToHMS(endTimeMilliseconds),
                await this.#model.outputPath
            ]
        );

        const childProcess = await command.execute();

        this.#model.childProcess = childProcess;

        if (Object.is(childProcess.code, ExecStatusCode.Success)) {
            return;
        }

        return message('Something went wrong while trimming video clip, please try again', {
            title: this.#getDialogTitle('Processing Error'),
            type: 'error'
        });
    }

    public override async saveVideoFile(): Promise<void> {
        const defaultPath = await this.#model.outputPath;

        const path = await save({
            defaultPath,
            title: this.#getDialogTitle('Download trimmed file')
        });

        if (path) {
            await renameFile(defaultPath, path);
        }

        this.#model.reset();
    }

    #getDialogTitle(title: string) {
        return `Video Cropper | ${title}`;
    }
}
