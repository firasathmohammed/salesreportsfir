import { Component, OnInit,ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../login/login.service';
import { UserProfileService } from './user-profile.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;
  closeResult: string;
  userDetails: any = {};
  userList:any = [];
  companyList:any = [];
  constructor(private modalService: NgbModal, private loginservice: LoginService, private userservice: UserProfileService) { }
  openModalCreate(content: any) {
    this.userDetails = { "transtype": "create", "username": "", "password": "", "emailid": "", "gender": "", "companyname": "", "companyid": "", "loginid": this.loginservice.loggedInUserId(), "user_type": "","usertype":this.loginservice.getUserType(), }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openModalUpdate(content:any) {

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
  createUpdateUser() {
    var companyid = this.userDetails.companyid
    var companydetails = this.companyList.find(function(e) {
      return e.id == companyid;
    });
    this.userDetails.companyname = companydetails.company;
    var input = { root: this.userDetails };
   
    this.userservice.createUpdateUser(input).subscribe((output: {}) => this.createUserResult(output),
      error => {
        console.log(error);
      })
  }
  createUserResult(output) {
    console.log(output);
    //this.getAllCompanies();
    if (output.result === 'success') {
      this.modalService.dismissAll("close");
      this.getAllUsers();
    }

  }
  getUserDetails(details, contents) {
    this.userservice.getUsersDetails(details.userid).subscribe((output: {}) => this.getUserDetailsResult(output, contents),
      error => {
        console.log(error);
      })
  }
  getUserDetailsResult(output, contents) {
    console.log(output);
    if (output.result === 'success') {
      var OD = output.data[0];
      this.userDetails = { "loginid": this.loginservice.loggedInUserId(), "transtype": "update", "username":OD.username, "password": OD.password, "emailid": OD.emailid, "gender": OD.gender, "companyname": OD.companyname, "companyid": OD.companyid,  "user_type": OD.user_type,id:OD.userid,"usertype":this.loginservice.getUserType() };
      this.openModalUpdate(contents);
    }
  }
  getAllUsers() {
    this.userservice.getUsers().subscribe((output: {}) => this.getAllUsersResult(output),
      error => {
        console.log(error);
      })
  }
  getAllUsersResult(output) {
    console.log(output);
    if (output.result == 'success' && output.data && output.data.length > 0) {
      //this.userList = output.data;
    // this.userList.push(output.data);
     this.userList = this.userList.concat(output.data);
   
    }

  }
  getAllCompanies() {
    this.userservice.getAllCompanies().subscribe((output: {}) => this.getAllCompaniesResult(output),
      error => {
        console.log(error);
      })
  }
  getAllCompaniesResult(output) {
    console.log("Get all companies",output);
    if (output.result == 'success' && output.data && output.data.length > 0) {
      this.companyList = output.data;
    }

  }
  nextUserList(evenet, id){

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if (end === total) {
     console.log("call next user list with id",id);
     this.getAllUsers();
    }
  }
  ngOnInit() {
    this.getAllUsers();
    this.getAllCompanies();
  }

}
