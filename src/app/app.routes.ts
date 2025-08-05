import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./components/home/home').then(m => m.Home),
        children: [
            {
                path: '',
                loadComponent: () => import('./components/home/users-list/users-list').then(m => m.UsersList)
            },
            {
                path: 'user-details/:id',
                loadComponent: () => import('./components/home/user-details/user-details').then(m => m.UserDetails)
            }
        ]
    },

];
