import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ThemeComponent } from './pages/theme/theme.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { ArticleFormComponent } from './pages/article-form/article-form.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard] },
  { path: 'theme', component: ThemeComponent, canActivate: [AuthGuard] },
  { path: 'article/:id', component: ArticleDetailComponent, canActivate: [AuthGuard] },
  { path: 'article-form', component: ArticleFormComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
