import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { WindowRef } from '../../services/windowRef';

import { environment } from 'src/environments/environment';
import { HomeService } from '../../services/home.service';
import { AddressService } from '../../services/address.service';

declare var $:any;

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {
  constructor(
    public windowRef: WindowRef,
    private formBuilder:FormBuilder,
    private homeService: HomeService,
    private addressService: AddressService
  ) { }
  cart_items = JSON.parse(localStorage.getItem('cart_items')) || [];
  fits: any;
  products: any;
  contentLoaded = 0;
  addressForm: FormGroup;
  getUserAccessToken:any; 
  userDetails:any;
  addressDetail:any;
  addressToken:string;
  addressId:number;
  editAddressDetail:any;

  ngOnInit() {
  	$(document).foundation();
    this.getUserAccessToken = JSON.parse(localStorage.getItem('user_details')).access_token;
    //console.log(this.getUserAccessToken);

    this.addressService.getAllAddresses(this.getUserAccessToken).subscribe((data)=>{
      //console.log(data);
      this.addressDetail = data;
    });

    if(this.cart_items) {
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
         // console.log(this.cart_items);
        });
      });
    } else {
      this.contentLoaded = 1;
    }
  }

  Razorpay: any; 

  payNow() {
    // TODO : create an api to send data and get order_id of razorpay, then use it in placing order.
    var options = {
      "key": environment.razorpayKeyID,
      "amount": "2000", // 2000 paise = INR 20
      "currency": "INR", // environment.india_location
      "name": "Dorcee",
      "description": "Purchase Description",
      "handler": function (response){
        //console.log(response);
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


  showModalToAddAddress(token,addressDetail){
    $('#addressUpdate').foundation('open');
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    //console.log(this.userDetails);
    this.addressToken=token;
    this.editAddressDetail = addressDetail;

    if(token=='Add' && this.editAddressDetail=='noAddress'){
      //console.log(token);
      this.addressForm = this.formBuilder.group({
        // firstName:['', [Validators.required]],
        // lastName:['', [Validators.required]],
        flat_number:['', [Validators.required]], 
        area: ['', [Validators.required]], 
        pin_code: ['', [Validators.required]], //USA regex-/^[0-9]{5}(?:-[0-9]{4})?$/ 
        city: ['', [Validators.required]],
        state: ['', [Validators.required]], 
        type :['', [Validators.required]], 
        is_default: ''
      });
    } else {
     // console.log(token);
      this.addressId=this.editAddressDetail.id;
      if(addressDetail.type=='INR' || addressDetail.type.toLowerCase()=='india') {
        addressDetail.type='India';
      } else {
        addressDetail.type='Outside India';
      }
      this.addressForm = this.formBuilder.group({
        // firstName:['', [Validators.required]],
        // lastName:['', [Validators.required]],
        flat_number:[addressDetail.flat_number, [Validators.required]], 
        area: [addressDetail.area, [Validators.required]], 
        pin_code: [addressDetail.pin_code, [Validators.required]], //USA regex-/^[0-9]{5}(?:-[0-9]{4})?$/ 
        city: [addressDetail.city, [Validators.required]],
        state: [addressDetail.state, [Validators.required]], 
        type :[addressDetail.type, [Validators.required]], 
        is_default: [addressDetail.is_default]
      });
    }
  }

  onAddAddressSubmit(){
    this.homeService.getCountryFromIp().subscribe((data)=>{
     // console.log(data);
      if(data.country.toLowerCase()==this.addressForm.controls['type'].value.toLowerCase()) {
        if(data.country.toLowerCase()=='india') {
          this.addressForm.controls['type'].setValue(environment.india_location);
        } else {
          this.addressForm.controls['type'].setValue(environment.other_location);
        } 
         if(this.addressToken=='Add'){
           this.AddingAddress();
         }
         else {
           this.UpdatingAddress();
         }
      }
      // else if(confirm("Are you sure about the address you typed?")) {
      //   if(this.addressForm.controls['type'].value.toLowerCase()=='india') {
      //     this.addressForm.controls['type'].setValue(environment.india_location);
      //   } else {
      //     this.addressForm.controls['type'].setValue(environment.other_location);
      //   }   
      //   if(this.addressToken=='Add'){
      //     this.AddingAddress();
      //   }
      //   else {
      //     this.UpdatingAddress();
      //   }
      // }
      else {
        if(confirm("Are you sure about the address you typed?")) {
          if(this.addressForm.controls['type'].value.toLowerCase()=='india') {
            this.addressForm.controls['type'].setValue(environment.india_location);
          } else {
            this.addressForm.controls['type'].setValue(environment.other_location);
          }   
          if(this.addressToken=='Add'){
            this.AddingAddress();
          }
          else {
            this.UpdatingAddress();
          }
        }
        // else {
        //   console.log("Adding Address canceled");
        // }
      }
    
     });

  }
  
  AddingAddress(){
    var addressFormData = this.addressForm.value;

    // console.log(this.addressForm.controls['type'].value);
    // console.log(addressFormData);
    // console.log(this.userDetails.id);
   
    this.addressService.addAddress(addressFormData,this.getUserAccessToken).subscribe((data)=>{
      //console.log(data);

      this.addressService.getAllAddresses(this.getUserAccessToken).subscribe((data)=>{
        //console.log(data);
        this.addressDetail = data;
      });
    });
  }

  UpdatingAddress() {
    var addressFormData = this.addressForm.value;
    // console.log(this.addressForm.controls['type'].value);
    // console.log(addressFormData);
    // console.log(this.userDetails.id);
   
    this.addressService.EditAddress(addressFormData,this.getUserAccessToken,this.addressId).subscribe((data)=>{
      //console.log(data);

      this.addressService.getAllAddresses(this.getUserAccessToken).subscribe((data)=>{
        //console.log(data);
        this.addressDetail = data;
      });
    });
  }
}
