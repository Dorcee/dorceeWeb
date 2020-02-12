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
    otp_error = '';
    userDetails = localStorage.getItem('user_details'); 

    loginFormControl:FormGroup;

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

                this.otp_field = 0;
                this.removeErrors();
                formDirective.resetForm();
                this.loginFormControl.reset();   
                $('#loginModal').foundation('close');
                if(navigateTo){
                    this.router.navigate([navigateTo]);
                }
                
                // TODO : error section of verify OTP
                // TODO :  show successful login message
            }, (error:any) => {
                this.otp_error = error.message;
            });
        }
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
