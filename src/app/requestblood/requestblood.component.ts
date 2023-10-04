import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DonorService } from '../donor.service';
import { Requesting } from '../requesting';

@Component({
  selector: 'app-requestblood',
  templateUrl: './requestblood.component.html',
  styleUrls: ['./requestblood.component.css']
})
export class RequestbloodComponent implements OnInit {

  loggedUser = '';
  tempUser = '';
  request = new Requesting();
  msg = '';
  
  constructor(private _router : Router, private donorService: DonorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.tempUser = JSON.stringify(localStorage.getItem('employeeId')|| '{}');
    if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length -1) === '"')
    {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length-2);
    }   
    this.loggedUser = this.tempUser;
    this.msg = '';
    //this.request.empid = localStorage.getItem('employeeId');
    this.request.empid = 1;
  }

  navigateHome()
  {
    this.loggedUser = JSON.stringify(localStorage.getItem('employeeId')|| '{}');
    console.log(this.loggedUser,"abcdedf");
    this._router.navigate(['user', this.loggedUser]);
  }
  
  requestBlood()
  {
    this.donorService.requestForBlood(this.request).subscribe(
      data => {
        console.log("Request sent Successfully");
        console.log(this.request.bloodGroup);
      },
      error => {
        console.log("request Failed");
        console.log(error.error);
      }
    )
    this._router.navigate(['/searchresult']);
  }

  logout()
  {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

}
