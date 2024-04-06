import { interval, type Subscription } from 'rxjs';
import {
    Component,
    effect,
    type OnInit,
    type OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { secToMillisec } from '@app/util';
import { Process } from '../shared/process';
import { VideoEditor } from '../shared/video-editor';
import { VideoEditorModel } from '../shared/video-editor-model';
import {
    FormControls,
    InputName,
    formValidator,
    inputValueNormalizer,
    type MinMaxRange
} from './input-value-helpers';

@Component({
    selector: 'app-video-trimmer',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSliderModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './video-trimmer.component.html',
    styleUrl: './video-trimmer.component.css'
})
export class VideoTrimmerComponent extends Process implements MinMaxRange, OnInit, OnDestroy {
    public readonly InputName = InputName;

    public readonly videoTrimmerForm = this.formBuilder.group({
        [InputName.From]: [this.#initialValue],
        [InputName.To]: [this.#initialValue]
    }, { validators: formValidator(this) });

    public get from() {
        return this.videoTrimmerForm.get(InputName.From);
    }

    public get to() {
        return this.videoTrimmerForm.get(InputName.To);
    }

    public get min() {
        return this.#minMax[0];
    }

    public get max() {
        return this.#minMax[1];
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
            this.model.videoDuration
        ];
    }

    get #initialValue() {
        return '';
    }

    public constructor(
        private readonly model: VideoEditorModel,
        private readonly videoEditor: VideoEditor,
        private readonly formBuilder: FormBuilder
    ) {
        super();

        effect(() => {
            if (this.isLoading()) {
                this.videoTrimmerForm.disable();
            } else {
                this.videoTrimmerForm.enable();
            }
        });
    }

    public ngOnInit(): void {
        this.#subscribeValueChanges();
        this.#presetMinMaxValues();
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

        this.handle(() => this.videoEditor.trimVideoFile({
            startTimeMilliseconds,
            endTimeMilliseconds
        }));
    }

    #subscribeValueChanges() {
        let prevChanges: Partial<FormControls<string | null>> = {};

        this.#subscriptions.push(
            this.videoTrimmerForm.valueChanges
                .subscribe(formValues => {
                    if (Object.entries(formValues).some(([key, value]) =>
                        !Object.is(prevChanges[key as keyof FormControls<unknown>], value)
                    )) {
                        prevChanges = {
                            ...formValues
                        };

                        this.#inputValueNormalizer.forEach(inputNormalizer =>
                            inputNormalizer(formValues)
                        );
                    }
                })
        );
    }

    #presetMinMaxValues() {
        const subscription = interval(100).subscribe(() => {
            this.#inputValueNormalizer.forEach(inputNormalizer =>
                inputNormalizer({
                    [InputName.From]: this.min,
                    [InputName.To]: this.max
                })
            );

            if (this.max > 0) {
                subscription.unsubscribe();
            }
        });

        this.#subscriptions.push(subscription);
    }

    #unsubscribe(): void {
        for (const subscription of this.#subscriptions) {
            subscription.unsubscribe();
        }
    }
}
