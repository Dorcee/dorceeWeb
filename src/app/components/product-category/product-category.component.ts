import { Component, OnInit, ViewChild, ElementRef,ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { environment } from 'src/environments/environment';
import { LoaderComponent } from '../loader/loader.component';

declare var $:any;
var isCheckedInSmall:boolean;

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
  @ViewChildren('filterCategoryTypeInSmall') filterCategoryTypeInSmall: QueryList<any>;
 
  ngOnInit() {
    this.homeservice.getAllProducts(true).subscribe((data)=>{
      console.log('render category');
      $('.modalCheckboxes').each(function() { $(this).prop('checked', false) });
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
           //console.log(this.loading);
          this.loading.nativeElement.className = 'hidingLoader' ;
          $('#filterModal').foundation();
        }, 500);
      });
    }); 

    $('.modalCheckboxes').click(function(){
      if($(this).prop("checked") == true){
          isCheckedInSmall = true;
      }
      else if($(this).prop("checked") == false){
          isCheckedInSmall = false;
      }
    });

    $('.modalCheckboxes').on('change', (event) => {
      //console.log(isCheckedInSmall);
      // console.log(event.currentTarget.name);
      // console.log(event.currentTarget.value);
      this.getProducts(isCheckedInSmall, event.currentTarget.name, event.currentTarget.value,'small');
      if(event.currentTarget.name == 'type') {
        //console.log(this.isViewAllChecked);
        $('.viewAllOnSmall').each(function() { $(this).prop('checked', false) });
      }
    });

    $('.applyOnSmall').on('click', () => {
      this.closeFilterModal();
    });

    $('.viewAllOnSmall').on('click', () => {
      $('.typeCheckBox').each(function() { $(this).prop('checked', false) });
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
    if(key == 'type') {
      //console.log(this.isViewAllChecked);
      this.isViewAllChecked =  false;
    }
    if(device == 'small') {
      //console.log(isChecked);
      this.homeservice.getAllProducts(isChecked, key, value).subscribe((data)=>{
        this.products = data;
        this.containerLoaded = true;
        if(this.products.length==0){
          this.noProduct = true;
        } else {
          this.noProduct = false;
        }
        //console.log(this.products);
      });  
    } else {
      this.homeservice.getAllProducts(isChecked.checked, key, value).subscribe((data)=>{
        this.products = data;
        this.containerLoaded = true;
        if(this.products.length==0){
          this.noProduct = true;
        } else {
          this.noProduct = false;
        }
        //console.log(this.products);
        this.closeFilterModal();
      });
    }
    
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

  selectedList(event,device) {
    //console.log(event);
    if(device == 'small' ) {
      if(event == true){
        this.filterCategoryTypeInSmall.forEach(element => {
         // console.log(element);
          element.nativeElement.checked = false;
        });
      }  
    } else {
      if(event.checked == true){
      this.filterCategoryType.forEach(element => {
        //console.log(element);
        element.checked = false;
      });
    }
    }
    
  }
}