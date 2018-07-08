
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { PollComponent } from './poll/poll.component';

const appRoutes: Routes = [
    {
        path: '',
        component: PollComponent
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

const routesCfg: ExtraOptions = {
    enableTracing: true
};

export const AppRoutes: ModuleWithProviders =
    RouterModule.forRoot(appRoutes, routesCfg);
