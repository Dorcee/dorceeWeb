import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment';

declare var $:any;

@Component({
  selector: 'app-home-page-header',
  templateUrl: './home-page-header.component.html',
  styleUrls: ['./home-page-header.component.scss']
})
export class HomePageHeaderComponent implements OnInit {
  isUserLoggedIn:boolean=true;
  locType:string = localStorage.getItem('loc_type');
  leftLocType:string;
  selectedLocType:string;

  constructor(private router : Router) { }
  @Input() inputCartItems: any;
  @Output() isUserLoggedInToFooter = new EventEmitter<boolean>();
  @Output() locTypeChangedTo = new EventEmitter<boolean>();

  cartItemsLength: any;

  userDetails:any; 

  ngOnInit() {
    $('#locTypeDropDown').foundation();
    $('#nameDropDown').foundation();
    //console.log("home page");
    if(this.locType == environment.india_location) {
      this.leftLocType = environment.other_location
    } else {
      this.leftLocType = environment.india_location;
    }
    //console.log(this.leftLocType);
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    if(!this.userDetails) {
      this.isUserLoggedIn=false; 
      this.isUserLoggedInToFooter.emit(this.isUserLoggedIn);
    }
  }

  ngOnChanges() {
    this.cartItemsLength = this.inputCartItems ? this.inputCartItems : (JSON.parse(localStorage.getItem('cart_items')).length || []);
  }

  leftLocTypeClick(selected) {
    this.locTypeChangedTo.emit(selected);
    localStorage.setItem('loc_type', selected);
    this.locType = localStorage.getItem('loc_type');
    //console.log(this.locType);
    if(this.locType == environment.india_location) {
      this.leftLocType = environment.other_location
    } else {
      this.leftLocType = environment.india_location;
    }
  } 

  logOut() {
    localStorage.removeItem('user_details');
    this.isUserLoggedIn=false;
    this.isUserLoggedInToFooter.emit(this.isUserLoggedIn);
    //window.location.reload();
    // TODO : cart items should be delete
  }

  gettingUserLoggedIn(value) {
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    this.isUserLoggedIn = value; 
    this.isUserLoggedInToFooter.emit(this.isUserLoggedIn);
  }
}
