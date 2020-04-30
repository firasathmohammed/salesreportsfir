import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginDetails: any = { username: '', password: '' };
  constructor(private loginService: LoginService,public router: Router) { }
// login app function which use to login the application
  loginApp() {
    if (this.loginDetails.username == 'firasath' && this.loginDetails.password == 'firasath123' ) {
      var data = {username:this.loginDetails.username}
      localStorage.setItem('userSession', JSON.stringify(data));
      this.loginService.CurrentSession = JSON.parse(
        localStorage.getItem('userSession')
      );
      this.loginService.loggedIn =true;
      this.router.navigate(['/dashboard']);

    }
    // this.loginService.login(this.loginDetails).subscribe((output: {}) => this.loginAppResult(output),
    //   error => {
    //   })

      
  }
  loginAppResult(result: any) {
    if (result.result == 'success') {
      localStorage.setItem('userSession', JSON.stringify(result.data[0]));
      this.loginService.CurrentSession = JSON.parse(
        localStorage.getItem('userSession')
      );
      this.loginService.loggedIn =true;
      this.router.navigate(['/dashboard']);

    }
  }
  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
