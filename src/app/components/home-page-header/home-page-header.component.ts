import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import {environment} from '../../../environments/environment';

declare var $:any;
var currentLocType:any;

@Component({
  selector: 'app-home-page-header',
  templateUrl: './home-page-header.component.html',
  styleUrls: ['./home-page-header.component.scss']
})
export class HomePageHeaderComponent implements OnInit {
  isUserLoggedIn:boolean=true;
  locType:string =localStorage.getItem('loc_type') ;
  leftLocType:string;
  selectedLocType:string;

  constructor(private router : Router, public homeservice:HomeService) { }
  @Input() inputCartItems: any;
  @Output() isUserLoggedInToFooter = new EventEmitter<boolean>();
  @Output() locTypeChangedTo = new EventEmitter<boolean>();

  cartItemsLength: any;
  cartItems = JSON.parse(localStorage.getItem('cart_items')) || [];

  userDetails:any; 

  ngOnInit() {
    if(this.locType){
      if(this.locType == environment.india_location) {
        this.leftLocType = environment.other_location;
      } else {
        this.leftLocType = environment.india_location;
      }
      //console.log(this.leftLocType);
    } else{
      this.homeservice.getCountryFromIp().subscribe((ip_details)=>{
        if(ip_details.countryCode == 'IN') {
          var loc_type = environment.india_location;
          this.leftLocType = environment.other_location
        } else {
          var loc_type = environment.other_location;
          this.leftLocType = environment.india_location;
        }
        localStorage.setItem('loc_type', loc_type);
        this.locType = localStorage.getItem('loc_type') ;
      });  
    }

    $('#locTypeDropDown').foundation();
    $('#nameDropDown').foundation();
    $('#modalForChngingLocType').foundation();
    
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    if(!this.userDetails) {
      this.isUserLoggedIn=false; 
      this.isUserLoggedInToFooter.emit(this.isUserLoggedIn);
    }

    $('.confirmChangeLocType').on('click', () => {
     //   console.log(currentLocType);
        this.locTypeChangeConfirmed();
    })
  }

  ngOnChanges() {
    this.cartItemsLength = this.inputCartItems ? this.inputCartItems : (JSON.parse(localStorage.getItem('cart_items')).length || []);
  }

  leftLocTypeClick(oldSelected) {
    currentLocType = oldSelected;
    //console.log(this.locType);
   // console.log(this.cartItems);
    if(this.userDetails) {
      if(this.cartItemsLength > 0) {
        $('#modalForChngingLocType').foundation('open');
      } else {
        this.locTypeChanged(oldSelected);  
      }
    } else {
      this.locTypeChanged(oldSelected);
    }
  } 

  locTypeChanged(selected) {
    this.locTypeChangedTo.emit(selected);
    localStorage.setItem('loc_type', selected);
    this.locType = localStorage.getItem('loc_type');
   // console.log(this.locType);
   // console.log(this.cartItemsLength);
        
    if(this.locType == environment.india_location) {
      this.leftLocType = environment.other_location
    } else {
      this.leftLocType = environment.india_location;
    }
  }

  locTypeChangeConfirmed() {
    this.cartItems = [] ;
    localStorage.setItem('cart_items', JSON.stringify(this.cartItems));

    this.cartItemsLength = (JSON.parse(localStorage.getItem('cart_items')).length || []);
    this.locTypeChanged(currentLocType);
  }

  logOut() {
    localStorage.removeItem('user_details');
    this.isUserLoggedIn=false;
    this.isUserLoggedInToFooter.emit(this.isUserLoggedIn);
    this.userDetails = '';
  }

  gettingUserLoggedIn(value) {
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    this.isUserLoggedIn = value; 
    this.isUserLoggedInToFooter.emit(this.isUserLoggedIn);
  }
}
