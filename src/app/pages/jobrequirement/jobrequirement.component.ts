import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../login/login.service';
import { JobrequirementService } from './jobrequirement.service';
import { Router } from '@angular/router';
import { CandidateService } from '../candidate/candidate.service';
import { CompanyService } from '../company/company.service';
@Component({
  selector: 'app-jobrequirement',
  templateUrl: './jobrequirement.component.html',
  styleUrls: ['./jobrequirement.component.scss'],

})
export class JobrequirementComponent implements OnInit {
  closeResult: string;
  jobRequirementDetails: any = {};
  jobRequirementList: any = [];
  candidateListForJob: any = [];
  schedulerInterview: any = {};
  searchInput: any = {};
  candidateApplyJobDetails: any = {};
  jobrequirementID: number = 0;
  message = "sdf";
  candidateuserType: any = "";
  approvalInput: any = {};
  loginid:any= "";
  constructor(private modalService: NgbModal, private loginservice: LoginService, private jobservice: JobrequirementService, public router: Router, private candidateservice: CandidateService,private companyservice: CompanyService) { }
  openModalCreate(content) {
    this.jobRequirementDetails = { "loginid": this.loginservice.loggedInUserId(), "usertype": this.loginservice.getUserType(), "transtype": "create", "requirementid": "", "requirementname": "", "keyskill": "", "secondaryskill": "", "additionalskill": "", "yearexperience": "", "approximatepackage": "", "joblocation": "", "interviewlocation": "", "companyid": this.loginservice.getCompanyId() }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  openModalUpdate(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', windowClass: 'modal-xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  OpenModalForApply(jobeDetails, content) {
    console.log(jobeDetails);
    this.candidateApplyJobDetails = { "transtype": "create", "candidateid": this.loginservice.loggedInUserId(), "jobid": jobeDetails.id, "jobreqname": jobeDetails.jobreqname, "loginid": this.loginservice.loggedInUserId(), "usertype": this.loginservice.getUserType(), "keyskill": jobeDetails.keyskills };

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  openModalCandidateList(content) {
    this.searchInput = { searchfield: "", searchvalue: "", "loginid": this.loginservice.loggedInUserId(), "transtype": "searchcandidate", "usertype": this.loginservice.getUserType() };
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', windowClass: "xlModal" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  openModalScheduleInterview(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', windowClass: "xlModal" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  createJobRequirement() {
    if (this.jobRequirementDetails.requirementid == '') {
      var ReqId: any = this.loginservice.getCompanyName();
      ReqId = ReqId.substring(0, 3) + ReqId.substring(ReqId.length - 3, ReqId.length - 1);
      ReqId = ReqId + '_' + this.jobRequirementDetails.keyskill.substring(0, 3) + '_' + this.jobRequirementDetails.yearexperience;
      ReqId = ReqId.toUpperCase();
      this.jobRequirementDetails.requirementid = ReqId;
    }
    var input = { root: this.jobRequirementDetails };
    this.jobservice.createUpdatejobRequirement(input).subscribe((output: {}) => this.createJobRequirementResult(output),
      error => {
        console.log(error);
      })
  }
  createJobRequirementResult(output) {
    console.log(output);
    //this.getAllCompanies();
    if (output.result === 'success') {
      this.modalService.dismissAll("close");
      this.getAllJobRequirement();
    }

  }
  getJobRequirementDetails(details, contents) {
    this.jobservice.getjobRequirementDetails(details.id).subscribe((output: {}) => this.getJobRequirementDetailsResult(output, contents),
      error => {
        console.log(error);
      })
  }
  getJobRequirementDetailsResult(output, contents) {
    console.log(output);
    if (output.result === 'success') {
      var OD = output.data[0];
      this.jobRequirementDetails = { "loginid": this.loginservice.loggedInUserId(), "usertype": this.loginservice.getUserType(), "transtype": "update", id: OD.id, "requirementid": OD.jobreqid, "requirementname": OD.jobreqname, "keyskill": OD.keyskills, "secondaryskill": OD.secondaryskills, "additionalskill": OD.additionalskills, "yearexperience": OD.experienceinyears, "approximatepackage": OD.approximatepackage, "joblocation": OD.joblocation, "interviewlocation": OD.interviewlocation, "createdby": OD.jobcreatedby };
      this.openModalUpdate(contents);
    }
  }

  getAllJobRequirement() {
    this.jobservice.getjobRequirement().subscribe((output: {}) => this.getAllJobRequirementResult(output),
      error => {
        console.log(error);
      })
  }
  getAllJobRequirementResult(output) {
    console.log(output);
    if (output.result == 'success' && output.data && output.data.length > 0) {
      this.jobRequirementList = output.data;
    }

  }
  candidateForjobRequirement(jobdetails, content) {
    var jobid = jobdetails.id;
    this.jobrequirementID = jobid;
    this.jobservice.getcandidateForjobRequirement(jobid).subscribe((output: {}) => this.candidateForjobRequirementResult(output, content),
      error => {
        console.log(error);
      })

  }
  candidateForjobRequirementResult(output, content) {
    if (output.result == 'success' && output.data && output.data.length > 0) {
      this.candidateListForJob = output.data;
      console.log(this.candidateListForJob);

    }
    this.openModalCandidateList(content);
  }
  scheduleInterviewDetails(content, candidate) {
    this.modalService.dismissAll("close");


    var jobid = this.jobrequirementID;

    this.jobservice.getcompanyandjobRequirement(jobid).subscribe((output: {}) => this.scheduleInterviewDetailsResult(output, content, candidate),
      error => {
        console.log(error);
      })
  }
  scheduleInterviewDetailsResult(output, content, candidate) {
    if (output.result == 'success' && output.data && output.data.length > 0) {
      var OD = output.data[0];
      this.jobrequirementID = 0;
      //  interviewschedule
      this.schedulerInterview = { "loginid": this.loginservice.loggedInUserId(), "usertype": this.loginservice.getUserType(), transtype: "interviewforappliedcandidates", typeofinterview: "", datetimeofinterview: "", contactperson: "", contactpersonnumber: "", addressofvenue: "", companyid: OD.details.companyid, companyname: OD.details.companyname, areabusiness: OD.details.areabusiness, operatinglocation: OD.details.operatinglocation, employeestrength: OD.details.employeestrength, yearofregistration: OD.details.registrationyear, about: OD.details.aboutcompany, jobid: OD.id, requirementname: OD.jobreqname, keyskill: OD.keyskills, secondaryskill: OD.secondaryskills, additionalskill: OD.additionalskills, yearexperience: OD.experienceinyears, approximatepackage: OD.approximatepackage, joblocation: OD.joblocation, interviewlocation: OD.interviewlocation, candidateid: candidate.id, candidatename: candidate.name,candidateemailid:candidate.emailid };
      this.openModalScheduleInterview(content);

    }

  }
  createInterviewForCandidate() {
    console.log(this.schedulerInterview);
    var input = { root: this.schedulerInterview };
    this.jobservice.scheduleInterview(input).subscribe((output: {}) => this.createInterviewForCandidateResult(output),
      error => {
        console.log(error);
      })
  }
  createInterviewForCandidateResult(output) {
    console.log(output);
    if (output.result == 'success' && output.data && output.data.length > 0) {
      this.modalService.dismissAll("close");
    }
    else if (output.result == 'success' && output.data.message) {

      this.modalService.dismissAll("close");
    }
  }
  applyForJob() {
    console.log(this.candidateApplyJobDetails);
    var input = { root: this.candidateApplyJobDetails };
    this.jobservice.applyForJob(input).subscribe((output: {}) => this.applyForJobResult(output),
      error => {
        console.log(error);
      })
  }
  applyForJobResult(output) {
    console.log(output);
    if (output.result == 'success' && output.data && output.data.length > 0) {
      this.modalService.dismissAll("close");
    }
    else if (output.result == 'success' && output.data.message) {

      this.modalService.dismissAll("close");
    }
  }
  releaseOffer() {
    this.modalService.dismissAll("close");
    this.router.navigate(['/interviewscheduler']);
  }
  searchCandidateForInterview() {
    console.log(this.searchInput);
    var input = { root: this.searchInput };
    this.candidateservice.searchCandidate(input).subscribe((output: {}) => this.searchCandidateResult(output),
      error => {
        console.log(error);
      })

  }
  searchCandidateResult(output) {
    if (output.result == 'success' && output.data && output.data.length > 0) {
      this.candidateListForJob = output.data;
    }

  }
  openModalApproval(job, content) {

    this.approvalInput = { "transtype": "approvejob", "id": job.id, "loginid": this.loginservice.loggedInUserId(), "usertype": this.loginservice.getUserType() };
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  approvalJob() {
    var input = { root: this.approvalInput };
    this.companyservice.approval(input).subscribe((output: {}) => this.approvalJobResult(output),
      error => {
        console.log(error);
      })
  }
  approvalJobResult(output) {
    console.log(output);
    if (output.result == 'success' && output.data) {
      this.modalService.dismissAll("close");
      this.getAllJobRequirement();
    }

  }
  ngOnInit() {
    this.getAllJobRequirement();
    this.candidateuserType = this.loginservice.getUserType();
    this.loginid = this.loginservice.loggedInUserId();
  }

}
