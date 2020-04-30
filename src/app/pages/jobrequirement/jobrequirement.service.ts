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
export class JobrequirementService {

  constructor(private httpClient: HttpClient, @Inject('API_URL') private apiUrl: string,private loginservice: LoginService) { }
  createUpdatejobRequirement(input: any) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.post(this.apiUrl + '/createupdatejobrequirement', bodyString, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  getjobRequirement() {

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.get(this.apiUrl + '/getalljobrequirement', { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  getjobRequirementDetails(id) {

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.get(this.apiUrl + '/getjobrequirement/' + id, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  getcandidateForjobRequirement(id) {

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.get(this.apiUrl + '/candidatelistofjobreq/'+id, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  getcompanyandjobRequirement(id) {

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.get(this.apiUrl + '/getcompanyjobrequirement/'+id, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  scheduleInterview(input: any) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.post(this.apiUrl + '/scheduleinterview', bodyString, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  applyForJob(input: any) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.post(this.apiUrl + '/applyforjob', bodyString, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  getAlloffers() {

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.get(this.apiUrl + '/alloffers', { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  getAllhiring() {

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.get(this.apiUrl + '/allhiring', { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  getDashboardStatistics() {

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.get(this.apiUrl + '/getstatistics', { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  acceptOffers(input: any) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.post(this.apiUrl + '/acceptoffer', bodyString, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
}
