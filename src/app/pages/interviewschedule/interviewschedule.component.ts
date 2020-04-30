import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../login/login.service';
import { InterviewscheduleService } from '../interviewschedule/interviewschedule.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-interviewschedule',
  templateUrl: './interviewschedule.component.html',
  styleUrls: ['./interviewschedule.component.scss']
})
export class InterviewscheduleComponent implements OnInit {
  closeResult: string;
  interviewList: any = [];
  parameterValue: any = 0;
  feedbackInput: any = {};
  historyInput: any = {};
  acceptInterviewInput: any = {};
  makeAnOfferInput: any = {};
  interviewView: any = true;
  acceptinterviewView: any = false;
  candidateuserType: any = '';
  constructor(private modalService: NgbModal, private loginservice: LoginService, private interviewScheduleService: InterviewscheduleService, public activeroute: ActivatedRoute) { }
  openModalFeedback(candidate, content) {
    this.feedbackInput = { "transtype": "interview", "candidateid": candidate.candidateid, "candidatename": candidate.candidatename, "jobid": candidate.jobreqid, "round": "", "interviewby": "", "status": "", "feedback": "", "loginid": this.loginservice.loggedInUserId(), "usertype": this.loginservice.getUserType() };
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  openModalAcceptInterview(candidate, content) {
    this.acceptInterviewInput = { "transtype": "acceptinterview", "candidateid": candidate.candidateid, "acceptinterview": "1", "candidatename": candidate.candidatename, "jobid": candidate.jobreqid, "loginid": this.loginservice.loggedInUserId(), "usertype": this.loginservice.getUserType() };
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  openMakeAnofferModal(candidate, content) {

    this.makeAnOfferInput = { "transtype": "offer", "candidateid": candidate.candidateid, "candidatename": candidate.candidatename, "jobid": candidate.jobreqid, "offeredby": "", "joiningdate": "", "acceptingdate": "", "loginid": this.loginservice.loggedInUserId(), "usertype": this.loginservice.getUserType(), "acceptoffer": "1",emailid:candidate.emailid };
    console.log(this.makeAnOfferInput);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  openInterviewHistoryModal(candidate, content) {
    console.log(candidate);
    this.historyInput = {
        "transtype": "candidatejobhistory", "jobid": candidate.jobreqid, "apptype": "hiringpad", "loginid": this.loginservice.loggedInUserId(), "usertype": "primaryuser",
        "candidateid": candidate.candidateid
      };
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
  getInterviewscheduleList(id) {
    this.interviewView = true;
    this.acceptinterviewView = false;
    var jobid = id;
    this.interviewScheduleService.getinterviewList(jobid).subscribe((output: {}) => this.getInterviewscheduleListResult(output),
      error => {
        console.log(error);
      })
  }
  getInterviewscheduleListResult(output) {
    console.log(output);
    if (output.result == 'success' && output.data && output.data.length > 0) {
      this.interviewList = output.data;
    }
    else if (output.result == 'success' && output.data.message) {

      this.interviewList = [];
    }
  }
  getAcceptCandidateList(id) {
    this.interviewView = false;
    this.acceptinterviewView = true;
    var jobid = id;
    this.interviewScheduleService.getacceptCandidateList(jobid).subscribe((output: {}) => this.getAcceptCandidateListResult(output),
      error => {
        console.log(error);
      })
  }
  getAcceptCandidateListResult(output) {
    console.log(output);
    if (output.result == 'success' && output.data && output.data.length > 0) {
      this.interviewList = output.data;
    }
    else if (output.result == 'success' && output.data.message) {

      this.interviewList = [];
    }
  }
  getInterviewSchedule() {
    var parameterID = this.parameterValue;

    this.getInterviewscheduleList(parameterID);
  }
  getacceptcandidateSchedule() {
    var parameterID = this.parameterValue;

    this.getAcceptCandidateList(parameterID);
  }
  createFeedbackForCandidate(candidate, content) {
    this.openModalFeedback(candidate, content);

  }
  acceptForCandidateModal(candidate, content) {
    this.openModalAcceptInterview(candidate, content);
  }
  acceptcandidatForInterview() {
    var input = { root: this.acceptInterviewInput };
    this.interviewScheduleService.acceptsCandidateForInterview(input).subscribe((output: {}) => this.acceptcandidatForInterviewResult(output),
      error => {
        console.log(error);
      })
  }
  acceptcandidatForInterviewResult(output) {
    if (output.result == 'success' && output.data) {
      this.modalService.dismissAll("close");
      this.getInterviewSchedule();
    }
  }
  giveFeedbackToCandidate() {
    var input = { root: this.feedbackInput };
    this.interviewScheduleService.giveFeedbackToCandidate(input).subscribe((output: {}) => this.giveFeedbackToCandidateResult(output),
      error => {
        console.log(error);
      })
  }
  giveFeedbackToCandidateResult(output) {
    if (output.result == 'success' && output.data) {
      this.modalService.dismissAll("close");
    }
  }
  makeanOffer() {
    var input = { root: this.makeAnOfferInput };
    this.interviewScheduleService.makeAnofferCandidate(input).subscribe((output: {}) => this.giveFeedbackToCandidateResult(output),
      error => {
        console.log(error);
      })
  }
  makeanOfferResult(output) {
    if (output.result == 'success' && output.data) {
      this.modalService.dismissAll("close");
      this.getacceptcandidateSchedule();
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
    var parameterID = this.activeroute.snapshot.paramMap.get("id");
    this.parameterValue = parameterID ? parameterID : 0;
    this.getInterviewscheduleList(parameterID);
    this.candidateuserType = this.loginservice.getUserType();

  }

}
