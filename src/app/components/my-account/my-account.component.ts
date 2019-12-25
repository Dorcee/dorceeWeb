import { Component, OnInit, AfterViewChecked } from '@angular/core';
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
	previousSelectedTab:any;
	selectedTab;
  constructor(private route:ActivatedRoute,
  			  private router : Router
  	) { }

  ngOnInit() {
  	$(document).foundation();
  	this.userDetails=JSON.parse(localStorage.getItem('user_details'));
  	//console.log(this.userDetails);
  }
 
 	ngAfterViewChecked(){
 		var prev = localStorage.getItem('previousSelectedTab');
 		if(prev) {
 			this.previousSelectedTab=document.getElementById(prev);
	 		this.previousSelectedTab.setAttribute("aria-selected", "false");
 		}

 		this.subPage=this.route.snapshot.params.subPage;
	  	//console.log("subPage "+this.subPage);  	

	    if(this.subPage=="myOrders"){
			$("#myAccountTabs").foundation("selectTab",$("#myOrdersPanel"));
			this.selectedTab=document.getElementById('myOrders');
		}
		else if(this.subPage=="profile"){
			$("#myAccountTabs").foundation("selectTab",$("#profilePanel"));
			this.selectedTab=document.getElementById('profile');
		}
	  	else {
	  		$("#myAccountTabs").foundation("selectTab",$("#addressesPanel"));
	  		this.selectedTab=document.getElementById('addresses');
	  	}

	  	//console.log(this.selectedTab);
	  	//console.log(this.previousSelectedTab);
	  	localStorage.setItem('previousSelectedTab',this.selectedTab.id);

		this.selectedTab.setAttribute("aria-selected", "true");
		//console.log(this.selectedTab);
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

