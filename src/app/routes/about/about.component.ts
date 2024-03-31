import { Component, OnInit } from '@angular/core';
import { getName, getTauriVersion, getVersion } from '@tauri-apps/api/app';
import { arch, locale, platform, type, version } from '@tauri-apps/api/os';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
    public metadata!: Readonly<{
        name: string | null;
        version: string | null;
        tauriVersion: string | null;
        os: string;
    }>;

    public async ngOnInit() {
        const [
            name,
            appVersion,
            tauriVersion,
            osType,
            osPlatform,
            osArch,
            osVersion,
            osLocale
        ] = await Promise.all([
            getName,
            getVersion,
            getTauriVersion,
            type,
            platform,
            arch,
            version,
            locale
        ].map(fn => fn()));

        this.metadata = {
            name,
            version: appVersion,
            tauriVersion,
            os: `${[
                osType,
                osPlatform,
                osArch,
                osVersion,
                osLocale
            ].join(' ')}`
        };
    }
}
