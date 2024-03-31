import { Routes } from '@angular/router';
import { VideoEditorComponent } from '@app/routes/video-editor/video-editor.component';
import { AboutComponent } from '@app/routes/about/about.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/video-editor',
        pathMatch: 'full'
    },
    {
        path: 'video-editor',
        component: VideoEditorComponent
    },
    {
        path: 'about',
        component: AboutComponent
    }
];
