import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
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
    otp_error = '';
    userDetails = localStorage.getItem('user_details'); 

    ngOnInit() {
         $('#loginModal').foundation();
       // console.log(this.moveTo);
    }

    ngOnChanges() {
        navigateTo=this.moveTo;
        //console.log(navigateTo);
    }

    loginFormControl = this.formBuilder.group({
        phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(13)]]
    });

    removeErrors() {
        this.otp_field = 0;
        this.phone_error = '';
        this.loginFormControl.removeControl('otp');
    }

    gettingUserRegistered(value) {
        console.log(value);
        if(value) {
            this.userLoggingIn.emit(true);
        }
    }
    submit() {
        var formdata = this.loginFormControl.value;
        if(this.otp_field == 0) {
            this.userService.generateOtp(formdata).subscribe((data)=>{
                this.otp_field = 1;
                this.loginFormControl.addControl('otp',  new FormControl('', Validators.required));
            }, (error:any) => {
                this.phone_error = error.message;
            });
        } else {
            this.userService.verifyOtp(formdata).subscribe((data)=>{
                this.userDetails = data.data.userDetails;
                localStorage.setItem('user_details', JSON.stringify(data.data.userDetails));
                this.userLoggingIn.emit(true);
                $('#loginModal').foundation('close');
                this.loginFormControl.reset();
                                 
                if(navigateTo){
                   // console.log('navigate to');
                    this.router.navigate([navigateTo]);
                }
                
                // TODO : error section of verify OTP
                // TODO :  show successful login message
            }, (error:any) => {
                this.otp_error = error.message;
            });
            this.otp_field=0;
        }
    }

    // TODO : Resend OTP functionality
    // TODO : IF clicked button already - should not click again login button
}
