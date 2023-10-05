import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DonorService } from '../donor.service';

@Component({
  selector: 'app-bloodstock',
  templateUrl: './bloodstock.component.html',
  styleUrls: ['./bloodstock.component.css']
})
export class BloodstockComponent {

  loggedUser = '';
  tempUser = '';
  title = '';
  bloodDetails : Observable<any[]> | undefined;
  
  constructor(private donorService: DonorService, private activatedRoute: ActivatedRoute, private _router : Router) { }
  bloodGroupsData = [
    {
      "bloodGroup": "A-",
      "count": 1
    },
    {
      "bloodGroup": "AB+",
      "count": 3
    },
    {
      "bloodGroup": "B+",
      "count": 2
    },
    {
      "bloodGroup": "B-",
      "count": 1
    },
    {
      "bloodGroup": "O+",
      "count": 1
    },
    {
      "bloodGroup": "O-",
      "count": 1
    }
  ];
  ngOnInit(): void 
  {
    this.tempUser = JSON.stringify(sessionStorage.getItem('employeeId')|| '{}');
    if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length -1) === '"')
    {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length-2);
    }   
    this.loggedUser = this.tempUser;

    // this.getBloodDetails();

    if(this.loggedUser === "admin@gmail.com"){
      this.title = "Admin Dashboard";
    }
    else{
      this.title = "User Dashboard";
    }
  }

  // getBloodDetails()
  // {
  //   this.bloodDetails = this.donorService.getBloodDetails();
  // }

  navigateHome()
  {
   this.loggedUser = JSON.stringify(localStorage.getItem('employeeId')|| '{}');
   this._router.navigate(['user', this.loggedUser]);
 }

  // logout()
  // {
  //   sessionStorage.clear();
  //   this._router.navigate(['/login']);
  // }

}
