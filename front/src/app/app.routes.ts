import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';
import { ArticlesComponent } from './pages/articles/articles.component';

export const routes: Routes = [
 {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'articles',
    canActivate: [authGuard], // route protégée
    loadComponent: () =>
      import('./pages/articles/articles.component').then((m) => m.ArticlesComponent),
  },
  {
  path: 'create-post',
  loadComponent: () => import('./pages/create/create-post.component').then(m => m.CreatePostComponent),
  canActivate: [authGuard] // si tu protèges l’accès
 },
 {
  path: 'themes',
  loadComponent: () => import('./pages/themes/theme.component').then(m => m.ThemesComponent),
  canActivate: [authGuard]
}


];
