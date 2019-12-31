import { Component, OnInit, AfterViewInit } from '@angular/core';
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
export class ProductCategoryComponent implements OnInit, AfterViewInit {
  constructor(public homeservice : HomeService,
              public router : Router
  ) { }
  
  p: number = 1;
  products : any;
  categories : any;
  sizes : any;
  fits : any;
  selected = 'option2';
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
  containerLoaded = true;
  loc_type = localStorage.getItem('loc_type');
  indian_location = environment.india_location;

  ngOnInit() {
    this.homeservice.getAllProducts().subscribe((data)=>{
      this.products = data;
      // TODO - get it from local storage
      var types = {"type" : ["sizes", "categories", "fits"]};
      this.homeservice.getAllEntities(types).subscribe((data)=>{
        this.sizes = data.sizes;
        this.categories = data.categories;
        this.fits = data.fits;
        this.containerLoaded = true;
      });
    });  
  }

  ngAfterViewInit(){
    setTimeout(function () {
       $('.productImageSlideContainer').not('.slick-initialized').slick({
         infinite: true,
         autoplaySpeed: 1000,
         arrows: false,
       });
       $("#loading").css("display", "none");
    }, 1000);
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

  getProducts(key='', value='') {
    this.homeservice.getAllProducts(key, value).subscribe((data)=>{
      this.products = data;
      this.containerLoaded = true;
      console.log(this.products);
    });
  }
}