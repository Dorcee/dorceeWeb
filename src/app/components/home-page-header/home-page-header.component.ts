import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-header',
  templateUrl: './home-page-header.component.html',
  styleUrls: ['./home-page-header.component.scss']
})
export class HomePageHeaderComponent implements OnInit {
  isUserLoggedIN:boolean=false;
  
  constructor() { }

  userDetails = JSON.parse(localStorage.getItem('user_details')); 

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    this.isUserLoggedIN=true; 
  }

  logOut() {
    localStorage.removeItem('user_details');
    this.isUserLoggedIN=false;
  }

  gettingUserLoggedIn() {
   this.isUserLoggedIN=true; 
  }
}
