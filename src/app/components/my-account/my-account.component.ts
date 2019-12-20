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
	user_details:any;
	tab;
  constructor(private route:ActivatedRoute,
  			  private router : Router
  	) { }

  ngOnInit() {
  	$(document).foundation();
  	this.user_details=JSON.parse(localStorage.getItem('user_details'));
  	//console.log(this.user_details);
  }
 
 	ngAfterViewChecked(){
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

