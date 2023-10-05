import { Component, OnInit } from '@angular/core';
import { DonorService } from '../donor.service';

interface resultDataInterface {
  id: number;
  name: string;
  password: string;
  phoneNum: number;
  address: string;
  bloodGroup: string;
  selected?: boolean;
  gender:string
}

@Component({
  selector: 'app-moreinfo',
  templateUrl: './moreinfo.component.html',
  styleUrls: ['./moreinfo.component.css']
})

export class MoreinfoComponent implements OnInit {
  searchBloodGroupResult: resultDataInterface[] = []
  constructor(private donorService: DonorService) { }

  ngOnInit(): void {
    this.donorService.getMoreInfoData(this.donorService.idForMoreInfo).subscribe((data) => {
      this.searchBloodGroupResult = data;
    }, error => {
      //   this.searchBloodGroupResult = [
  //     {
  //       "id": 0,
  //       "name": "aditya",
  //       "password": "test",
  //       "phoneNum": 9922932245,
  //       "address": "Noida",
  //       "bloodGroup": "B+",
  //       "gender": "male"
  //   },
  //   {
  //       "id": 1,
  //       "name": "himanshi",
  //       "password": "test",
  //       "phoneNum": 34543,
  //       "address": "Noida",
  //       "bloodGroup": "O+",
  //       "gender": "female"
  //   },
  //   {
  //     "id": 2,
  //     "name": "Ashutosh",
  //     "password": "test",
  //     "phoneNum": 34543,
  //     "address": "Noida",
  //     "bloodGroup": "O+",
  //     "gender": "male"
  // },
  // {
  //   "id": 3,
  //   "name": "aditya",
  //   "password": "test",
  //   "phoneNum": 9922932245,
  //   "address": "Noida",
  //   "bloodGroup": "B+",
  //   "gender": "male"
  // },
  // {
  //   "id": 4,
  //   "name": "himanshi",
  //   "password": "test",
  //   "phoneNum": 34543,
  //   "address": "Noida",
  //   "bloodGroup": "O+",
  //   "gender": "female"
  // },
  // {
  // "id": 5,
  // "name": "Ashutosh",
  // "password": "test",
  // "phoneNum": 34543,
  // "address": "Noida",
  // "bloodGroup": "O+",
  // "gender": "male"
  // }
  // ]
    })
  
  }

}
