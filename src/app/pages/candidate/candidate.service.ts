import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {LoginService} from "../login/login.service";
@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private httpClient: HttpClient, @Inject('API_URL') private apiUrl: string,private loginservice: LoginService) { }
  createupdateCandidate(input: any) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.post(this.apiUrl + '/createupdatecandidate', bodyString, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  getAllCandidates() {

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.get(this.apiUrl + '/getallcandidate', { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  ///getcandidate/:id
  getCandidatedetails(id:number) {

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.get(this.apiUrl + '/getcandidate/'+ id, { headers }).pipe(
      map((res: Response) => res), 
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  searchCandidate(input: any) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.post(this.apiUrl + '/searchcandidate', bodyString, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
}

