import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {CreatePostComponent} from './create-post/create-post.component';
import {PostsComponent} from './posts/posts.component';
import {SplashComponent} from './splash/splash.component';
import {SplashGuard} from './splash-guard.guard';

const routes: Routes = [
  {path: 'splash', component: SplashComponent, canActivate: [SplashGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'post/create', component: CreatePostComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
