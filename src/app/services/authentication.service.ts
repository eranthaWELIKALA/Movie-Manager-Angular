import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebServiceCallbackHandler } from '../utils/web-service-callback-handler';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public login(loginData: any, handler: WebServiceCallbackHandler, callback: any, errorCallback: any) {
    let options = {
      headers: {
      'Access-Control-Allow-Origin': '*'
      }
    };
    this.http.post("http://localhost/moviemanager/viewMovieList.php", loginData, options).subscribe(data => {
      handler.onSuccess(callback, data);
    },
    error => {
      handler.onFail(errorCallback, error);
    });
  }

  public register(registerData: any, handler: WebServiceCallbackHandler, callback: any, errorCallback: any) {
    this.http.post("http:localhost/register", {}).subscribe(data => {
      handler.onSuccess(callback, data);
    },
    error => {
      handler.onFail(errorCallback, error);
    });
  }

}
