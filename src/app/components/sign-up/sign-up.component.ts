import { Component, OnInit, Output, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, Validators, FormBuilder,FormGroup, FormGroupDirective } from '@angular/forms';
import { UserService } from '../../services/user.service';

declare var $:any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(public userService: UserService, public formBuilder: FormBuilder) { }
  @Output() userSignedUp = new EventEmitter();
  @Output() DataOfLogin = new EventEmitter();
  @ViewChild('formDirective') public formDirective;

  ngOnInit() {
    $('#signUpModal').foundation();
    $('#verifyModal').foundation();
  }
  
  phone_error = '';
  userDetails = '';
  otp_field = 0;
  otp_error = '';
  enableResendOtp:boolean;
  counter:number;

  verifyOtpForm = this.formBuilder.group({
    phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(13)]],
    otp: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
  });
  // TODO : remove verify form -not in use

  signUpFormControl = this.formBuilder.group({
    fname: ['', [Validators.required]],
    lname: ['', [Validators.required]],
    email: [''],
    isd_code: '+91',
    phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(13)]]
  });

  verifyOtp() {
    var formdata = this.verifyOtpForm.value;
    //console.log(formdata);
    this.userService.verifyOtp(formdata).subscribe((data)=>{
      //console.log(data);
    });
  }

  removeErrors() {
    //console.log('remove error');
    this.otp_field = 0;
    this.phone_error = '';
    this.signUpFormControl.removeControl('otp');
  }

  signup(form:any, formDirective: FormGroupDirective): void {
   //console.log(this.otp_field); 
    var formdata = this.signUpFormControl.value;
    //console.log(formdata);
    if(this.otp_field == 0) {
      this.userService.registerUser(formdata).subscribe((data)=>{
        this.otp_field = 1;
        this.signUpFormControl.addControl('otp',  new FormControl('', Validators.required));
        this.timer();
      }, (error:any) => {
        //console.log(error.error);
        if(error.error.message) {
            this.phone_error = error.error.message;
        } else if(error.error) {
            this.phone_error = error.error;
        } else {
          this.phone_error = 'Please, check the number you have entered';
        }
      });
    } else {
      this.userService.verifyOtp(formdata).subscribe((data)=>{
        this.userDetails = data.data.userDetails;
        localStorage.setItem('user_details', JSON.stringify(data.data.userDetails));
        $('#signUpModal').foundation('close');
        this.userSignedUp.emit(true);

        this.otp_field = 0;
        this.removeErrors();
        formDirective.resetForm();
        this.signUpFormControl.reset();
        window.location.reload();
        // TODO :  show successful register message
      }, (error:any) => {
         //console.log(error);
        if(error.error) {
          this.otp_error = error.error;    
        } else {
          this.otp_error = 'OTP entered is wrong';
        } 
      });
    }
  }

  timer() {
    this.counter = 30;
    this.enableResendOtp = false;
    var interval = setInterval(() => {
        this.counter--;
        if(this.counter == 0 ){
          this.enableResendOtp = true;
          
          clearInterval(interval);
        };
    }, 1000);
  }

  resendOtp() {
    this.timer();
    var formdata = this.signUpFormControl.value;
     //console.log(formdata);
      this.userService.registerUser(formdata).subscribe((data)=>{
        //console.log(data);
      }, (error:any) => {
        if(error.error.message) {
            this.phone_error = error.error.message;
        } else if(error.error) {
            this.phone_error = error.error;
        } else {
          this.phone_error = 'Please, check the number you have entered';
        }
        //this.phone_error = 'Please, check the number you have entered';
      });
  }

  closeModal() {
   // console.log("on close sign up");
    this.removeErrors();
    this.enableResendOtp = false;
    this.signUpFormControl.reset();
    this.formDirective.resetForm();

    this.DataOfLogin.emit(); 
  }
  // TODO : Resend OTP functionality
  // TODO : IF clicked button already - should not click again login button
}
