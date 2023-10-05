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
  searchBloodGroupResult: resultDataInterface[] = []

  constructor(private donorService: DonorService) { }

  ngOnInit(): void {
    this.donorService.getDataByBloodGroup(this.donorService.requesterData.bloodGroup).subscribe((data) => {
      this.searchBloodGroupResult = data;
    }, ((error) => {
      this.searchBloodGroupResult = [
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
    }));

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
    // let selectedResults: resultDataInterface[] = [];
    let selectedEmpID: any =  [];
    this.searchBloodGroupResult.forEach((item: resultDataInterface) => {
      if(item.selected){
        // selectedResults.push(item);
        selectedEmpID.push(item.id)
      }
    });
    if (selectedEmpID.length === 0) {
      alert('no item selected');
      return;
    }
    const request = {
      bloodRequestId: this.donorService.requesterData.id,
      requesterEmpId: this.donorService.requesterData.empid,
      donorEmpId: selectedEmpID
    }
    this.donorService.sendDataForNotification(request).subscribe(() => {
      console.log('email sent successfully')
    },error => {
      console.log('email error')
    });
  }
}
