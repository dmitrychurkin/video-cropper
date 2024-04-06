export type TrimFileSettings = {
    readonly startTimeMilliseconds: number;
    readonly endTimeMilliseconds: number;
};

export const enum ProcessingFileName {
    Input = 'input',
    Output = 'output'
};

export enum ExecStatusCode {
    Success = 0
};
