
import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { HealthService } from './core/services/health.service';
export const routes: Routes = [
    {
        path: 'hs',
        title: 'API REST HS',
        loadComponent: () => import('./home/api-down.components')
    },
    {
        path: 'users',
        title: 'User Manager',        
        canActivate: [() => inject(HealthService).isUP()],
        loadComponent: () => import('./home/list-users/list-users.component')
    },
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'users',
        pathMatch: 'full',
    },
];
