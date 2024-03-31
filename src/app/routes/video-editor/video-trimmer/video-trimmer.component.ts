import type { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { secToMillisec } from '@app/util';
import { Processor } from '../shared/processor';
import { VideoEditor } from '../shared/video-editor';
import { FormControls, InputName, formValidator, inputValueNormalizer } from './input-value-helpers';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-video-trimmer',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './video-trimmer.component.html',
    styleUrl: './video-trimmer.component.css'
})
export class VideoTrimmerComponent extends Processor implements OnInit, OnDestroy {
    public readonly InputName = InputName;

    public readonly videoTrimmerForm = this.formBuilder.group({
        [InputName.From]: [this.#initialValue],
        [InputName.To]: [this.#initialValue]
    }, { validators: formValidator });

    public get from() {
        return this.videoTrimmerForm.get(InputName.From);
    }

    public get to() {
        return this.videoTrimmerForm.get(InputName.To);
    }

    readonly #getNormalizedValue = (value: string) => {
        const [min, max] = this.#minMax;

        if (Number(value) <= min) {
            return Math.max(Number(value), min);
        }

        if (Number(value) > max) {
            return Math.min(Number(value), max);
        }

        return value;
    };

    readonly #subscriptions = Array.of<Subscription>();

    readonly #inputValueNormalizer = new Map()
        .set(InputName.From, inputValueNormalizer<string>({
            inputName: InputName.From,
            formGroup: this.videoTrimmerForm,
            getValue: this.#getNormalizedValue
        }))
        .set(InputName.To, inputValueNormalizer<string>({
            inputName: InputName.To,
            formGroup: this.videoTrimmerForm,
            getValue: this.#getNormalizedValue
        }));

    get #minMax(): [number, number] {
        return [
            0,
            this.videoEditor.videoSource().getVideoDuration()
        ];
    }

    get #initialValue() {
        return '';
    }

    #prevChanges: Partial<FormControls<string | null>> = {};

    public constructor(
        private readonly videoEditor: VideoEditor,
        private readonly formBuilder: FormBuilder
    ) {
        super();
    }

    public ngOnInit(): void {
        this.#subscribeValueChanges();
    }

    public ngOnDestroy(): void {
        this.#unsubscribe();
    }

    public trim() {
        const { value } = this.videoTrimmerForm;

        const [
            startTimeMilliseconds,
            endTimeMilliseconds
        ] = [
            value[InputName.From],
            value[InputName.To]
        ]
        .map((value, index) => Number(value || this.#minMax[index]))
        .map(secToMillisec);

        this.process(() => this.videoEditor.trimVideoFile({
            startTimeMilliseconds,
            endTimeMilliseconds
        }));
    }

    #subscribeValueChanges() {
        this.#subscriptions.push(
            this.videoTrimmerForm.valueChanges
                .subscribe(formValues => {
                    if (Object.entries(formValues).some(([key, value]) =>
                        this.#prevChanges[key as keyof FormControls<unknown>] !== value
                    )) {
                        this.#prevChanges = {
                            ...formValues
                        };

                        this.#inputValueNormalizer.forEach(inputNormalizer =>
                            inputNormalizer(formValues)
                        );
                    }
                })
        );
    }

    #unsubscribe(): void {
        for (const subscription of this.#subscriptions) {
            subscription.unsubscribe();
        }
    }
}
