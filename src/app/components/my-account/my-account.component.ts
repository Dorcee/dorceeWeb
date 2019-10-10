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
  constructor(private route:ActivatedRoute,
  			  private router : Router
  	) { }

  ngOnInit() {
  	$(document).foundation();
  	

  	

  	// $('#profilePanel').on('toggled', function (event, tab) {
   //  	console.log('tab'+tab);
   //  	var tabID = $(tab).attr('id');
   //  	console.log("2"+tabID);

    
  	// });
  	// this.route.params.subscribe((params: Params) => {
   //    this.model=this.userData;
  	// });     
  }
 
 	ngAfterContentChecked(){
 		this.subPage=this.route.snapshot.params.subPage;
	  	console.log("subPage "+this.subPage);
	  	
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

