import { signal } from "@angular/core";

export abstract class Process {
    public readonly isLoading = signal<boolean>(false);

    protected handle<TArgs extends Array<any>, TResult>(
        fn: (args?: TArgs) => Promise<TResult>,
        args?: TArgs
    ) {
        this.isLoading.set(true);

        return fn(...(args ?? []))
            .finally(() => this.isLoading.set(false));
    }
}
