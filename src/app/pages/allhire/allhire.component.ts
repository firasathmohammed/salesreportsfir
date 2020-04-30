import { Component, OnInit } from '@angular/core';
import { JobrequirementService } from '../jobrequirement/jobrequirement.service';
import { LoginService } from '../login/login.service';
@Component({
  selector: 'app-allhire',
  templateUrl: './allhire.component.html',
  styleUrls: ['./allhire.component.scss']
})
export class AllhireComponent implements OnInit {
  allHireList:any=[];
  constructor(private loginservice: LoginService, private jobservice: JobrequirementService) { }
  getAllHire() {
    this.jobservice.getAllhiring().subscribe((output: {}) => this.getAllHireResult(output),
      error => {
        console.log(error);
      })
  }
  getAllHireResult(output) {
    console.log(output);
    if (output.result == 'success' && output.data && output.data.length > 0) {
      this.allHireList = output.data;
    }
  }
  ngOnInit() {
    this.getAllHire();
  }

}
