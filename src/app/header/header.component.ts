import { Component, OnInit } from '@angular/core';
import { Requesting } from '../requesting';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser = '';
  tempUser = '';
  request = new Requesting();
  msg = '';

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.tempUser = JSON.stringify(localStorage.getItem('employeeId')|| '{}');
    if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length -1) === '"')
    {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length-2);
    }   
    this.loggedUser = this.tempUser;
    this.msg = '';
  }

  logout()
  {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  
  navigateHome()
  {
    this.router.navigate(['/user/emp123']);
  }

}
