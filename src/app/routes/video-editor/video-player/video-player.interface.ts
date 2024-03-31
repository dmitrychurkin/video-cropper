import type { ElementRef } from "@angular/core";
import type videojs from "video.js";

export interface VideoPlayer {
    player: ReturnType<typeof videojs>;

    make(elRef: ElementRef<HTMLVideoElement>): void;

    dispose(): void;
}
