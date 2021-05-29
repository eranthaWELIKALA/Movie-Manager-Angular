import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { WebServiceCallbackHandler } from 'src/app/utils/web-service-callback-handler';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.css']
})
export class SearchMoviesComponent implements OnInit, WebServiceCallbackHandler {

  languages;
  locations;
  searchItem = {
    searchby: "title",
    title: '',
    description: '',
    year: '',
    location: '',
    language: '',
    cast: ''
  };
  searchResults;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getLanguages();
    this.getLocations();
  }

  onSuccess(callback: any, data: any) {
    callback(data);
  }
  onFail(errorCallback: any, error: any) {
    errorCallback(error);
  }

  getLanguages() {
    var callback = (data: any) => {
      console.log(data)
      this.languages = data.info;
      console.log("Languages");
      console.log(this.languages);
    }
    var errorCallback = (data: any) => {
      console.log(data);
    }
    this.movieService.getLanguages(this, callback, errorCallback);
  }

  getLocations() {
    var callback = (data: any) => {
      console.log(data)
      this.locations = data.info;
      console.log("Locations");
      console.log(this.locations);
    }
    var errorCallback = (data: any) => {
      console.log(data);
    }
    this.movieService.getLocations(this, callback, errorCallback);
  }

  search() {
    this.searchResults = undefined;
    console.log(this.searchItem);
    
    var callback = (data: any) => {
      console.log(data)
      this.searchResults = data.info;
      console.log("Search Results");
      console.log(this.searchResults);
    }
    var errorCallback = (data: any) => {
      console.log(data);
    }
    this.makeNullEmptyItems();
    this.movieService.searchMovies(this.searchItem, this, callback, errorCallback);
  }

  makeNullEmptyItems() {
    if (this.searchItem.cast == "") {
      this.searchItem.cast = null;
    }
    if (this.searchItem.description == "") {
      this.searchItem.description = null;
    }
    if (this.searchItem.language == "") {
      this.searchItem.language = null;
    }
    if (this.searchItem.location == "") {
      this.searchItem.location = null;
    }
    if (this.searchItem.title == "") {
      this.searchItem.title = null;
    }
    if (this.searchItem.year == "") {
      this.searchItem.year = null;
    }
  }

}
