import { Component, OnInit, ViewChild, ElementRef,ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { environment } from 'src/environments/environment';
import { LoaderComponent } from '../loader/loader.component';

declare var $:any;

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
  constructor(public homeservice : HomeService,
              public router : Router
  ) { }
  
  p: number = 1;
  products : any;
  noProduct: boolean;
  isViewAllChecked:boolean = false;

  categories : any;
  sizes : any;
  fits : any;
  selected = 'option2';
  containerLoaded = true;
  loc_type = localStorage.getItem('loc_type');
  indian_location = environment.india_location;
  cartItems = JSON.parse(localStorage.getItem('cart_items')) || [];

  @ViewChild('loading', {static:false}) loading:ElementRef;
  @ViewChildren('filterCategoryType') filterCategoryType: QueryList<any>;
 
  ngOnInit() {
    this.homeservice.getAllProducts(true).subscribe((data)=>{
      this.products = data;
      // TODO - get it from local storage
      var types = {"type" : ["sizes", "categories", "fits"]};
      this.homeservice.getAllEntities(types).subscribe((data)=>{
        this.sizes = data.sizes;
        this.categories = data.categories;
        this.fits = data.fits;
        this.containerLoaded = true;
       // console.log(this.sizes);
        setTimeout(() => {
          $('.productImageSlideContainer').not('.slick-initialized').slick({
            infinite: true,
            autoplaySpeed: 1000,
            arrows: false,
          });
           //console.log(this.loadingElement);
          this.loading.nativeElement.className = 'hidingLoader' ;
          $('#filterModal').foundation();
        }, 500);
      });
    });  
  }

  changeStyle($event,ID){
    // console.log(ID); 
    if($event.type == 'mouseenter'){ 
      setTimeout(function () {
        $('#slider'+ID+'.productImageSlideContainer').slick('slickPlay');
      }, 10);
    } 
  }
  changeBackStyle($event,id){
    // console.log($event.type); 
    if($event.type == 'mouseleave'){ 
      setTimeout(function () {
        $('#slider'+id+'.productImageSlideContainer').slick('slickPause');
      }, 10);
    }
  }


  goToProductDetailPage(id){
    this.router.navigate(['/productDetail', id]);
  }

  getProducts(isChecked,key='', value='', device) {
    if(key != ''|| value !='') {
      //console.log(this.isViewAllChecked);
      this.isViewAllChecked =  false;
    }
    //console.log(isChecked.checked);
    // this.isChecked = !this.isChecked;
    // console.log(this.isChecked);
    this.homeservice.getAllProducts(isChecked.checked, key, value).subscribe((data)=>{
      this.products = data;
      this.containerLoaded = true;
      if(this.products.length==0){
        this.noProduct = true;
      } else {
        this.noProduct = false;
      }
      //console.log(this.products);

      if(device!='small') {
        this.closeFilterModal();
      }
    });
  }

  closeFilterModal() {
    this.loading.nativeElement.className = 'showLoader' ;
    setTimeout(() => {
      $('.productImageSlideContainer').not('.slick-initialized').slick({
        infinite: true,
        autoplaySpeed: 1000,
        arrows: false,
      });
      this.loading.nativeElement.className = 'hidingLoader' ;
    }, 1000);
  }

  selectedList(event) {
    //console.log(event);
    if(event.checked == true){
      this.filterCategoryType.forEach(element => {
        //console.log(element);
        element.checked = false;
      });
    }
  }
}