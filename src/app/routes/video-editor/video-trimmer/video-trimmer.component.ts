import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, merge } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { secToMillisec } from '@app/util';
import { Processor } from '../shared/processor';
import { VideoEditor } from '../shared/video-editor';

@Component({
    selector: 'app-video-trimmer',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    templateUrl: './video-trimmer.component.html',
    styleUrl: './video-trimmer.component.css'
})
export class VideoTrimmerComponent extends Processor implements OnInit, OnDestroy {
    public readonly errors = {
        from: '',
        to: ''
    };

    #subscription$!: Subscription;

    public constructor(
        private readonly videoEditor: VideoEditor,
        private readonly formBuilder: FormBuilder
    ) {
        super();
    }

    public ngOnInit(): void {
        this.#subscription$ = merge(
            this.videoTrimmerForm.statusChanges,
            this.videoTrimmerForm.valueChanges
        )
            .subscribe(() => this.updateErrorMessages());
    }

    public ngOnDestroy(): void {
        this.#subscription$.unsubscribe();
    }

     // TODO: enhance validation
    public readonly videoTrimmerForm = this.formBuilder.group({
        from: ['', [Validators.min(0), Validators.required]],
        to: ['', [Validators.min(0), Validators.required]],
    });

    public trim() {
        const { from, to } = this.videoTrimmerForm.value;

        const [startTimeMilliseconds, endTimeMilliseconds] = [
            secToMillisec(Number(from)),
            secToMillisec(Number(to))
        ];

        this.process(() => this.videoEditor.trimVideoFile({
            startTimeMilliseconds,
            endTimeMilliseconds
        }));
    }

    // TODO: revise validation messages
    public updateErrorMessages() {
        for (const name of ['from', 'to'] as const) {
            const control = this.videoTrimmerForm.get(name);
            if (!control) {
                continue;
            }

            if (control.hasError('required')) {
                this.errors[name] = 'You must enter a value';
            } else if (control.hasError('min')) {
                this.errors[name] = 'Not a valid value';
            } else {
                this.errors[name] = '';
            }
        }
    }
}
