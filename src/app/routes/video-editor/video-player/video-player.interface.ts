import type { ElementRef } from "@angular/core";

export interface VideoPlayer {
    make(elRef: ElementRef<HTMLVideoElement>): void;

    dispose(): void;
}
