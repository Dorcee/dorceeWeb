import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

declare var $:any;

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  constructor(public homeservice:HomeService) { }

  ngOnInit() {
    $(document).foundation();
    this.homeservice.getAllProducts().subscribe((data)=>{
      this.products = data;
      console.log(this.products);
    });

    var types = {"type" : ["sizes", "categories", "fits"]};
    this.homeservice.getAllEntities(types).subscribe((data)=>{
      this.sizes = data.sizes;
      this.categories = data.categories;
      this.fits = data.fits;
      console.log(this.sizes);
    });

    
  }

  ngAfterViewInit(){
     setTimeout(function () {
       $('.productImageSlideContainer').not('.slick-initialized').slick({
         infinite: false,
       });
     }, 1000);
   }

  products : any;
  categories : any;
  sizes : any;
  fits : any;
  selected = 'option2';
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  getProducts(key, value) {
    console.log(key);
    console.log(value);
    this.homeservice.getAllProducts(key, value).subscribe((data)=>{
      this.products = data;
      console.log(this.products);
    });
  }
}