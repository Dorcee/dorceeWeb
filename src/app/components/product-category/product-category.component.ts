import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).foundation();
  }
  selected = 'option2';
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
}