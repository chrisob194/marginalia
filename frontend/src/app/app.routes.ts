import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { AUTH_ROUTES } from './features/auth/auth.routes';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  ...AUTH_ROUTES
];
