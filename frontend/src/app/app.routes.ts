import { Routes } from '@angular/router';
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
    // {
    //     path: 'profile',
    //     children: [
    //         {
    //             path: 'barber/:id',
    //             loadComponent: () => import('./profiles/barber-profile/barber-profile.component')
    //                 .then(c => c.BarberProfileComponent)
    //         },
    //         { 
    //             path: 'client/:id', 
    //             loadComponent: () => import('./profiles/client-profile/client-profile.component')
    //                 .then(c => c.ClientProfileComponent)
    //         }
    //     ]
    // }
    {
        path: 'profile/barber/:id',
        loadComponent: () => import('./profiles/barber-profile/barber-profile.component')
            .then(c => c.BarberProfileComponent)
    },
    { 
        path: 'profile/client/:id', 
        loadComponent: () => import('./profiles/client-profile/client-profile.component')
            .then(c => c.ClientProfileComponent)
    }
];