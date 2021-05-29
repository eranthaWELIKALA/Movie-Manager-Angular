import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../utils/contants';
import { AuthenticationService } from '../../services/authentication.service';
import { WebServiceCallbackHandler } from '../../utils/web-service-callback-handler';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, WebServiceCallbackHandler {

  authentication: string = "login";
  submitted: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  })

  registerForm = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
  })

  constructor(
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
  }
  
  onSuccess(callback: any, data: any) {
    callback(data);
  }
  onFail(errorCallback: any, error: any) {
    errorCallback(error);
  }

  triggerView() {
    this.submitted = false;
    if (this.authentication == "login") {
      this.authentication = "register";
    }
    else {
      this.authentication = "login";
    }
  }

  login() {
    this.submitted = true;
    console.log(this.loginForm.value);
    console.log(this.loginForm.status);
    if (this.loginValidation) {
      var callback = (data: any) => {
        console.log(data);
      }
      var errorCallback = (data: any) => {
        console.log(data);
      }
      this.auth.login(this.loginForm.value, this, callback, errorCallback);
    }
  }

  loginValidation(): boolean {
    if (this.loginForm.status == Constants.FORMCONTROL_STATUS.INVALID) {
      return false;
    }
    else {
      return true;
    }
  }

  register() {
    this.submitted = true;
    console.log(this.registerForm.value);
    console.log(this.registerForm.status);
    if (this.registerValidation) {      
      var callback = (data: any) => {
        console.log(data);
      }
      var errorCallback = (data: any) => {
        console.log(data);
      }
      this.auth.register(this.registerForm.value, this, callback, errorCallback);
    }
  }

  registerValidation(): boolean {
    if (this.registerForm.status == Constants.FORMCONTROL_STATUS.INVALID) {
      return false;
    }
    else {
      if (this.registerForm.get("password") != this.registerForm.get("confirmPassword")) {
        return false;
      }
      else {
        return true;
      }
    }
  }

}
