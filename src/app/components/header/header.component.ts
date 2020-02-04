import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() inputHeaderCartItems: any;
   cartItemsLength: string;

  ngOnInit() {
  }

  ngOnChanges() {
  	this.cartItemsLength = this.inputHeaderCartItems ? this.inputHeaderCartItems : (JSON.parse(localStorage.getItem('cart_items')).length || []);
  }

  onCart() {
    var userDetails = localStorage.getItem('user_details');
    //console.log('userDetails'+userDetails);
    if(!userDetails) {
      $('#loginModal').foundation('open');
    } else {
      this.router.navigate(['/checkout']);
    }
  }
}
