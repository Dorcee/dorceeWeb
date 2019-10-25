import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-header',
  templateUrl: './home-page-header.component.html',
  styleUrls: ['./home-page-header.component.scss']
})
export class HomePageHeaderComponent implements OnInit {

  constructor() { }

  userDetails = JSON.parse(localStorage.getItem('user_details')); 

  ngOnInit() {
  }

  ngAfterContentChecked() {
  	this.userDetails = JSON.parse(localStorage.getItem('user_details')); 
    // TODO : find another hook that does not call again and again, it calls in miliseconds
  }
}
