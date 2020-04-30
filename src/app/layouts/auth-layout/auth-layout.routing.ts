import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
//import { RegisterComponent } from '../../pages/register/register.component';
import { CandidateloginComponent } from '../../pages/candidatelogin/candidatelogin.component';
export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'candidatelogin',       component: CandidateloginComponent }
];
