import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { WebServiceCallbackHandler } from '../../utils/web-service-callback-handler';

@Component({
  selector: 'app-langauge-location',
  templateUrl: './langauge-location.component.html',
  styleUrls: ['./langauge-location.component.css']
})
export class LangaugeLocationComponent implements OnInit, WebServiceCallbackHandler {

  languages;
  locations;

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

  addNewLanguage() {
    if (this.languages != undefined && this.languages.length > 0) {      
      this.languages.push({
        id: null,
        language: '',
        editable: true
      });
    }
    else {
      this.languages = [];
      this.languages.push({
        id: null,
        language: '',
        editable: true
      });
    }
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

  editSaveLanguage(language, event) {
    if (event.srcElement.innerHTML == "Save" || event.srcElement.innerHTML == "Add") {
      var callback = (data: any) => {
        console.log(data);
        language.editable = false;
        event.srcElement.innerHTML = "Edit";
      }
      var errorCallback = (data: any) => {
        console.log(data);
      }
      console.log(language);
      this.movieService.addEditLanguage(language, this, callback, errorCallback);
    }
    else {
      language.editable = true;
      event.srcElement.innerHTML = "Save";
    }
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

  addNewLocation() {
    if (this.locations != undefined && this.locations.length > 0) {      
      this.locations.push({
        id: null,
        name: '',
        description: '',
        editable: true
      });
    }
    else {
      this.locations = [];
      this.locations.push({
        id: null,
        name: '',
        description: '',
        editable: true
      });
    }
  }

  editSaveLocation(location, event) {
    if (event.srcElement.innerHTML == "Save" || event.srcElement.innerHTML == "Add") {
      var callback = (data: any) => {
        console.log(data);
        location.editable = false;
        event.srcElement.innerHTML = "Edit";
      }
      var errorCallback = (data: any) => {
        console.log(data);
      }
      console.log(location);
      this.movieService.addEditLocation(location, this, callback, errorCallback);
    }
    else {
      location.editable = true;
      event.srcElement.innerHTML = "Save";
    }
  }

}
