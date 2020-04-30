import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-candidatelogin',
  templateUrl: './candidatelogin.component.html',
  styleUrls: ['./candidatelogin.component.scss']
})
export class CandidateloginComponent implements OnInit {

  constructor(private loginService: LoginService, public router: Router) { }
  loginDetails: any = { username: '', password: '' };
  loginCandidateApp() {

    this.loginService.candidatelogin(this.loginDetails).subscribe((output: {}) => this.loginAppResult(output),
      error => {
      })


  }
  loginAppResult(result: any) {
    if (result.result == 'success') {
      localStorage.setItem('userSession', JSON.stringify(result.data[0]));
      this.loginService.CurrentSession = JSON.parse(
        localStorage.getItem('userSession')
      );
      this.loginService.loggedIn = true;
      this.router.navigate(['/jobposting']);

    }
  }
  ngOnInit() {
  }

}
