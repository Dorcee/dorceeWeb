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
	previousLink:any;
  constructor(private route:ActivatedRoute,
  			  private router : Router
  	) { }

  ngOnInit() {
  	$(document).foundation();
  	this.userDetails=JSON.parse(localStorage.getItem('user_details'));
  	//console.log(this.userDetails);
  }
 
 	ngAfterViewChecked(){
 		var prv = localStorage.getItem('previousSelectedTab');
 		this.previousLink=document.getElementById(prv);
 		this.previousLink.removeAttribute("aria-selected", "true");

 		this.subPage=this.route.snapshot.params.subPage;
	  	//console.log("subPage "+this.subPage);  	
	  	var selectedLink;

	    if(this.subPage=="myOrders"){
			$("#myAccountTabs").foundation("selectTab",$("#myOrdersPanel"));
			selectedLink=document.getElementById('firstLink');
		}
		else if(this.subPage=="profile"){
			$("#myAccountTabs").foundation("selectTab",$("#profilePanel"));
			selectedLink=document.getElementById('secondLink');
		}
	  	else {
	  		$("#myAccountTabs").foundation("selectTab",$("#addressesPanel"));
	  		selectedLink=document.getElementById('thirdLink');
	  	}

	  	//this.previousLink=selectedLink.id;
	  	//console.log(this.previousLink);
	  	localStorage.setItem('previousSelectedTab',selectedLink.id);

		//this.previousLink=selectedLink;
		selectedLink.setAttribute("aria-selected", "true");
		//console.log(selectedLink);
 	}

 	moveToMyOrders(){
 		//this.previousLink.removeAttribute("aria-selected", "true");
 		this.router.navigate(["/myAccount/myOrders"]);
 	}

 	moveToProfile(){
 		//this.previousLink.removeAttribute("aria-selected", "true");
 		this.router.navigate(["/myAccount/profile"]);
 	}
 	moveToAddresses(){
 		//this.previousLink.removeAttribute("aria-selected", "true");
 		this.router.navigate(["/myAccount/addresses"]);
 	}
}

