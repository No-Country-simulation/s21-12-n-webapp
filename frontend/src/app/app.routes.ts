import { Routes } from '@angular/router';
import { noAuthGuard } from './guard/no-auth.guard';
import { authGuard } from './guard/auth.guard';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./home/home.component').then((c) => c.HomeComponent),
    },

    {
        path: 'login',
        loadComponent: () =>
            import('./auth/login/login.component').then((c) => c.LoginComponent),
        canActivate: [authGuard],
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./auth/register/register.component').then(
                (c) => c.RegisterComponent
            ),
        canActivate: [authGuard],
    },
];
