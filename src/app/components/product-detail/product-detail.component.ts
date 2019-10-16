import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductDetailService } from '../../services/product-detail.service';
import { environment } from 'src/environments/environment';

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
  containerLoaded = false;
  loc_type = localStorage.getItem('loc_type');
  indian_location = environment.india_location;

  ngOnInit() {
  	$(document).foundation();

    this.activatedRoute.params.subscribe(params => {
      this.product_id = params['id'];
      console.log(`${this.product_id}`);
    });

    this.productDetailServices.getProductDetail(this.product_id).subscribe(data => {
      this.containerLoaded = true;
      if(data[0]) {
        this.productDetail=data[0];
        console.log(this.productDetail);
        this.sizesAvailable=this.productDetail.size.split(',');
      }
    });
  }

  ngAfterViewInit() {
    this.setSlickDesign();
  }

  setSlickDesign(){
    // TODO : create common function to only one file and call it everywhere
    setTimeout(function () {
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
   }, 1000);
  }

  addToCart(id) {
    var cart_items = JSON.parse(localStorage.getItem('cart_items'));
    if(cart_items) {
      if(cart_items.includes(id)) {
        alert('already added this product.');
      } else {
        cart_items.push(id);
        localStorage.setItem('cart_items', JSON.stringify(cart_items));
        alert('Successfully added the product.');
      }
    } else {
      let cart_items = <any[]> Array();
      cart_items.push(id);
      localStorage.setItem('cart_items', JSON.stringify(cart_items));
      alert('Successfully added the product.');
    }
    console.log(localStorage.getItem('cart_items'));
  }
}
