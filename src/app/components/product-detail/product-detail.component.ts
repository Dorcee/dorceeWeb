import { Component, OnInit, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductDetailService } from '../../services/product-detail.service';
import { HomeService } from '../../services/home.service';
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
               private activatedRoute : ActivatedRoute,
               private homeservice: HomeService
   ) { }

  productDetail:any;
  product_id='';
  sizesAvailable:[];
  fitsAvailable:[];
  containerLoaded = false;
  loc_type = localStorage.getItem('loc_type');
  indian_location = environment.india_location;
  allSizes = [];
  allFits = [];
  selectedFit: any;
  selectedSize: any;

  ngOnInit() {
  	

    this.activatedRoute.params.subscribe(params => {
      this.product_id = params['id'];
      //console.log(`${this.product_id}`);
    });

    /* TODO : make it via ommon function at every page */
    if(!this.loc_type) {
      this.homeservice.getCountryFromIp().subscribe((ip_details)=>{
        if(ip_details.countryCode == 'IN') {
          var loc_type = environment.india_location;
        } else {
          var loc_type = environment.india_location;
        }
        localStorage.setItem('loc_type', loc_type);
      });
    }

    this.productDetailServices.getProductDetail(this.product_id).subscribe(data => {
      this.containerLoaded = true;
      if(data[0]) {
        this.productDetail=data[0];
        //console.log(this.productDetail);
        this.sizesAvailable=this.productDetail.size.split(',');
        this.fitsAvailable=this.productDetail.fit.split(',');
        var types = {"type" : ["sizes", "categories", "fits"]};
        this.homeservice.getAllEntities(types).subscribe((data)=>{
          this.allSizes = data.sizes;
          this.allFits = data.fits;
          //console.log(this.allSizes);
          //console.log(this.allFits);
        });
      }
    });
  }

  ngAfterViewInit() {
    this.setSlickDesign();
    
    setTimeout(function () {
      $(document).foundation();
    }, 1000);
  }

  setSlickDesign(){
    // TODO : create common function to only one file and call it everywhere
    setTimeout(function () {
      $('.productDetailImagesContainer').not('.slick-initialized').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              infinite: true,
            }
          }
        ]
      });

      $('.productImageSlideContainer').not('.slick-initialized').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      });
   }, 1000);
  }

  addToCart(id) {
    if(!this.selectedSize) {
      alert('Please select your size.');
    } else if(!this.selectedFit) {
      alert('Please select your fit.');
    } else {
      var cart_items = JSON.parse(localStorage.getItem('cart_items'));
      if(cart_items) {
        var find_item = '';
        if(find_item = cart_items.find(item => {return item.id == id && 
          item.size == this.selectedSize && 
          item.fit == this.selectedFit;})) {
          //console.log(find_item);
          // TODO : we can auto increase quantity of that product from here by using findIndex().
          alert('Already added this product.');
        } else {
          cart_items.push({id: id, size: this.selectedSize, fit: this.selectedFit, qty: 1});
          localStorage.setItem('cart_items', JSON.stringify(cart_items));
          alert('Successfully added the product.');
        }
      } else {
        let cart_items = <any[]> Array();
        cart_items.push({id: id, size: this.selectedSize, fit: this.selectedFit, qty: 1});
        localStorage.setItem('cart_items', JSON.stringify(cart_items));
        alert('Successfully added the product.');
      }
      //console.log(localStorage.getItem('cart_items'));
    }
  }
}
