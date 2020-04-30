import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../pages/login/login.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  userName:string="";
  constructor(location: Location,  private element: ElementRef, private router: Router,private loginservice:LoginService) {
    this.location = location;
  }
  
  usernameDetails(){
this.userName=this.loginservice.CurrentSession.username;

  }
  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.usernameDetails()
  }
  logOut(){
     
      this.loginservice.logout();
   
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 2 );
    }
    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path.slice(1).toLowerCase() === titlee.toLowerCase()){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

}
