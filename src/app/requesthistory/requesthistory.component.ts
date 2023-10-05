import { Component, OnInit, Self } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DonorService } from '../donor.service';
import { Requesting } from '../requesting';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-requesthistory',
  templateUrl: './requesthistory.component.html',
  styleUrls: ['./requesthistory.component.css']
})
export class RequesthistoryComponent implements OnInit {

  loggedUser = 0;
  tempUser = '';
  msg = '';
  title = '';
  requests : Observable<any> | undefined;
  responses : Observable<any> | undefined;

  constructor(private _router : Router, private donorService: DonorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void 
  {
    //this.loggedUser = localStorage.getItem('employeeId');
    this.loggedUser = 2;
    this.reloadData();
  }

  navigateHome()
  {
    //this.loggedUser = JSON.stringify(localStorage.getItem('employeeId')|| '{}');
    this._router.navigate(['user', this.loggedUser]);
  }

  reloadData() 
  {
    this.requests = this.donorService.getRequestHistory(2);
  }

  acceptRequest(id : number)
  {
    this.donorService.acceptRequestForBlood(id,this.loggedUser).subscribe(
      data => {
        console.log("Request sent Successfully");
      },
      error => {
        console.log("request Failed");
        console.log(error.error);
      }
    )
    this.reloadData();
  }

  logout()
  {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
  
}
