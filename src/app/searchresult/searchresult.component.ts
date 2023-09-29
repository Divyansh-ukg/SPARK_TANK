import { Component, OnInit } from '@angular/core';


interface resultDataInterface {
  id: number;
  name: string;
  password: string;
  phoneNum: number;
  address: string;
  bloodGroup: string;
  selected?: boolean;
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
        "id": 2,
        "name": "raj",
        "password": "test",
        "phoneNum": 23423,
        "address": "Noida",
        "bloodGroup": "O+"
    },

    {

        "id": 4,

        "name": "divyansh",

        "password": "test",

        "phoneNum": 34534,

        "address": "Noida",

        "bloodGroup": "O-"

    },
    {

      "id": 2,

      "name": "raj",

      "password": "test",

      "phoneNum": 23423,

      "address": "Noida",

      "bloodGroup": "O+"

  },

  {

      "id": 4,

      "name": "divyansh",

      "password": "test",

      "phoneNum": 34534,

      "address": "Noida",

      "bloodGroup": "O-"

  },
  {

    "id": 2,

    "name": "raj",

    "password": "test",

    "phoneNum": 23423,

    "address": "Noida",

    "bloodGroup": "O+"

},

{

    "id": 4,

    "name": "divyansh",

    "password": "test",

    "phoneNum": 34534,

    "address": "Noida",

    "bloodGroup": "O-"

},
{

  "id": 2,

  "name": "raj",

  "password": "test",

  "phoneNum": 23423,

  "address": "Noida",

  "bloodGroup": "O+"

},

{

  "id": 4,

  "name": "divyansh",

  "password": "test",

  "phoneNum": 34534,

  "address": "Noida",

  "bloodGroup": "O-"

},
{

  "id": 2,

  "name": "raj",

  "password": "test",

  "phoneNum": 23423,

  "address": "Noida",

  "bloodGroup": "O+"

},

{

  "id": 4,

  "name": "divyansh",

  "password": "test",

  "phoneNum": 34534,

  "address": "Noida",

  "bloodGroup": "O-"

},
{

  "id": 2,

  "name": "raj",

  "password": "test",

  "phoneNum": 23423,

  "address": "Noida",

  "bloodGroup": "O+"

},

{

  "id": 4,

  "name": "divyansh",

  "password": "test",

  "phoneNum": 34534,

  "address": "Noida",

  "bloodGroup": "O-"

},
{

  "id": 2,

  "name": "raj",

  "password": "test",

  "phoneNum": 23423,

  "address": "Noida",

  "bloodGroup": "O+"

},

{

  "id": 4,

  "name": "divyansh",

  "password": "test",

  "phoneNum": 34534,

  "address": "Noida",

  "bloodGroup": "O-"

},
{

  "id": 2,

  "name": "raj",

  "password": "test",

  "phoneNum": 23423,

  "address": "Noida",

  "bloodGroup": "O+"

},

{

  "id": 4,

  "name": "divyansh",

  "password": "test",

  "phoneNum": 34534,

  "address": "Noida",

  "bloodGroup": "O-"

}

]

  constructor() { }

  ngOnInit(): void {

  }

  selectAll(e: any) {
    this.searchBloodGroupResult.forEach((item: resultDataInterface) => {
      item.selected = e.target.checked;
    });
  }

  sendNotification(){
    const selectedResults = [];
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
