import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Requesting } from '../requesting';
import { DonorService } from '../donor.service';
import { Donor } from '../donor';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

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
  totalRequestHistoryCount: Observable<any> | undefined;
  totalIncomingRequest: Observable<any> | undefined;

  constructor(private _router : Router, private donorService: DonorService, private activatedRoute: ActivatedRoute) { }

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
    // this.tempUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    // if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length -1) === '"')
    // {
    //   this.tempUser = this.tempUser.substr(1, this.tempUser.length-2);
    // }   
    // this.loggedUser = this.tempUser;
    // this.msg = '';
   // this.number =  this.donorService.getTotalDonors();
    // this.totalusers = this.donorService.getTotalUsers();
    // this.totalbloodgroups = this.donorService.getTotalBloodGroups();
    // this.totalunits = this.donorService.getTotalUnits();
    // this.donationcount = this.donorService.getTotalDonationCount(this.loggedUser);
    // this.totalrequests = this.donorService.getTotalRequests(this.loggedUser);
    // this.requests = this.donorService.getRequestHistory(this.donorService.userID);
    this.reloadData(this.loggedUser);

    this.donorService.getRequestHistoryByEmail(this.donorService.userID).subscribe(data=>{
      this.totalRequestHistoryCount = data.length;
      console.log("hello 1234567",data)
    });

  
    this.donorService.getRequestHistory(this.donorService.userID).subscribe(data=>{
      this.totalIncomingRequest = data.length;
      console.log("hello 1234567",data)
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
      // this.bloodRequests = 
      // of([{name: 'Himanshi Sinha', mobile : '1234', gender: 'Female', bloodgroup: 'B+', age: '28', units: '4', status: 'accept'},
      // {name: 'Himanshi Sinha', mobile : '123455', gender: 'Female', bloodgroup: 'B+', age: '28', units: '4', status: 'accept'},
      // {name: 'Himanshi Sinha', mobile : '12345', gender: 'Female', bloodgroup: 'B+', age: '28', units: '4', status: 'pending'},
      // {name: 'Himanshi Sinha', mobile : '12345', gender: 'Female', bloodgroup: 'B+', age: '28', units: '4', status: 'pending'},
      // {name: 'Himanshi Sinha', mobile : '12345', gender: 'Female', bloodgroup: 'B+', age: '28', units: '4', status: 'accept'},
      // {name: 'Himanshi Sinha', mobile : '12345', gender: 'Female', bloodgroup: 'B+', age: '28', units: '4', status: 'accept'},
      // {name: 'Himanshi Sinha', mobile : '12345', gender: 'Female', bloodgroup: 'B+', age: '28', units: '4', status: 'pending'},
      // {name: 'Himanshi Sinha', mobile : '12345', gender: 'Female', bloodgroup: 'B+', age: '28', units: '4', status: 'pending'}])
    
      // console.log(this.bloodRequests);
      
  }


}
