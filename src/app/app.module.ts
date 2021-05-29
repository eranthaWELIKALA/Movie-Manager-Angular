import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewMoviesComponent } from './pages/movies/view-movies/view-movies.component';
import { SearchMoviesComponent } from './pages/movies/search-movies/search-movies.component';
import { LangaugeLocationComponent } from './pages/langauge-location/langauge-location.component';
import { AddEditMovieComponent } from './pages/movies/add-edit-movie/add-edit-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AuthenticationComponent,
    FooterComponent,
    ViewMoviesComponent,
    SearchMoviesComponent,
    LangaugeLocationComponent,
    AddEditMovieComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
