import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DonorService } from '../donor.service';

@Component({
  selector: 'app-requesthistoryfromuser',
  templateUrl: './requesthistoryfromuser.component.html',
  styleUrls: ['./requesthistoryfromuser.component.css']
})
export class RequesthistoryfromuserComponent implements OnInit {

  loggedUser = '';
  tempUser = '';
  msg = '';
  title = '';
  requests : Observable<any> | undefined;
  
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
    if(this.loggedUser === "admin@gmail.com"){
      this.title = "Admin Dashboard";
    }
    else{
      this.title = "User Dashboard";
    }
    this.reloadData(this.loggedUser);
  }

  navigateHome()
  {
   this.loggedUser = JSON.stringify(localStorage.getItem('employeeId')|| '{}');
   this._router.navigate(['user', this.loggedUser]);
 }


  // reloadData() 
  // {
  //     // this.requests = this.donorService.getRequestHistoryByEmail(this.loggedUser);
  //     this.requests = of([{name: 'Himanshi Sinha', mobile : '9876543210', gender: 'Female', bloodgroup: 'B+', age: '28', units: '4', status: 'accept'}])
    
  //     console.log(this.requests);
  // }


  reloadData(user: string) 
  {
      // this.requests = this.donorService.getRequestHistoryByEmail(user).pipe();
      this.donorService.getRequestHistoryByEmail((this.donorService.userID)).subscribe(
        data => {
          console.log("Request sent Successfully");
          this.msg = "Blood Request Sent Successfully !!!";
          this.requests = of(data);
          console.log("request history from user",data);
        },
        error => {
          console.log("request Failed");
          console.log(error.error);
        }
      )
  }
  navigateToCreateRequest(){
    this._router.navigate(['/requestblood'])
  }
  pendingRequest(data: any){
    this.donorService.requesterData = data;
    this.donorService.setBloodGroup(data.bloodGroup);
    this._router.navigate(['/searchresult']);
  }

  moreInfo(data: any){
    this.donorService.idForMoreInfo = data?.id;
    this._router.navigate(['/moreinfo']);
  }


  logout()
  {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

  acceptRequest(){

  }

  

}
