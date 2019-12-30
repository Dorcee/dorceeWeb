import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
	SelectedTabReference:any;
  constructor(private route:ActivatedRoute,
  			  private router : Router,
  	) { }

  	@ViewChild('myOrdersPanel', {static: false}) myOrdersPanel:ElementRef;
	@ViewChild('profilePanel', {static: false}) profilePanel:ElementRef;
	@ViewChild('addressesPanel', {static: false}) addressesPanel:ElementRef;

  ngOnInit() {
  	$(document).foundation();
  	this.userDetails=JSON.parse(localStorage.getItem('user_details'));
  	//console.log(this.userDetails);

  }

 	ngAfterViewInit(){	
 		if(this.userDetails){
	 		this.subPage=this.route.snapshot.params.subPage;
		  	//console.log("subPage "+this.subPage);  	
		    if(this.subPage=="myOrders"){
				this.moveToMyOrders();
			}
			else if(this.subPage=="profile"){
				this.moveToProfile();				
			}
		  	else {
		  		this.moveToAddresses();
		  	}
		} 	
 	}

 	moveToMyOrders(){
 		this.changingTabs();

 		$("#myAccountTabs").foundation("selectTab",$("#myOrdersPanel"));
		this.selectedTab=this.myOrdersPanel.nativeElement;
		this.SelectedTabReference="#myOrdersPanel";

	  	localStorage.setItem('previousSelectedTab',this.SelectedTabReference);
		this.selectedTab.setAttribute("aria-selected", "true");
		//console.log(this.selectedTab);
 	}

 	moveToProfile(){
 		this.changingTabs();

 		$("#myAccountTabs").foundation("selectTab",$("#profilePanel"));
		this.selectedTab=this.profilePanel.nativeElement;
		this.SelectedTabReference="#profilePanel";

	  	localStorage.setItem('previousSelectedTab',this.SelectedTabReference);
		this.selectedTab.setAttribute("aria-selected", "true");
		//console.log(this.selectedTab);
	
 	}
 	moveToAddresses(){
 		this.changingTabs();
 		
 		$("#myAccountTabs").foundation("selectTab",$("#addressesPanel"));
  		this.selectedTab=this.addressesPanel.nativeElement;
  		this.SelectedTabReference="#addressesPanel";

		localStorage.setItem('previousSelectedTab',this.SelectedTabReference);
		this.selectedTab.setAttribute("aria-selected", "true");
		//console.log(this.selectedTab);
	  	
 	}

 	changingTabs() {
 		
 		var prev = localStorage.getItem('previousSelectedTab');
 		//console.log(prev);

 		if(prev=='#myOrdersPanel') {
 			this.previousSelectedTab=this.myOrdersPanel.nativeElement;
	 		this.previousSelectedTab.setAttribute("aria-selected", "false");
 		} else if(prev=='#profilePanel') {
 			this.previousSelectedTab=this.profilePanel.nativeElement;
	 		this.previousSelectedTab.setAttribute("aria-selected", "false");
 		} else if(prev=='#addressesPanel') {
 			this.previousSelectedTab=this.addressesPanel.nativeElement;
	 		this.previousSelectedTab.setAttribute("aria-selected", "false");
 		} 

 	}

}

