
import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path: 'users',
        title: 'User Manager',
        loadComponent: () => import('./home/list-users/list-users.component').then((c) => c.ListUsersComponent)
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
