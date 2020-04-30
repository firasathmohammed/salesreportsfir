import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from "rxjs/operators";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn = false;
 
  CurrentSession: any = {};
  constructor(private httpClient: HttpClient, @Inject('API_URL') private apiUrl: string, public router: Router) {
    this.loggedIn = !!localStorage.getItem('userSession');

    if (localStorage.getItem('userSession')) {
      this.CurrentSession = JSON.parse(localStorage.getItem('userSession'));
    }

  }
  logout() {
    localStorage.removeItem('userSession');
    this.loggedIn = false;
    this.CurrentSession = {};
    this.router.navigate(['/login']);
  }
  isLoggedIn() {
    return this.loggedIn;
  }
  loggedInUserId = function () {
    try {
      if (this.CurrentSession.id) {
        return JSON.parse(this.CurrentSession.id);
      } else {
        return 0;
      }
    } catch (ex) {
      return 0;
    }
  };
  getAppType = function () {
    try {
     return "hiringpad"
    } catch (ex) {
      return "hiringpad";
    }
  };
  getUserType = function () {
    try {
      if (this.CurrentSession.usertype) {
        return this.CurrentSession.usertype
      }
     
    } catch (ex) {
      return "candidate";
    }
  };
  getCompanyName = function () {
    try {
      if (this.CurrentSession.companyname) {
        return this.CurrentSession.companyname;
      } else {
        return "Hiring Pad";
      }
    } catch (ex) {
      return "Hiring Pad";
    }
  };
  getCompanyId = function () {
    try {
      if (this.CurrentSession.companyid) {
        return JSON.parse(this.CurrentSession.companyid);
      } else {
        return 0;
      }
    } catch (ex) {
      return 0;
    }
  };
  login(input: any) {
    let bodyString = JSON.stringify(input); // Stringify payload
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.httpClient.post(this.apiUrl + '/login', bodyString, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  candidatelogin(input: any) {
    let bodyString = JSON.stringify(input); // Stringify payload
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.httpClient.post(this.apiUrl + '/candidatelogin', bodyString, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  getUsers(input: any) {

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loggedInUserId());
    headers = headers.set("Apptype", this.getAppType());

    return this.httpClient.get(this.apiUrl + '/getName', { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }


}
