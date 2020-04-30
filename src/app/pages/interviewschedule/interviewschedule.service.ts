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
export class InterviewscheduleService {

  constructor(private httpClient: HttpClient, @Inject('API_URL') private apiUrl: string,private loginservice: LoginService) { }
  
 
  getinterviewList(id) {

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.get(this.apiUrl + '/interviewlistofjobreq/' + id, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  getacceptCandidateList(id) {

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.get(this.apiUrl + '/aceeptinterviewlistofjobreq/' + id, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  acceptsCandidateForInterview(input: any) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.post(this.apiUrl + '/acceptinterview', bodyString, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  giveFeedbackToCandidate(input: any) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.post(this.apiUrl + '/givefeedback', bodyString, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  makeAnofferCandidate(input: any) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.post(this.apiUrl + '/makeanoffer', bodyString, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  getInterviewHistory(input: any) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.post(this.apiUrl + '/history', bodyString, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  
  
}
