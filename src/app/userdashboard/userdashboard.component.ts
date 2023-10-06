import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Requesting } from '../requesting';
import { DonorService } from '../donor.service';
import { Donor } from '../donor';
import { Observable, of } from 'rxjs';
import { single } from '../data';
import {  ColorHelper  } from '@swimlane/ngx-charts';
import { getScaleType } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

// view = [700, 400];

//  colorScheme = {
//    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
//  };

//   showXAxis = true;
//   showYAxis = true;
//   showLegend = true;
//   showXAxisLabel = true;
//   xAxisLabel = 'bloodGroup';
//   showYAxisLabel = true;
//   yAxisLabel = 'count';
//   gradient: boolean = true;

  single: any[] = single;

  loggedUser = "";
  tempUser = '';
  request = new Requesting();
  msg = '';
  requests : Observable<Requesting[]> | undefined;
  donor = new Donor();
  number : Observable<any> | undefined;
  totalrequests : Observable<any> | undefined;
  donationcount : Observable<any> | undefined;
  totalusers : Observable<any> | undefined;
  totalbloodgroups : Observable<any> | undefined;
  totalunits : Observable<any> | undefined;
  bloodRequests : Observable<any> | undefined;
  totalRequestHistoryCount:number =  5;
  totalIncomingRequest: number  = 6;

  constructor(private _router : Router, private donorService: DonorService, private activatedRoute: ActivatedRoute) {

   }

  ngOnInit(): void 
  {
    
    this.activatedRoute.params.subscribe(params => {
      const pattern = "\\\"\\\\\\\\1234\\\\\\\\\\\"";
      const parsedPattern = pattern.replace(/\\+/g, "");
// const intValue = parseInt(cleanedPattern, 10); 
      console.log(params['employeeId'],"hello");
      this.loggedUser = parsedPattern;
    });
    localStorage.removeItem("employeeId");
    localStorage.setItem("employeeId",this.loggedUser);
    this.reloadData(this.loggedUser);

    this.donorService.getRequestHistoryByEmail(this.donorService.userID).subscribe(data=>{
      this.totalRequestHistoryCount = data.length;
    });

  
    this.donorService.getIncomingRequestHistory(this.donorService.userID).subscribe(data=>{
      this.totalIncomingRequest = data.length;
    });

  }

  navigateHome()
  {
   this.loggedUser = JSON.stringify(localStorage.getItem('employeeId')|| '{}');
   this._router.navigate(['user', this.loggedUser]);
 }

 navigateToRequestHistory(){
  this._router.navigate(['/requesthistoryfromuser'])
 }

 navigateToIncomingRequestHistory(){
  this._router.navigate(['/incomingrequest'])
 }

  logout()
  {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

  pendingRequest(data: any){
    this.donorService.requesterData = data;
    this.donorService.setBloodGroup(data.bloodGroup);
    this._router.navigate(['/searchresult']);
  }

  acceptRequest(){

  }

  navigateToCreateRequest(){
    this._router.navigate(['/requestblood'])
  }

  reloadData(user: string) 
  {
      // this.requests = this.donorService.getRequestHistoryByEmail(user).pipe();
      this.donorService.getRequestHistoryByEmail(this.donorService.userID).subscribe(
        data => {
          console.log("Request sent Successfully");
          this.msg = "Blood Request Sent Successfully !!!";
          this.bloodRequests = of(data);
          console.log("dashboard data",data);
        //  this.donorService.setBloodGroup(this.request.bloodgroup);
         // this._router.navigate(['/searchresult'])
        },
        error => {
          console.log("request Failed");
          console.log(error.error);
        }
      )
      
  }


}
