import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from './company.service';
import { LoginService } from '../login/login.service';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  closeResult: string;
  schoolDetails: any = {};
  productsDetails:any = {};
  companyList: any = [];
  schoolList:any = [];
  productsList:any = [];
  categories:any = [];
  loginid: any = '';
  approvalInput: any = {};
  Schoolname:any = '';
  constructor(private modalService: NgbModal, private loginservice: LoginService, private companyservice: CompanyService) { }
  openModalCreate(content) {
    this.schoolDetails = { id: 0,name: "", registration: "",  address: "", mobileno: "", emailid: "", about: "" ,products:[]}
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  openModalUpdate(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  openModalApproval(company, content) {

    this.approvalInput = { "transtype": "approveemployer", "id": company.id, "loginid": this.loginservice.loggedInUserId(), "usertype": this.loginservice.getUserType() };
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  openModalProductslist(school, content) {
   this.Schoolname = school.name;
 
   // this.productsList = school.products;
   this.productsList = [];
   for (let details of school.products) {
if(this.productsList && this.productsList.length > 0){
  var founddata = this.productsList.find(function(e) {
    return e.category == details.size;
  });
    if(founddata){
      founddata.product.push(details)
    }
    else{
      var data = {category : details.size,product:[]}
      data.product.push(details)
  this.productsList.push(data)
    }
  
}
else{
  var data = {category : details.size,product:[]}
  data.product.push(details)
  this.productsList.push(data)
}

   }
   console.log(this.productsList);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  editProducts(products,content){
    this.productsDetails = { id: products.id,name: products.name, size: products.size,  price: products.price, totalstock: products.totalstock, sold: products.sold,schoolid : products.schoolid}
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  UpdateProduct(products,modal){
    this.companyservice.getSchools().find(function(x) { 
      
      if(x.id == products.schoolid){
        x.products.find(function(e) { 
          if(e.id == products.id){
            e.name = products.name;
            e.price = products.price;
            e.totalstock = products.totalstock;
            e.sold = products.sold;
          }
        });
        
      }
      
    });
    modal.dismiss('Cross click')
  }
  openModalAddProduct(school, content) {
    this.productsDetails = { id: 0,name: "", size: "",  price: "", totalstock: "", sold: "",schoolid : school.id}
   
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
  addProdcuts(modal){
    if(this.productsDetails.id == 0){
    var data = this.productsDetails
    this.companyservice.getSchools().find(function(x) { 
      
      if(x.id == data.schoolid){
        data.id = x.products.length+1;
        x.products.push(data);
      }
      
    });
    
    this.modalService.dismissAll("close");
  }
  else{
    this.UpdateProduct(this.productsDetails,modal)
  }
  }
  approvalCompany() {
    var input = { root: this.approvalInput };
    this.companyservice.approval(input).subscribe((output: {}) => this.approvalCompanyResult(output),
      error => {
        console.log(error);
      })
  }
  approvalCompanyResult(output) {
    console.log(output);
    if (output.result == 'success' && output.data) {
      this.modalService.dismissAll("close");
    //  this.getAllCompanies();
    }

  }
  createCompany() {
    var input = { root: this.schoolDetails };
    this.schoolDetails.id = this.companyservice.schools.length+1;
    this.schoolList.push(this.schoolDetails);
    this.modalService.dismissAll("close");
    this.schoolList = this.companyservice.getSchools();
    // this.companyservice.createUpdateCompany(input).subscribe((output: {}) => this.createCompanyResult(output),
    //   error => {
    //     console.log(error);
    //   })
  }
  createCompanyResult(output) {
    console.log(output);
    //this.getAllCompanies();
    if (output.result === 'success') {
      this.modalService.dismissAll("close");
    //  this.getAllCompanies();
    }

  }
  getschoolDetails(details, contents) {
    this.companyservice.getCompanuDetails(details.id).subscribe((output: {}) => this.getschoolDetailsResult(output, contents),
      error => {
        console.log(error);
      })
  }
  getschoolDetailsResult(output, contents) {
    console.log(output);
    if (output.result === 'success') {
      var OD = output.data[0];
      this.schoolDetails = { "loginid": this.loginservice.loggedInUserId(), "usertype": this.loginservice.getUserType(), "transtype": "update", id: OD.id, companyname: OD.company, companyrgstno: OD.companyregistration, companybusiness: OD.companybusiness, registrationdate: OD.registrationdate, noemployee: OD.numberofemployees, address: OD.address, website: OD.website, location: OD.location, phoneno: OD.mobileno, emailid: OD.emailid, about: OD.aboutus };
      this.openModalUpdate(contents);
    }
  }
  getAllSchools() {
   // this.companyList = output.data;
  }
  getAllSchoolsResult(output) {
    console.log(output);
    if (output.result == 'success' && output.data && output.data.length > 0) {
      this.companyList = output.data;
    }

  }
  ngOnInit() {
   //  this.getAllSchools();
    // this.loginid = this.loginservice.loggedInUserId();
    this.schoolList = this.companyservice.getSchools();
    this.categories = this.companyservice.getCategories();
    console.log("school",  this.schoolList)
  }

}
