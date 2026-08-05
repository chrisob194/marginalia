import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { Home } from './features/home/home';
import { authGuard } from './shared/guards/auth-guard-guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    canActivate: [authGuard]
  },
  ...AUTH_ROUTES
];
