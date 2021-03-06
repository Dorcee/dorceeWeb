import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { HomeService } from '../../services/home.service';
import { AddressService } from '../../services/address.service';

declare var $:any;

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {

  constructor(
  	private formBuilder:FormBuilder,
    private homeService: HomeService,
    private addressService: AddressService
  ) { }

  addressFormControl: FormGroup;
  getUserAccessToken:any; 
  userDetails:any;
  addressDetail:any;
  addressToken:string;
  addressId:number;
  @ViewChild('loading', {static:false}) loading:ElementRef;
  @ViewChild('formDirective') public formDirective;
  
  ngOnInit() {
    $('#addressUpdate').foundation();
  	this.getUserAccessToken = JSON.parse(localStorage.getItem('user_details')).access_token;
    //console.log(this.getUserAccessToken);

    this.addressService.getAllAddresses(this.getUserAccessToken).subscribe((data)=>{
     // console.log(data);
      this.addressDetail = data;
      this.loading.nativeElement.className = 'hidingLoader' ;
    },
    (error) => {
      //console.log(error);
      localStorage.removeItem('user_details');
      $('#loginModal').foundation('open');
      this.loading.nativeElement.className = 'hidingLoader' ;
    });
    if(this.addressFormControl) {
      $('#addressUpdate').on('closed.zf.reveal', () => {
          this.closeModal();
      });
    }
  }

  ngAfterViewInit() {
    $('#modalOfConfirmationForAddressTyped').foundation();
  }

  showModalToAddAddress(token,addressDetail){
    $('#addressUpdate').foundation('open');
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    //console.log(this.userDetails);
    this.addressToken=token;

    if(token=='Add'){
      //console.log(token);
      this.addressFormControl = this.formBuilder.group({
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
      this.addressId=addressDetail.id;
      if(addressDetail.type=='INR' || addressDetail.type.toLowerCase()=='india') {
        addressDetail.type='India';
      } else {
        addressDetail.type='Outside India';
      }
      this.addressFormControl = this.formBuilder.group({
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

  onAddAddressSubmition(form:any, formDirective: FormGroupDirective){
    this.homeService.getCountryFromIp().subscribe((data)=>{
     // console.log(data);
      if(data.country.toLowerCase()==this.addressFormControl.controls['type'].value.toLowerCase()) {
        if(data.country.toLowerCase()=='india') {
          this.addressFormControl.controls['type'].setValue(environment.india_location);
        } else {
          this.addressFormControl.controls['type'].setValue(environment.other_location);
        } 
         if(this.addressToken=='Add'){
           this.AddingAddress();
         }
         else {
           this.UpdatingAddress();
         }
      }
      else {
        $('#modalOfConfirmationForAddressTyped').foundation('open');
      }
    
     });

  }

  addressTypedConfirmation() {
    if(this.addressFormControl.controls['type'].value.toLowerCase()=='india') {
      this.addressFormControl.controls['type'].setValue(environment.india_location);
    } else {
      this.addressFormControl.controls['type'].setValue(environment.other_location);
    }   
    if(this.addressToken=='Add'){
      this.AddingAddress();
    }
    else {
      this.UpdatingAddress();
    }
  }

  
  AddingAddress(){
    var addressFormData = this.addressFormControl.value;

    // console.log(this.addressFormControl.controls['type'].value);
    // console.log(addressFormData);
    // console.log(this.userDetails.id);
   
    this.addressService.addAddress(addressFormData,this.getUserAccessToken).subscribe((data)=>{
      //console.log(data);

      this.addressService.getAllAddresses(this.getUserAccessToken).subscribe((data)=>{
        //console.log(data);
        this.addressDetail = data;
        $('#addressUpdate').foundation('close');
      });
    });
    this.closeModal();
  }

  UpdatingAddress() {
    var addressFormData = this.addressFormControl.value;
    // console.log(this.addressFormControl.controls['type'].value);
    // console.log(addressFormData);
    // console.log(this.userDetails.id);
   
    this.addressService.EditAddress(addressFormData,this.getUserAccessToken,this.addressId).subscribe((data)=>{
      //console.log(data);

      this.addressService.getAllAddresses(this.getUserAccessToken).subscribe((data)=>{
        //console.log(data);
        this.addressDetail = data;
        $('#addressUpdate').foundation('close');
      });
    });
    this.closeModal();
  }

  onDeleteAddress(address_id) {
    this.addressService.deleteAddress(this.getUserAccessToken,address_id).subscribe((data) => {
    	//console.log(data);
    	this.addressService.getAllAddresses(this.getUserAccessToken).subscribe((data)=>{
        //console.log(data);
        this.addressDetail = data;
      });
    });
  }

  closeModal() {
    //console.log(this.formDirective);
    this.formDirective.resetForm();
    this.addressFormControl.reset();
  }
}
