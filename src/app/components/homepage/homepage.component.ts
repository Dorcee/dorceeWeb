import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

declare var $:any;

@Component({
	selector: 'app-homepage',
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
	loading:boolean=true;

	products = [];
	constructor(public homeservice:HomeService, public router:Router) { }

	ngOnInit() {
		$(document).foundation();

		$('.homePageSlick').not('.slick-initialized').slick({
			infinite: true,
			autoplay: true,
			autoplaySpeed: 2000,
			arrows: false
		});

		if(localStorage.getItem('loc_type')) {
			var loc_type = localStorage.getItem('loc_type');
			this.getProducts(loc_type);
		} else {
			this.homeservice.getCountryFromIp().subscribe((ip_details)=>{
				if(ip_details.countryCode == 'IN') {
					var loc_type = environment.india_location;
				} else {
					var loc_type = environment.india_location;
				}
				localStorage.setItem('loc_type', loc_type);
				this.getProducts(loc_type);
	    	});			
		}
		console.log(loc_type);
	}

	ngAfterViewInit(){
	    setTimeout(function () {
	     	$('.productImageSlideContainer').not('.slick-initialized').slick({
	     		infinite: true,
	     		autoplaySpeed: 1000,
	     		arrows: false,
	     	});
    	}, 1000);
        this.loading=false;

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
    	});
	}

	goToProductDetailPage(id){
    	this.router.navigate(['/productDetail', id]);
  	}
}
