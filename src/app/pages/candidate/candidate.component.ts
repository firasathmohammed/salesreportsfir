import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {LoginService} from '../login/login.service';
import {CandidateService} from './candidate.service';
import { InterviewscheduleService } from '../interviewschedule/interviewschedule.service';
@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  closeResult: string;
  candidateDetails: any = {};
  candidateList:any = [];
  historyInput: any = {};
  constructor(private modalService: NgbModal,private loginservice:LoginService,private candidateservice:CandidateService,private interviewScheduleService: InterviewscheduleService) { }
  openModalCreate(content) {
    this.candidateDetails = { "loginid": this.loginservice.loggedInUserId(), "usertype":this.loginservice.getUserType(),"transtype": "create", "name": "", "panno": "", "phoneno": "", "emailid": "", "gender": "", "dob": "", "skill": "", "experience": "", "designation": "", "currentctc": "", "expectedctc": "", "noticeperiod": "", "currentwork": "", "desiredwork": "", "diffrentshift": "no", "openinternational": "", "address": "", "pincode": "", "city": "", "state": "" };
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  openModalupdate(content) {
   
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  openInterviewHistoryModal(candidate, content) {
    console.log(candidate);
    this.historyInput = {"transtype": "candidateallhistory", "apptype": "hiringpad", "loginid": this.loginservice.loggedInUserId(), "usertype":this.loginservice.getUserType(), "candidateid": candidate.id};
    this.getInterviewHistory();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
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
  createupdateCandidate() {
    console.log(this.candidateDetails);
    var input = {root:this.candidateDetails};
    this.candidateservice.createupdateCandidate(input).subscribe((output: {}) => this.createupdateCandidateResult(output),
    error => {
    })

  }
  createupdateCandidateResult(output:any){
    console.log(output);
   if(output.result === 'success'){
     this.modalService.dismissAll("close");
     this.getAllCandidate();
   }
  }
 
  getAllCandidate() {
    
    this.candidateservice.getAllCandidates().subscribe((output: {}) => this.getAllResult(output),
    error => {
    })

  }
  getAllResult(output:any){
    console.log(output);
   if(output.result === 'success'){
    
     this.candidateList = output.data;
   }
  }
  getCandidateDetails(details,contents){
    console.log(details);
    this.candidateservice.getCandidatedetails(details.id).subscribe((output: {}) => this.getCandidateDetailsResult(output,contents),
    error => {
    })
  }
  getCandidateDetailsResult(output:any,contents){
    console.log(output);
    if(output.result === 'success'){
      var OD = output.data[0]
      this.candidateDetails = { "loginid": this.loginservice.loggedInUserId(),"usertype":this.loginservice.getUserType(), "transtype": "update", "id":OD.id,"name": OD.name, "panno": OD.vatno, "phoneno": OD.mobileno, "emailid": OD.emailid, "gender": OD.gender, "dob": OD.dob, "skill": OD.skills, "experience": OD.experience, "designation": OD.designation, "currentctc": OD.currentctc, "expectedctc": OD.expectedctc, "noticeperiod": OD.noticeperiod, "currentwork": OD.currentlocation, "desiredwork": OD.desiredlocation, "diffrentshift": OD.shifts, "openinternational": OD.openinternational, "address": OD.address, "pincode": OD.pincode, "city": OD.city, "state": OD.state };
      this.openModalupdate(contents);
    }
  }
  getInterviewHistory() {
    var input = { root: this.historyInput };
    this.interviewScheduleService.getInterviewHistory(input).subscribe((output: {}) => this.getInterviewHistoryResult(output),
      error => {
        console.log(error);
      })
  }
  getInterviewHistoryResult(output) {
    if (output.result == 'success' && output.data) {
      
    }
  }
  ngOnInit() {
    this.getAllCandidate();
  }

}
