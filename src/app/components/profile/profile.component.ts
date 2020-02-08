import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	user:any;
  user_details:any;
  getUserAccessToken:string;
  profileForm : FormGroup;
  editable : Boolean = false;
  @ViewChild('loading', {static:false}) loading:ElementRef;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    // user_details have data of a user who is logged in, which is saved in local storage
    
  	this.user_details=JSON.parse(localStorage.getItem('user_details'));  
    if(this.user_details) {
      this.getUserAccessToken =  this.user_details.access_token
      //console.log(this.getUserAccessToken);

      this.userService.getUserDetails(this.getUserAccessToken).subscribe(data => {
        this.user = data.data[0];
        //console.log(this.user);

        if(this.user) {
          this.profileForm = this.formBuilder.group({
            fname: [this.user.fname,[Validators.required]],
            lname: [this.user.lname,[Validators.required]],
            gender:this.user.gender,
            email:[this.user.email,[ Validators.email]],
            phone_number:[this.user.phone_number, [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(13)]],
          }); 
        }    
        this.loading.nativeElement.className = 'hidingLoader' ;
      });
    }

    // this.profileForm.disable();
  }

  onEditProfile(form) {
    if(form.valid) {
      this.editable=false;
      //console.log(this.editable);

      //console.log(form.value);
      this.userService.updateUserDetails(form.value, this.getUserAccessToken).subscribe(data => {
       // console.log(data);
      })
    }
  }

}
