import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';

declare var $:any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(public userService: UserService, public formBuilder: FormBuilder) { }

  ngOnInit() {
  }
  
  phone_error = '';
  userDetails = '';
  otp_field = 0;
  otp_error = '';
  verifyOtpForm = this.formBuilder.group({
    phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(13)]],
    otp: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
  });

  signUpFormControl = this.formBuilder.group({
    fname: ['', [Validators.required]],
    lname: ['', [Validators.required]],
    email: [''],
    phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(13)]]
  });

  verifyOtp() {
    var formdata = this.verifyOtpForm.value;
    console.log(formdata);
    this.userService.verifyOtp(formdata).subscribe((data)=>{
      console.log(data);
    });
  }

  removeErrors() {
    this.otp_field = 0;
    this.phone_error = '';
    this.signUpFormControl.removeControl('otp');
  }

  signup() {
    var formdata = this.signUpFormControl.value;
    console.log(formdata);
    if(this.otp_field == 0) {
      this.userService.registerUser(formdata).subscribe((data)=>{
        this.otp_field = 1;
        this.signUpFormControl.addControl('otp',  new FormControl('', Validators.required));
      }, (error:any) => {
        this.phone_error = error.message;
      });
    } else {
      this.userService.verifyOtp(formdata).subscribe((data)=>{
        this.userDetails = data.data.userDetails;
        localStorage.setItem('user_details', JSON.stringify(data.data.userDetails));
        $('#signUpModal').foundation('close');
        // TODO :  show successful register message
      }, (error:any) => {
        this.otp_error = error.message;
      });
    }
  }
  // TODO : Resend OTP functionality
  // TODO : IF clicked button already - should not click again login button
}
