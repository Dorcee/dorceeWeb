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
    this.userDetails=localStorage.getItem('user_details');
    //console.log(this.userDetails);
  }

  footerNavigationToMyOrders(){
    window.scroll(0,0);
    if(this.userDetails) {
     this.LinkClickToMyOrders.emit();
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
     this.LinkClickToProfile.emit();
      this.router.navigate(["/myAccount/profile"]);
    } else {
      this.navigateTo="/myAccount/profile";
      $('#loginModal').foundation('open');
    }  
    
  }

}