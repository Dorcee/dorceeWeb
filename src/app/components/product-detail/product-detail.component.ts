import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	$(document).foundation();
  	
    $('.productDetailImagesContainer').not('.slick-initialized').slick({
	    infinite: false,
	    slidesToShow: 2,
      responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            infinite: false,
          }
        }
      ]
	  });

    $('.productImageSlideContainer').not('.slick-initialized').slick({
      infinite: false,
    });
  }
}
