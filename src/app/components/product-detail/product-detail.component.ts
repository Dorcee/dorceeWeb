import { Component, OnInit, Pipe, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductDetailService } from '../../services/product-detail.service';
import { HomeService } from '../../services/home.service';
import { environment } from 'src/environments/environment';
import { LoaderComponent } from '../loader/loader.component';

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

  cart_items = JSON.parse(localStorage.getItem('cart_items')) || [];
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
  selectedFitName: any;
  selectedSize: any;
  sizeAcceptance:boolean=true;
  fitAcceptance:boolean=true;
  productAdded:boolean=false;
  productAddedMessage:string='';
  @ViewChild('loading', {static:false}) loading:ElementRef;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.product_id = params['id'];
      //console.log(`${this.product_id}`);
    });

    /* TODO : make it via common function at every page */
    if(!this.loc_type) {
      this.homeservice.getCountryFromIp().subscribe((ip_details)=>{
        if(ip_details.countryCode == 'IN') {
          var loc_type = environment.india_location;
        } else {
          var loc_type = environment.other_location;
        }
        localStorage.setItem('loc_type', loc_type);
      });
    }

    this.productDetailServices.getProductDetail(this.product_id).subscribe(data => {
      this.containerLoaded = true;
      //console.log(data);
      if(data) {
        this.productDetail=data;
        //console.log(this.productDetail);
        this.sizesAvailable=this.productDetail.size.split(',');
        this.fitsAvailable=this.productDetail.fit.split(',');
        var types = {"type" : ["sizes", "categories", "fits"]};
        this.homeservice.getAllEntities(types).subscribe((data)=>{
          this.allSizes = data.sizes;
          this.allFits = data.fits;
          //console.log(this.allFits);
          //console.log(this.fitsAvailable);
        });

      }
    });
  }

  ngAfterViewInit() {
    // TODO : create common function to only one file and call it everywhere

    setTimeout(() => {
      $('.productDetailImagesContainer').not('.slick-initialized').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
        prevArrow:"<button type='button' class='slick-prev pull-left'> < </button>",
        nextArrow:"<button type='button' class='slick-next pull-right'> > </button>",
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
      this.loading.nativeElement.className = 'hidingLoader' ;
      $('#accordionData').foundation();
    }, 1000);    
  }

  sizeSelected(size) {
    this.selectedSize = size;
    this.sizeAcceptance=true;
  }

  fitSelected(fit, fit_name) {
    this.selectedFit = fit;
    this.selectedFitName = fit_name;
    this.fitAcceptance=true;
  }

  addToCart(id) {
    var userDetails = localStorage.getItem('user_details');
    //console.log(userDetails);
    if(!userDetails) {
      $('#loginModal').foundation('open');
    }
    else if(!this.selectedSize) {
      this.sizeAcceptance=false;
    } else if(!this.selectedFit) {
      this.fitAcceptance=false;
    } else {
      var cart_items = JSON.parse(localStorage.getItem('cart_items'));
      if(this.cart_items) {
        var find_item = '';
        if(find_item = this.cart_items.find(item => {return item.product_id == id;
        // && 
          //item.size == this.selectedSize && 
          //item.fit == this.selectedFit;
        })) {
          this.productAddedMessage='You can add only one quantity of one product at a time.';
          this.productAdded=true;
        } else {
          this.cart_items.push({product_id: id, size: this.selectedSize, 
            fit: this.selectedFit, fit_name: this.selectedFitName, qty: 1});
          localStorage.setItem('cart_items', JSON.stringify(this.cart_items));
          this.productAddedMessage='Successfully added the product.';
          this.productAdded=true;
        }
      } else {
        this.cart_items = <any[]> Array();
        this.cart_items.push({product_id: id, size: this.selectedSize, fit: this.selectedFit, qty: 1});
        localStorage.setItem('cart_items', JSON.stringify(this.cart_items));
        this.productAddedMessage='Successfully added the product.';
        this.productAdded=true;
      }
    }
  }
}
