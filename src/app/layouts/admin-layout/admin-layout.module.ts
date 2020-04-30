import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
 import { CompanyComponent } from '../../pages/company/company.component';
import { CandidateComponent } from '../../pages/candidate/candidate.component';
import { JobrequirementComponent }from '../../pages/jobrequirement/jobrequirement.component';
import { InterviewscheduleComponent }from '../../pages/interviewschedule/interviewschedule.component';
import { AlloffersComponent } from '../../pages/alloffers/alloffers.component';
import { AllhireComponent } from '../../pages/allhire/allhire.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ScrollDispatchModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    CompanyComponent,
    CandidateComponent,
    JobrequirementComponent,
    InterviewscheduleComponent,
    AlloffersComponent,
    AllhireComponent
  ]
})

export class AdminLayoutModule {}
