import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { MyOrdersComponent }  from '../my-orders/my-orders.component';


declare var $:any;

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
	subPage='';
	userDetails:any;
	
  constructor(private route:ActivatedRoute,
  			  private router : Router
  	) { }

  ngOnInit() {
  	$(document).foundation();
  	this.userDetails=JSON.parse(localStorage.getItem('user_details'));
  	console.log(this.userDetails);
  }
 
 	ngAfterViewChecked(){
 		//if(this.userDetails) {
	 		this.subPage=this.route.snapshot.params.subPage;
		  	//console.log("subPage "+this.subPage);  	
		  if(this.subPage=="profile"){
				$("#myAccountTabs").foundation("selectTab",$("#profilePanel"));
			}
			else if(this.subPage=="myOrders"){
				$("#myAccountTabs").foundation("selectTab",$("#myOrdersPanel"));
			}
		  	else {
		  		$("#myAccountTabs").foundation("selectTab",$("#addressesPanel"));
		  	}
		//} else {
			//$('#loginModal').foundation('open');
		//}
 	}

 	moveToMyOrders(){
 		this.router.navigate(["/myAccount/myOrders"]);
 	}

 	moveToProfile(){
 		this.router.navigate(["/myAccount/profile"]);
 	}
 	moveToAddresses(){
 		this.router.navigate(["/myAccount/addresses"]);
 	}
}

