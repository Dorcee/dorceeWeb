import { Component, OnInit } from '@angular/core';
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

  constructor( private router:Router ) { }

  ngOnInit() {
  	$(document).foundation();
  }

  ngAfterContentChecked() {
    this.userDetails=localStorage.getItem('user_details');
    //console.log(this.userDetails);
  }

  footerNavigationToProfile(){
    window.scroll(0,0);
    if(this.userDetails) {
      this.router.navigate(["/myAccount/profile"]);
    } else {
      this.navigateTo="/myAccount/profile";
      $('#loginModal').foundation('open');
    }  
  }

  footerNavigationToMyOrders(){
    window.scroll(0,0);
    if(this.userDetails) {
      this.router.navigate(["/myAccount/myOrders"]);
    } else {
      this.navigateTo="/myAccount/myOrders";
      $('#loginModal').foundation('open');
     // console.log(this.navigateTo);
    }     
  }
}