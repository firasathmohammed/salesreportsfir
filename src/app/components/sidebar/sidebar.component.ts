import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../pages/login/login.service';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  ruleItem:boolean;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '',ruleItem:true },
  { path: '/schools', title: 'Schools', icon: 'ni-planet text-primary', class: '',ruleItem:true},
  
];
// { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
//     { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
// { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
//     { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
//     { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public roleMenuItems = true;
  constructor(private router: Router, private loginservice: LoginService) { }
  getApptypeFromLogin() {
    if (this.loginservice.getUserType() == 'candidate') {
      for (var value of this.menuItems) {
        if(value.title == 'Dashboard'){
          value.ruleItem = false
        }
        else if(value.title == 'Company'){
          value.ruleItem = false
        }
        else if(value.title == 'User profile'){
          value.ruleItem = false
        }
        else if(value.title == 'All Hire'){
          value.ruleItem = false
        }
      }
    }
    else {
      for (var value of this.menuItems) {
        value.ruleItem = true;
      }
      this.roleMenuItems = true;

    }
  }
  ngOnInit() {
   
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.getApptypeFromLogin();
    this.router.events.subscribe((event) => {
      this.isCollapsed = false;
    });
  }
}
