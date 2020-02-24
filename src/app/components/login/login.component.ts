import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormBuilder,FormGroup, FormGroupDirective } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

declare var $:any;
var navigateTo:string;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @Input('moveTo') moveTo:string;
    @Output() userLoggingIn = new EventEmitter();

    constructor(
      public userService:UserService,
      public formBuilder: FormBuilder,
      private router:Router
    ) { }

    phone_error = '';
    otp_field = 0;
    enableResendOtp:boolean;
    otp_error = '';
    userDetails = localStorage.getItem('user_details'); 

    loginFormControl:FormGroup;
    otpValidation:boolean = false;
    counter:number;

    ngOnInit() {
        $('#loginModal').foundation();
        // console.log(this.moveTo);
        this.loginFormControl = this.formBuilder.group({
            phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(13)]]
        });
    }

    ngOnChanges() {
      navigateTo=this.moveTo;
      //console.log(navigateTo);
    }

    removeErrors() {
        this.otp_error = '';
        this.otp_field = 0;
        this.phone_error = '';
        this.loginFormControl.removeControl('otp');
    }

    gettingUserRegistered(value) {
        if(value) {
            this.userLoggingIn.emit(true);
        }
    }

    onSubmit(form:any, formDirective: FormGroupDirective): void {
        var formdata = this.loginFormControl.value;
        //console.log(formdata);
        if(this.otp_field == 0) {
            this.userService.generateOtp(formdata).subscribe((data)=>{
                this.otp_field = 1;
                this.otpValidation = true;
                this.loginFormControl.addControl('otp',  new FormControl(''));
                this.timer();
            }, (error:any) => {
                this.phone_error = error.message;
            });
        } else {
            this.userService.verifyOtp(formdata).subscribe((data)=>{
                this.userDetails = data.data.userDetails;
                localStorage.setItem('user_details', JSON.stringify(data.data.userDetails));
                this.userLoggingIn.emit(true);

                this.otp_field = 0;
                this.removeErrors();
                formDirective.resetForm();
                this.loginFormControl.reset();   
                $('#loginModal').foundation('close');
                if(navigateTo){
                    this.router.navigate([navigateTo]);
                }
                window.location.reload();
                // TODO : error section of verify OTP
                // TODO :  show successful login message
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

    addOtpValidations() {
        this.otp_error='';
        this.loginFormControl.controls['otp'].setValidators([Validators.required]);
        this.otpValidation = false;
    }

    resendOtp() {
        this.timer();
        var formdata = this.loginFormControl.value;
        //console.log(formdata);
        this.userService.generateOtp(formdata).subscribe((data)=>{
            //console.log(data);
        }, (error:any) => {
            this.phone_error = error.message;
        });
    }

    closeModal(formDirective: FormGroupDirective) {
       // console.log("on close");
        this.removeErrors();
        this.loginFormControl.reset();
        formDirective.resetForm();
    }

    // TODO : Resend OTP functionality
    // TODO : IF clicked button already - should not click again login button
}
