import { Injectable } from '@angular/core';
import { extname } from '@tauri-apps/api/path';
import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';
import { open, message, save } from '@tauri-apps/api/dialog';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { VideoEditor } from './video-editor';
import type { VideoEditor as IVideoEditor } from './video-editor.interface';
import type { OpenDialogOptions } from '@tauri-apps/api/dialog';
import { ExecStatusCode, TrimFileSettings } from './video-editor-settings';
import { Command } from '@tauri-apps/api/shell';
import { VideoSource } from './video-source';
import { msToHMS } from '@app/util';

@Injectable({
    providedIn: 'root'
})
export class VideoEditorService extends VideoEditor implements IVideoEditor {
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
            this.videoSource.set(new VideoSource({
                inputPath,
                fileSrc: convertFileSrc(inputPath)
            }));
        }
    }

    public override async trimVideoFile({
        startTimeMilliseconds,
        endTimeMilliseconds
    }: TrimFileSettings): Promise<void> {
        const videoSource = this.videoSource();

        const command = Command.sidecar(
            'external/bin/ffmpeg',
            [
                '-i',
                videoSource.inputPath,
                '-ss',
                msToHMS(startTimeMilliseconds),
                '-to',
                msToHMS(endTimeMilliseconds),
                await videoSource.getOutputPath()
            ]
        );

        const childProcess = await command.execute();

        this.videoSource.update(videoSource => videoSource.update({
            childProcess
        }));

        if (Object.is(childProcess.code, ExecStatusCode.Success)) {
            return;
        }

        return message('Something went wrong while trimming video clip, please try again', {
            title: this.#getDialogTitle('Processing Error'),
            type: 'error'
        });
    }

    public override async saveVideoFile(): Promise<void> {
        await save({
            defaultPath: await this.videoSource()
                .getOutputPath(),
            title: this.#getDialogTitle('Download trimmed file')
        });

        this.videoSource.set(new VideoSource);
    }

    #getDialogTitle(title: string) {
        return `Video Cropper | ${title}`;
    }
}
