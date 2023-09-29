import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Donor } from '../donor';
import { DonorService } from '../donor.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-donorlist',
  templateUrl: './donorlist.component.html',
  styleUrls: ['./donorlist.component.css']
})

export class DonorlistComponent implements OnInit {

  loggedUser = '';
  tempUser = '';
  title = '';
  bloodGroup : any;
  donors : Observable<Donor[]> | undefined;
  
  constructor(private donorService: DonorService, private activatedRoute: ActivatedRoute, private _router:Router) { }

  ngOnInit(): void 
  {
    this.tempUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length -1) === '"')
    {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length-2);
    }   
    this.loggedUser = this.tempUser;

    this.reloadData();

    if(this.loggedUser === "admin@gmail.com"){
      this.title = "Admin Dashboard";
    }
    else{
      this.title = "User Dashboard";
    }
  }

  reloadData() {
    //this.donors = this.donorService.getDonorList();
    this.donors = of([
      {
          "id": 0,
          "name": "aditya",
          "password": "test",
          "phoneNum": 9922932245,
          "address": "Noida",
          "bloodGroup": "B+",
          "gender": "male"
      },
      {
          "id": 1,
          "name": "himanshi",
          "password": "test",
          "phoneNum": 34543,
          "address": "Noida",
          "bloodGroup": "O+",
          "gender": "female"
      },
      {
        "id": 2,
        "name": "Ashutosh",
        "password": "test",
        "phoneNum": 34543,
        "address": "Noida",
        "bloodGroup": "O+",
        "gender": "male"
    },
    {
      "id": 3,
      "name": "Divyansh",
      "password": "test",
      "phoneNum": 34543,
      "address": "Noida",
      "bloodGroup": "A+",
      "gender": "male"
  },
  {
    "id": 4,
    "name": "Raj",
    "password": "test",
    "phoneNum": 34543,
    "address": "Noida",
    "bloodGroup": "A+",
    "gender": "male"
},
{
  "id": 5,
  "name": "test",
  "password": "test",
  "phoneNum": 34543,
  "address": "Noida",
  "bloodGroup": "A-",
  "gender": "female"
}
    ]);
    console.log(this.donors);
  }

  navigateHome()
  {
    if(this.loggedUser === "admin@gmail.com"){
      this.title = "Admin Dashboard";
      this._router.navigate(['/loginsuccess']);
    }
    else{
      this.title = "User Dashboard";
      this._router.navigate(['/userdashboard']);
    }
  }

  logout()
  {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
  
  search()
  {
    if(this.bloodGroup == ""){
      this.reloadData();
    }
    else
    {
       this.donors = this.donors?.pipe(
         map(results => results.filter(res=>{
           return res.bloodGroup.toLocaleLowerCase().match(this.bloodGroup.toLocaleLowerCase());
         }))
       );
    }
  }
  
}
