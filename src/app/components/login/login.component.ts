import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(public userService:UserService) { }

    ngOnInit() {
    }

    loginFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/), 
        Validators.minLength(7), 
        Validators.maxLength(13)
    ]);

    submit() {
        var formdata = this.loginFormControl.value;
        console.log(formdata);
        this.userService.generateOtp({'phone_number':formdata}).subscribe((data)=>{
            console.log(data);
            // TODO : send it to verify form, can create it as a different component
        });
    }
}
