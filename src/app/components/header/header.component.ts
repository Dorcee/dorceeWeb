import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  @Input() input_cartitems: any;
  cartItemsLength = this.input_cartitems ? this.input_cartitems : (JSON.parse(localStorage.getItem('cart_items')).length || []);

  ngOnInit() {
  }

  ngOnChanges() {
  	this.cartItemsLength = this.input_cartitems ? this.input_cartitems : (JSON.parse(localStorage.getItem('cart_items')).length || []);
  }

}
