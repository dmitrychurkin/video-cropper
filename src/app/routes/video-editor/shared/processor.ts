import { signal } from "@angular/core";

export abstract class Processor {
    protected readonly isLoading = signal<boolean>(false);

    protected process<TArgs extends Array<any>, TResult>(
        fn: (args?: TArgs) => Promise<TResult>,
        args?: TArgs
    ) {
        this.isLoading.set(true);

        return fn(...(args ?? []))
            .finally(() => this.isLoading.set(false));
    }
}
