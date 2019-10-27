import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WindowRef } from '../../services/windowRef';
import { environment } from 'src/environments/environment';
import { HomeService } from '../../services/home.service';

declare var $:any;

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {

  constructor(public windowRef: WindowRef, private homeService: HomeService) { }
  cart_items = JSON.parse(localStorage.getItem('cart_items')) || [];
  fits: any;
  products: any;
  contentLoaded = 0;

  ngOnInit() {
  	$(document).foundation();
    if(this.cart_items) {
    console.log(this.cart_items);
      this.homeService.getAllProducts().subscribe((data)=>{
            this.products = data;
        var types = {"type" : ["fits"]};
        this.homeService.getAllEntities(types).subscribe((data)=>{
          this.fits = data.fits;
          this.cart_items.forEach((cart_item, index) => {
              var product = this.products.find(product_item => (product_item.id == cart_item.id) );
              this.cart_items[index]['product'] = product;
          });
          this.contentLoaded = 1;
          console.log(this.cart_items);
        });
      });
    } else {
      this.contentLoaded = 1;
    }
  }

  addressFormControl = new FormControl('', [
    //Validators.required,
    //Validators.email,
  ]);

  Razorpay: any; 

  payNow() {
    // TODO : create an api to send data and get order_id of razorpay, then use it in placing order.
    var options = {
      "key": environment.razorpayKeyID,
      "amount": "2000", // 2000 paise = INR 20
      "currency": "INR",
      "name": "Dorcee",
      "description": "Purchase Description",
      "handler": function (response){
        console.log(response);
          alert(response.razorpay_payment_id);
      },
      "prefill": {
        "name": "Milky Jain",
        "email": "milkyjain812@gmail.com"
      },
      "order_id": 'order_DZBu0kr4Gyw8D3',
      // "callback_url": 'https://your-site.com/callback-url',
      // "notes": {
      //     "address": "Hello World"
      // }
    };

    var rzp1 = new this.windowRef.nativeWindow.Razorpay(options);
    rzp1.open();
  }
}
