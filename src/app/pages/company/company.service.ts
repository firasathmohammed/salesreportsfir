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
export class CompanyService {
schools: any = [{id:1,name:"st mary high school",registration:"652",mobileno:"5632585965",emailid:"test@gmial.com",address:"India",products:[{ id: 1,name: "Shirt", size: "20",  price: "50", totalstock: "0", sold: "0",schoolid : 1}]}]
  constructor(private httpClient: HttpClient, @Inject('API_URL') private apiUrl: string,private loginservice: LoginService) { }
  createUpdateCompany(input: any) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.post(this.apiUrl + '/createupdatevendor', bodyString, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  getCompanies() {

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.get(this.apiUrl + '/getallvendor', { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  getCompanuDetails(id) {

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.get(this.apiUrl + '/getvendor/' + id, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  approval(input: any) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.set("Loginid", this.loginservice.loggedInUserId());
    headers = headers.set("Apptype", this.loginservice.getAppType());
    headers = headers.set("Usertype", this.loginservice.getUserType());
    return this.httpClient.post(this.apiUrl + '/approve', bodyString, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => Observable.throw(error.error || 'Server error')));
  }
  getCategories(){
var data = [{id:1,name:"20"},{id:1,name:"22"},{id:1,name:"24"},{id:1,name:"26"},{id:1,name:"28"},{id:1,name:"30"},{id:1,name:"32"},{id:1,name:"34"},{id:1,name:"36"},{id:1,name:"38"},{id:1,name:"40"}];
return data;
  }
  getSchools(){
    return this.schools;
  }
}
