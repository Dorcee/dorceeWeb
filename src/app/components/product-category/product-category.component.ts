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
  }
  products : any;
  selected = 'option2';
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
}