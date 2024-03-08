import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { ListMovieComponent } from './pages/list-movie/list-movie.component';
import { CreateMovieComponent } from './pages/create-movie/create-movie.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'home', component: HomeComponent },
  { path: 'create-movie', component: CreateMovieComponent },
  { path: 'list-movie', component: ListMovieComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
