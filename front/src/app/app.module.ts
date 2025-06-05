import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopicComponent } from './topic/topic.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ThemeComponent } from './pages/theme/theme.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { ArticleFormComponent } from './pages/article-form/article-form.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationButtonComponent } from './shared/navigation-button/navigation-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ArticleCardComponent } from './shared/article-card/article-card.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    TopicComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ArticlesComponent,
    ThemeComponent,
    ArticleDetailComponent,
    ArticleFormComponent,
    UserProfileComponent,
    NavigationButtonComponent,
    NavbarComponent,
    ArticleCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
