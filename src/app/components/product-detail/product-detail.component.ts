import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductDetailService } from '../../services/product-detail.service';

declare var $:any;
var $scope;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  
  constructor( private productDetailServices : ProductDetailService,
               private activatedRoute : ActivatedRoute
   ) { }

  productDetail:any;
  product_id='';
  sizesAvailable:[];

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

    this.activatedRoute.params.subscribe(params => {
    this.product_id = params['id'];

    console.log(`${this.product_id}`);
    });

    this.productDetailServices.getProductDetail(this.product_id).subscribe(data => {
      this.productDetail=data[0];
      //console.log(this.productDetail);
      this.sizesAvailable=this.productDetail.size.split(',');
      //console.log(this.sizesAvailable);
    });
  }


}
