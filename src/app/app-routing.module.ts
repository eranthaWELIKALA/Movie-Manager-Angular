import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { HomeComponent } from './pages/home/home.component';
import { LangaugeLocationComponent } from './pages/langauge-location/langauge-location.component';
import { AddEditMovieComponent } from './pages/movies/add-edit-movie/add-edit-movie.component';
import { SearchMoviesComponent } from './pages/movies/search-movies/search-movies.component';
import { ViewMoviesComponent } from './pages/movies/view-movies/view-movies.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'authenticate', component: AuthenticationComponent },
  { path: 'search-movies', component: SearchMoviesComponent },
  { path: 'view-movies', component: ViewMoviesComponent },
  { path: 'add-movie', component: AddEditMovieComponent },
  { path: 'language-location', component: LangaugeLocationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }