import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebServiceCallbackHandler } from '../utils/web-service-callback-handler';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  public getLanguages(handler: WebServiceCallbackHandler, callback: any, errorCallback: any) {
    let options = {
      headers: {
      'Access-Control-Allow-Origin': '*'
      }
    };
    this.http.get("http://localhost/moviemanager/getLanguages.php", options).subscribe(data => {
      handler.onSuccess(callback, data);
    },
    error => {
      handler.onFail(errorCallback, error);
    });
  }

  public getLocations(handler: WebServiceCallbackHandler, callback: any, errorCallback: any) {
    let options = {
      headers: {
      'Access-Control-Allow-Origin': '*'
      }
    };
    this.http.get("http://localhost/moviemanager/getLocations.php", options).subscribe(data => {
      handler.onSuccess(callback, data);
    },
    error => {
      handler.onFail(errorCallback, error);
    });
  }

  public addEditLanguage(language, handler: WebServiceCallbackHandler, callback: any, errorCallback: any) {
    let options = {
      headers: {
      'Access-Control-Allow-Origin': '*'
      }
    };
    this.http.post("http://localhost/moviemanager/addEditLanguage.php", language, options).subscribe(data => {
      handler.onSuccess(callback, data);
    },
    error => {
      handler.onFail(errorCallback, error);
    });
  }

  public addEditLocation(location, handler: WebServiceCallbackHandler, callback: any, errorCallback: any) {
    let options = {
      headers: {
      'Access-Control-Allow-Origin': '*'
      }
    };
    this.http.post("http://localhost/moviemanager/addEditLocation.php", location, options).subscribe(data => {
      handler.onSuccess(callback, data);
    },
    error => {
      handler.onFail(errorCallback, error);
    });
  }

  public getMovies(handler: WebServiceCallbackHandler, callback: any, errorCallback: any) {
    let options = {
      headers: {
      'Access-Control-Allow-Origin': '*'
      }
    };
    this.http.get("http://localhost/moviemanager/viewMovieList.php", options).subscribe(data => {
      handler.onSuccess(callback, data);
    },
    error => {
      handler.onFail(errorCallback, error);
    });
  }

  public searchMovies(searchItems, handler: WebServiceCallbackHandler, callback: any, errorCallback: any) {
    let options = {
      headers: {
      'Access-Control-Allow-Origin': '*'
      }
    };
    this.http.post("http://localhost/moviemanager/searchMovie.php", searchItems, options).subscribe(data => {
      handler.onSuccess(callback, data);
    },
    error => {
      handler.onFail(errorCallback, error);
    });
  }

  public AddEditMovie(movie, handler: WebServiceCallbackHandler, callback: any, errorCallback: any) {
    let options = {
      headers: {
      'Access-Control-Allow-Origin': '*'
      }
    };
    this.http.post("http://localhost/moviemanager/addMovie.php", movie, options).subscribe(data => {
      handler.onSuccess(callback, data);
    },
    error => {
      handler.onFail(errorCallback, error);
    });
  }
}
