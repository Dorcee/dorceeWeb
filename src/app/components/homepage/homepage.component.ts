import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

declare var $:any;

@Component({
	selector: 'app-homepage',
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

	products = [];
	constructor(public homeservice:HomeService) { }

	ngOnInit() {
		$(document).foundation();

		$('.homePageSlick').not('.slick-initialized').slick({
			infinite: true,
			autoplay: true,
			autoplaySpeed: 2000,
			arrows: false
		});
		
		$('.productImageSlideContainer').not('.slick-initialized').slick({
			infinite: false,
		});

		this.homeservice.getAllProducts().subscribe((data)=>{
			this.products = data.slice(0, 4);
			console.log(this.products);
    	});
	}

}
