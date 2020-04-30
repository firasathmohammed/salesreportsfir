import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from "rxjs/operators";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {LoginService} from "../login/login.service";
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private httpClient: HttpClient, @Inject('API_URL') private apiUrl: string,private loginservice: LoginService) { }
  createUpdateUser(input: any) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.post(this.apiUrl + '/createupdateuser', bodyString, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  getUsers() {

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.get(this.apiUrl + '/getalluser', { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  getUsersDetails(id) {

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.get(this.apiUrl + '/getuser/' + id, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  getAllCompanies() {

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.get(this.apiUrl + '/getallvendorforuser', { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
}
