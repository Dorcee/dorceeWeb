import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
    this.otp_field = 0;
    this.phone_error = '';
    this.signUpFormControl.removeControl('otp');
  }

  signup(form:any, formDirective: FormGroupDirective): void {
    var formdata = this.signUpFormControl.value;
    //console.log(formdata);
    if(this.otp_field == 0) {
      this.userService.registerUser(formdata).subscribe((data)=>{
        this.otp_field = 1;
        this.signUpFormControl.addControl('otp',  new FormControl('', Validators.required));
        this.timer();
      }, (error:any) => {
        this.phone_error = 'Please, check the number you have entered';
      });
    } else {
      this.userService.verifyOtp(formdata).subscribe((data)=>{
        this.userDetails = data.data.userDetails;
        localStorage.setItem('user_details', JSON.stringify(data.data.userDetails));
        $('#signUpModal').foundation('close');
        this.userSignedUp.emit(true);
        this.removeErrors();
        formDirective.resetForm();
        this.signUpFormControl.reset();
        window.location.reload();
        // TODO :  show successful register message
      }, (error:any) => {
        this.otp_error = 'OTP entered is wrong';
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
        this.phone_error = 'Please, check the number you have entered';
      });
  }

  closeModal(formDirective: FormGroupDirective) {
    // console.log("on close");
    this.removeErrors();
    this.signUpFormControl.reset();
    formDirective.resetForm();
  }
  // TODO : Resend OTP functionality
  // TODO : IF clicked button already - should not click again login button
}
