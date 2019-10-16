import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WindowRef } from '../../services/windowRef';
import { environment } from 'src/environments/environment';

declare var $:any;

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {

  constructor(public windowRef: WindowRef) { }

  ngOnInit() {
  	$(document).foundation();
  }
  addressFormControl = new FormControl('', [
    //Validators.required,
    //Validators.email,
  ]);

  Razorpay: any; 

  payNow() {
    var options = {
      "key": environment.razorpayKeyID,
      "amount": "2000", // 2000 paise = INR 20
      "name": "Dorcee",
      "description": "Purchase Description",
      "handler": function (response){
          alert(response.razorpay_payment_id);
      },
      "prefill": {
        "name": "Milky Jain",
        "email": "milkyjain812@gmail.com"
      },
      // "notes": {
      //     "address": "Hello World"
      // }
    };
    var rzp1 = new this.windowRef.nativeWindow.Razorpay(options);
    rzp1.open();
  }
}
