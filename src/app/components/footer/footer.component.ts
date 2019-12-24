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

  constructor( private router:Router ) { }

  ngOnInit() {
  	$(document).foundation();
  }

  ngAfterContentChecked() {
    this.userDetails=localStorage.getItem('user_details');
    //console.log(this.userDetails);
  }

  footerNavigationToProfile(){
    if(this.userDetails) {
      this.router.navigate(["/myAccount/profile"]);
    	window.scroll(0,0);
    } else {
      window.scroll(0,0);
      //console.log('no user');
      $('#loginModal').foundation('open');
      
      //window.location.reload();
    }  
  }

  footerNavigationToMyOrders(){
    if(this.userDetails) {
      this.router.navigate(["/myAccount/myOrders"]);
      window.scroll(0,0);
    } else {
      //console.log('no user');
      window.scroll(0,0);
      $('#loginModal').foundation('open');
    }     
  }
}