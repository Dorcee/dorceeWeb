import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { WindowRef } from '../../services/windowRef';

import { environment } from 'src/environments/environment';
import { HomeService } from '../../services/home.service';
import { AddressService } from '../../services/address.service';
import { ProductDetailService } from '../../services/product-detail.service';
import { OrderService } from '../../services/order.service';

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
    private addressService: AddressService,
    private OrderService: OrderService,
    private productDetailService: ProductDetailService
  ) { }
  cartItems = JSON.parse(localStorage.getItem('cart_items')) || [];
  fits: any;
  products: any;
  contentLoaded = 0;
  addressForm: FormGroup;
  getUserDetails:any;
  getUserAccessToken:any; 
  addressDetail:any;
  addressToken:string;
  addressId:number;
  editAddressDetail:any;
  selectedAddress:any;
  user:boolean=false;
  itemTotal = 0;
  shippingTotal = 0;
  grandTotal = 0;
  locType = localStorage.getItem('loc_type');
  @ViewChild('loading', {static:false}) loading:ElementRef;

  ngOnInit() {
  	$(document).foundation();
    this.getUserDetails = JSON.parse(localStorage.getItem('user_details'));
    if(this.getUserDetails) {
      this.getUserAccessToken = JSON.parse(localStorage.getItem('user_details')).access_token;

      this.addressService.getAllAddresses(this.getUserAccessToken).subscribe((data)=>{
        this.addressDetail = data;
      });  
    }

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

    if(this.cartItems) {
      this.setProductAndPrice();
    } else {
      this.contentLoaded = 1;
    }
  }

  setProductAndPrice() {
    //TODO : add loader till api calls
    // this.loading.nativeElement.className = 'hidingLoader' ;
    this.itemTotal = this.grandTotal = this.shippingTotal = 0;
    var ids = this.cartItems.map(function (el) { return el.product_id; });
    var postdata = {ids: ids, loc_type: this.locType};
    this.productDetailService.getCartProductsDetail(postdata, this.getUserAccessToken).subscribe((data)=>{
          console.log(data);
          this.products = data.products;
        this.shippingTotal = data.shipping_price;
      this.cartItems.forEach((cart_item, index) => {
          var product = this.products.find(product_item => (product_item.id == cart_item.product_id) );
          this.cartItems[index]['product'] = product;
          this.itemTotal += product.price;
      });
      this.grandTotal = this.itemTotal + this.shippingTotal;
      this.contentLoaded = 1;
      // this.loading.nativeElement.className = 'hidingLoader' ;
    });
  }


  ngAfterViewInit(){
    setTimeout(()=> {
      this.loading.nativeElement.className = 'hidingLoader' ;
    },1000);
  }

  changeDefaultAddress(address_id) {
    this.selectedAddress = address_id;
    // TODO : edit the same address to make it default address
    // TODO : currently 2 addresses can be default.
    console.log(address_id);
  }

  Razorpay: any; 

  payNow() {
    if(this.selectedAddress) {
      var postData = {'items' : this.cartItems, 'address_id' : this.selectedAddress, 
        'loc_type' : this.locType};
      this.OrderService.getOrderDetails(postData, this.getUserAccessToken).subscribe((order_data)=>{
        var options = {
          "key": environment.razorpayKeyID,
          // "amount": "2000", // 2000 paise = INR 20
          // "currency": "INR", // environment.india_location
          // "name": "Dorcee",
          "description": "Purchase Description",
          "handler": function (response){
              console.log(response);
              alert(response.razorpay_payment_id);
              // this.validateOrder(response);
          },
          "prefill": {
            "name": "Milky Jain",
            "email": "milkyjain812@gmail.com"
          },
          // "order_id": order_data.data.id,
          "order_id": 'order_E17zeueDzZxp5I',
          // "callback_url": 'https://your-site.com/callback-url',
          // redirect: true
          // "notes": {
          //     "address": "Hello World"
          // }
        };

        // var rzp1 = new Razorpay(options);
        var rzp1 = new this.windowRef.nativeWindow.Razorpay(options);
        rzp1.once('ready', function(response) {
          console.log('response');
          console.log(response.methods);
        })
        rzp1.open();
        // rzp1.createPayment(options);
        rzp1.on('payment.success', function(resp) {
          alert(resp.razorpay_payment_id);
          this.validateOrder(resp);
        }); // will pass payment ID, order ID, and Razorpay signature to success handler.
           
      });
    } else {
      alert('Please select an address');
    }
    console.log(this.selectedAddress);
    
  }

  validateOrder(response) {
    console.log('in validate');
    if(response.razorpay_payment_id) {
      this.OrderService.validateOrder(response, this.getUserAccessToken).subscribe((result)=>{
        console.log(result);
        // TODO : goto home page
      });
    } else {
      var error = function(response){
        var error_obj = response.error;
        console.log(error_obj.description);
        if(error_obj.field)
          $('input[name=' + error_obj.field+']').addClass('invalid');

        alert(error_obj.field + ": " + error_obj.description);
      }
    }
  }

  showModalToAddAddress=(token,addressDetail)=>{
    this.user=true;
     
    this.addressToken=token;
    this.editAddressDetail = addressDetail;

    if(token=='Add' && this.editAddressDetail=='noAddress'){
      //console.log(token);
      
      //this.addressForm.controls['firstName'].setValue(addressDetail.firstName);
      //this.addressForm.controls['lastName'].setValue(addressDetail.lastName);
      this.addressForm.controls['flat_number'].setValue('');
      this.addressForm.controls['area'].setValue('');
      this.addressForm.controls['pin_code'].setValue('');
      this.addressForm.controls['city'].setValue('');
      this.addressForm.controls['state'].setValue('');
      this.addressForm.controls['type'].setValue('');
      this.addressForm.controls['is_default'].setValue('');
      
      $('#addressUpdate').foundation('open');
    } else {
      //console.log(token);
      this.addressId=this.editAddressDetail.id;
      if(addressDetail.type=='INR' || addressDetail.type.toLowerCase()=='india') {
        this.addressForm.controls['type'].setValue('India');
      } else {
        this.addressForm.controls['type'].setValue('Outside India');
      }

      //this.addressForm.controls['firstName'].setValue(addressDetail.firstName);
      //this.addressForm.controls['lastName'].setValue(addressDetail.lastName);
      this.addressForm.controls['flat_number'].setValue(addressDetail.flat_number);
      this.addressForm.controls['area'].setValue(addressDetail.area);
      this.addressForm.controls['pin_code'].setValue(addressDetail.pin_code);
      this.addressForm.controls['city'].setValue(addressDetail.city);
      this.addressForm.controls['state'].setValue(addressDetail.state);
     
      this.addressForm.controls['is_default'].setValue(addressDetail.is_default);

      $('#addressUpdate').foundation('open');
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
    // console.log(this.getUserDetails.id);
   
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
    // console.log(this.getUserDetails.id);
   
    this.addressService.EditAddress(addressFormData,this.getUserAccessToken,this.addressId).subscribe((data)=>{
      //console.log(data);

      this.addressService.getAllAddresses(this.getUserAccessToken).subscribe((data)=>{
        //console.log(data);
        this.addressDetail = data;
      });
    });
  }
}
