import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-home-page-header',
  templateUrl: './home-page-header.component.html',
  styleUrls: ['./home-page-header.component.scss']
})
export class HomePageHeaderComponent implements OnInit {
  isUserLoggedIn:boolean=true;
  
  constructor(private router : Router) { }
  @Input() inputCartItems: any;
  cartItemsLength: any;

  userDetails:any; 

  ngOnInit() {
    $('#nameDropDown').foundation();
    // $(document).foundation();
    //console.log("home page");

    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    if(!this.userDetails) {
      this.isUserLoggedIn=false; 
    }
  }

  ngOnChanges() {
    this.cartItemsLength = this.inputCartItems ? this.inputCartItems : (JSON.parse(localStorage.getItem('cart_items')).length || []);
  }

  logOut() {
    localStorage.removeItem('user_details');
    this.isUserLoggedIn=false;
    //window.location.reload();
    // TODO : cart items should be delete
  }

  gettingUserLoggedIn(value) {
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    this.isUserLoggedIn = value; 
  }
}
