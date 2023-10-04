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
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {
  selectedDataToSend =[];
  searchBloodGroupResult: resultDataInterface[] = [
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
  "name": "aditya",
  "password": "test",
  "phoneNum": 9922932245,
  "address": "Noida",
  "bloodGroup": "B+",
  "gender": "male"
},
{
  "id": 4,
  "name": "himanshi",
  "password": "test",
  "phoneNum": 34543,
  "address": "Noida",
  "bloodGroup": "O+",
  "gender": "female"
},
{
"id": 5,
"name": "Ashutosh",
"password": "test",
"phoneNum": 34543,
"address": "Noida",
"bloodGroup": "O+",
"gender": "male"
}
]

  constructor(private donorService: DonorService) { }

  ngOnInit(): void {
    //TODO:get results from blood group
    this.donorService.getDataByBloodGroup(this.donorService.getBloodGroup());

  }

  selectAll(e: any) {
    this.searchBloodGroupResult.forEach((item: resultDataInterface) => {
      item.selected = e.target.checked;
    });
  }

  selectedRecord(e: any, result: any) {
    this.searchBloodGroupResult.forEach((item) => {
      if(item.id === result.id){
        item.selected = result.selected;
      }
    })
  }


  sendNotification(){
    let selectedResults: resultDataInterface[] = [];
    this.searchBloodGroupResult.forEach((item: resultDataInterface) => {
      if(item.selected){
        selectedResults.push(item);
      }
    });
    if (selectedResults.length === 0) {
      alert('no item selected');
      return;
    }
    //TODO: will send data 
  }
}
