import { Component, OnInit, Self } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DonorService } from '../donor.service';
import { Requesting } from '../requesting';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-requesthistory',
  templateUrl: './requesthistory.component.html',
  styleUrls: ['./requesthistory.component.css']
})
export class RequesthistoryComponent implements OnInit {

  loggedUser = '';
  tempUser = '';
  msg = '';
  title = '';
  requests : Observable<any> | undefined;
  responses : Observable<any> | undefined;

  constructor(private _router : Router, private donorService: DonorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.tempUser = JSON.stringify(localStorage.getItem('employeeId')|| '{}');
    // if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length -1) === '"')
    // {
    //   this.tempUser = this.tempUser.substr(1, this.tempUser.length-2);
    // }   
    this.loggedUser = this.tempUser;
    this.msg = '';
    this.reloadData(this.loggedUser);
  }

  navigateHome()
  {
    this.loggedUser = JSON.stringify(localStorage.getItem('employeeId')|| '{}');
    this._router.navigate(['user', this.loggedUser]);
  }

  // reloadData() 
  // {
  //   this.requests = this.donorService.getRequestHistory(2);
  //   console.log(this.requests);
  //   //requests
  // }

  reloadData(user: string) 
  {
      // this.requests = this.donorService.getRequestHistoryByEmail(user).pipe();
      this.donorService.getRequestHistory(parseInt("4")).subscribe(
        data => {
          console.log("Request sent Successfully");
          this.msg = "Blood Request Sent Successfully !!!";
          this.requests = of(data);
          console.log(data);
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


  acceptRequest(curremail : string)
  {
    this.responses = this.donorService.acceptRequestForBlood(curremail);
    $("#acceptbtn").hide();
    $("#rejectbtn").hide();
    $("#acceptedbtn").show();
    $("#rejectedbtn").hide();
    $("acceptbtn").val("Accepted");
  }

  rejectRequest(curremail : string)
  {
    this.responses = this.donorService.rejectRequestForBlood(curremail);
    $("#acceptbtn").hide();
    $("#rejectbtn").hide();
    $("#acceptedbtn").hide();
    $("#rejectedbtn").show();
  }

  logout()
  {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
  
}
