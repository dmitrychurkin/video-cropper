/**
 * This script is used to rename the binary with the platform specific postfix.
 * When `tauri build` is ran, it looks for the binary name appended with the platform specific postfix.
 */
const { promisify } = require('node:util');
const resolve = require('node:path').resolve;
const fs = require('node:fs');
const exec = promisify(require('node:child_process').exec);

const Platform = {
    Win32: {
        name: 'win32',
        ext: 'exe'
    }
};

const externalBinaryLocation = resolve(
    'src-tauri',
    'external',
    'bin'
);

const binarySet = new Set([
    'ffmpeg',
    'ffplay',
    'ffprobe'
]);

let extension = '';
if (Object.is(process.platform, Platform.Win32.name)) {
    extension = Platform.Win32.ext;
}

(async function main() {
    const rustInfo = (await exec('rustc -vV')).stdout;
    const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];

    if (!targetTriple) {
        console.error('Failed to determine platform target triple');
    }

    binarySet.forEach(binary =>
        fs.renameSync(
            resolve(externalBinaryLocation, getBinaryFile(binary, extension)),
            resolve(externalBinaryLocation, `${binary}-${getBinaryFile(targetTriple, extension)}`)
        )
    );
})();

function getBinaryFile(...segments) {
    return segments.join('.');
}
