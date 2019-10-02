import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(public userService: UserService, public formBuilder: FormBuilder) { }

  ngOnInit() {
  }
  
  verifyOtpForm = this.formBuilder.group({
    phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(13)]],
    otp: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
  });

  verifyOtp() {
    var formdata = this.verifyOtpForm.value;
    console.log(formdata);
    this.userService.verifyOtp(formdata).subscribe((data)=>{
      console.log(data);
    });
  }
}
