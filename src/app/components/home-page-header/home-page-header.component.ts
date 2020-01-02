import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-header',
  templateUrl: './home-page-header.component.html',
  styleUrls: ['./home-page-header.component.scss']
})
export class HomePageHeaderComponent implements OnInit {
  isUserLoggedIn:boolean=true;
  
  constructor() { }

  userDetails:any; 

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    if(!this.userDetails) {
      this.isUserLoggedIn=false; 
    }
  }

  logOut() {
    localStorage.removeItem('user_details');
    this.isUserLoggedIn=false;
  }

  gettingUserLoggedIn(value) {
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    this.isUserLoggedIn=value; 
  }
}
