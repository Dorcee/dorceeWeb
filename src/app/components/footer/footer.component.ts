import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  userDetails:any;
  navigateTo:string;
  @Output() LinkClickToMyOrders = new EventEmitter();
  @Output() LinkClickToProfile = new EventEmitter();

  constructor( private router:Router ) { }

  ngOnInit() {
  	$(document).foundation();
    this.userDetails=localStorage.getItem('user_details');
    //console.log(this.userDetails);
  }

  LinkToMyOrders() {
    this.LinkClickToMyOrders.emit();
  }

  LinkToProfile() {
    this.LinkClickToProfile.emit();
  } 

  footerNavigationToMyOrders(){
    window.scroll(0,0);
    if(this.userDetails) {
     this.LinkToMyOrders();  
     this.router.navigate(["/myAccount/myOrders"]);
    } else {
      this.navigateTo="/myAccount/myOrders";
      $('#loginModal').foundation('open');
     // console.log(this.navigateTo);
    }   
  }

  footerNavigationToProfile(){
    window.scroll(0,0);
    if(this.userDetails) {
      this.LinkToProfile();
      this.router.navigate(["/myAccount/profile"]);
    } else {
      this.navigateTo="/myAccount/profile";
      $('#loginModal').foundation('open');
    }  
    
  }

}