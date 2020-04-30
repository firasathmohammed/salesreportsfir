import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { CompanyComponent } from '../../pages/company/company.component';
import { CandidateComponent } from '../../pages/candidate/candidate.component';
import { JobrequirementComponent } from '../../pages/jobrequirement/jobrequirement.component';
import { InterviewscheduleComponent } from '../../pages/interviewschedule/interviewschedule.component';
import { AlloffersComponent } from '../../pages/alloffers/alloffers.component';
import { AllhireComponent } from '../../pages/allhire/allhire.component';
import { LoggedInGuard } from '../../pages/login/logged-in.guard';
import { RoleGuard } from '../../pages/login/role.guard';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent,canActivate: [LoggedInGuard,RoleGuard]},
    { path: 'user-profile',   component: UserProfileComponent,canActivate: [LoggedInGuard,RoleGuard] },
    { path: 'schools',   component: CompanyComponent,canActivate: [LoggedInGuard,RoleGuard] },
    // { path: 'candidate',   component: CandidateComponent,canActivate: [LoggedInGuard] },
    // { path: 'tables',         component: TablesComponent,canActivate: [LoggedInGuard,RoleGuard] },
    // { path: 'icons',          component: IconsComponent,canActivate: [LoggedInGuard,RoleGuard] },
    // { path: 'jobposting',          component: JobrequirementComponent,canActivate: [LoggedInGuard] },
    // { path: 'interviewscheduler/:id',          component: InterviewscheduleComponent,canActivate: [LoggedInGuard] },
    // { path: 'alloffers',          component: AlloffersComponent,canActivate: [LoggedInGuard] },
    // { path: 'allhire',          component: AllhireComponent,canActivate: [LoggedInGuard,RoleGuard] },
    // { path: 'maps',           component: MapsComponent,canActivate: [LoggedInGuard,RoleGuard] }
];
