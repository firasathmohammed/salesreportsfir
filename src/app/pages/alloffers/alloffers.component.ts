import { Component, OnInit } from '@angular/core';
import { JobrequirementService } from '../jobrequirement/jobrequirement.service';
import { LoginService } from '../login/login.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-alloffers',
  templateUrl: './alloffers.component.html',
  styleUrls: ['./alloffers.component.scss']
})
export class AlloffersComponent implements OnInit {
  allOffersList: any = [];
  closeResult: string;
  offerAccepted: any = {};
  offermodalHeading: any = "";
  offermodalMsg: any = "";
  constructor(private modalService: NgbModal, private loginservice: LoginService, private jobservice: JobrequirementService) { }
  openModalAcceptOffer(offer, content, info) {

    this.offerAccepted = { "loginid": this.loginservice.loggedInUserId(), "usertype": this.loginservice.getUserType(), "transtype": "acceptoffer", candidateid: offer.candidateid, acceptoffer: "2", jobid: offer.jobreqid };
    if (info == 'accept') {
      this.offermodalHeading = "Aceept offer";
      this.offermodalMsg = "Do you want to accept the offer";
      this.offerAccepted.acceptoffer = "2"
    }
    else if (info == 'reject') {
      this.offermodalHeading = "Reject offer";
      this.offermodalMsg = "Do you want to reject the offer";
      this.offerAccepted.acceptoffer = "3"
    }
    else if (info == 'negotaite') {
      this.offermodalHeading = "Negotaite offer";
      this.offermodalMsg = "Do you want to negotaite the offer";
      this.offerAccepted.acceptoffer = "4"
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result) => {
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
  getAllOffers() {
    this.jobservice.getAlloffers().subscribe((output: {}) => this.getAllOffersResult(output),
      error => {
        console.log(error);
      })
  }
  getAllOffersResult(output) {
    console.log(output);
    if (output.result == 'success' && output.data && output.data.length > 0) {
      this.allOffersList = output.data;
    }

  }
  acceptOffer() {
    var input = { root: this.offerAccepted };
    this.jobservice.acceptOffers(input).subscribe((output: {}) => this.acceptOfferResult(output),
      error => {
        console.log(error);
      })
  }
  acceptOfferResult(output) {
    console.log(output);
    if (output.result == 'success' && output.data) {
      this.modalService.dismissAll("close");
      this.getAllOffers();
    }

  }
  ngOnInit() {
    this.getAllOffers();
  }

}
