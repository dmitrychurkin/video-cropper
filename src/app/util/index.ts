/**
 * Source https://coderwall.com/p/wkdefg/converting-milliseconds-to-hh-mm-ss-mmm
 */
export function msToHMS(duration: number) {
    let milliseconds: string | number = Number.parseInt(`${(duration % 1000) / 100}`);
    let seconds: string | number = Number.parseInt(`${(duration / 1000) % 60}`);
    let minutes: string | number = Number.parseInt(`${(duration / (1000 * 60)) % 60}`);
    let hours: string | number = Number.parseInt(`${(duration / (1000 * 60 * 60)) % 24}`);

    return [
        pad(hours, [2]),
        pad(minutes, [2]),
        [pad(seconds, [2]), milliseconds]
            .filter(Boolean)
            .join('.')
    ].join(':');
};

export function secToMillisec(sec: number) {
    return Math.max(Math.abs(sec), 0) * 1000;
}

export function pad(str: string | number, [num, pref = '00']: [number, string?]) {
    return `${pref}${str}`.slice(-num);
};

export function parseNumber(value: number | string): string {
    const stringifiedValue = String(value).trim();

    if (!stringifiedValue) {
        return '';
    }

    if (Number.isNaN(Number.parseFloat(stringifiedValue))) {
        return '';
    }

    return stringifiedValue.replace(/[^0-9.]/g, '');
}
