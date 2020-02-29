import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { LoaderComponent } from '../loader/loader.component';

declare var $:any;

@Component({
	selector: 'app-homepage',
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {
	
	@ViewChild('loading', {static:false}) loading:ElementRef;
	products = [];
	cartItems = JSON.parse(localStorage.getItem('cart_items')) || [];

	isUserLoggedInFromHeader:boolean;
	
	constructor( 
		public homeservice:HomeService, 
		public router:Router,
		public formBuilder: FormBuilder
    ) { }

	subscribeForm:FormGroup;
	emailClicked:boolean = false;
	subscribeMessage: string;
	subscribeOn:boolean = false;

	ngOnInit() {
		this.subscribeForm = this.formBuilder.group({
			email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$") ]]
		}) 

		$('.homePageSlick').not('.slick-initialized').slick({
			infinite: true,
			autoplay: true,
			autoplaySpeed: 2000,
			arrows: false,
			fade: true
		});

		if(localStorage.getItem('loc_type')) {
			var loc_type = localStorage.getItem('loc_type');
			this.getProducts(loc_type);
		} else {
			this.homeservice.getCountryFromIp().subscribe((ip_details)=>{
				if(ip_details.countryCode == 'IN') {
					var loc_type = environment.india_location;
				} else {
					var loc_type = environment.other_location;
				}
				localStorage.setItem('loc_type', loc_type);
				this.getProducts(loc_type);
	    	});			
		}
		//console.log(loc_type);
	}

	slickInitialized() {
		setTimeout(() => {
	     	$('.productImageSlideContainer').not('.slick-initialized').slick({
	     		infinite: true,
	     		autoplaySpeed: 1000,
	     		arrows: false
	     	});
	        //console.log(this.loadingElement);
	     	this.loading.nativeElement.className = 'hidingLoader' ;
	  	}, 500);
	}

	locTypeChangedFromHeaderTo(selectedLocType) {
		//console.log(selectedLocType);
		this.loading.nativeElement.className = 'showLoader' ;
		this.getProducts(selectedLocType);
		this.slickInitialized();
	}

	changeStyle($event,ID){
	    // console.log(ID); 
	    if($event.type == 'mouseover'){ 
	      setTimeout(function () {
	        $('#slider'+ID+'.productImageSlideContainer').slick('slickPlay');
	      }, 10);
	    } 
    }
   
    changeBackStyle($event,id){
	    // console.log($event.type); 
	    if($event.type == 'mouseout'){ 
	      setTimeout(function () {
	        $('#slider'+id+'.productImageSlideContainer').slick('slickPause');
	      }, 10);
	    }
    }
	
	getProducts(loc_type) {
		this.homeservice.getAllProducts('loc_type', loc_type).subscribe((data)=>{
			this.products = data.slice(0, 4);
			//console.log(this.products);
			this.slickInitialized();
    	});
	}

	goToProductDetailPage(id){
    	this.router.navigate(['/productDetail', id]);
  	}

  	onSubscribe() {
  		//console.log(this.subscribeForm.value);
  		this.homeservice.emailSubscribe(this.subscribeForm.value).subscribe((data)=>{
			//console.log(data);
			this.subscribeMessage = data.data;
			this.subscribeOn = true;

			setTimeout(()=> {
				this.subscribeOn = false;
			}, 2000);
    	});
  	}

  	userLoggingInDetail($event){
  		this.isUserLoggedInFromHeader =$event ;
  		//console.log(this.isUserLoggedInFromHeader);
  	}

}
