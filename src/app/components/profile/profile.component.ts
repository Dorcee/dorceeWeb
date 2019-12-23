import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { User_Details } from '../../models/interfaceDirectory';

declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	user_details:any;
  profileForm : FormGroup;
  editable : Boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  	$(document).foundation();
    // user_details have data of a user who is logged in, which is saved in local storage
    
  	this.user_details=JSON.parse(localStorage.getItem('user_details'));  
    //console.log(this.user_details);
	  
    this.profileForm = this.formBuilder.group({
	    firstName: [this.user_details.fname,[Validators.required]],
	    lastName: [this.user_details.lname,[Validators.required]],
	    gender:this.user_details.gender,
	    email:[this.user_details.email,[ Validators.email]],
	    phone_number:[this.user_details.phone_number, [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(13)]],
	  });

    // this.profileForm.disable();
  }

  onEditProfile() {
    if(this.profileForm.valid) {
      this.editable=false;
      //console.log(this.editable);

      //Api call for saving details of user
     // console.log(this.profileForm.value);

    } else {  
      //console.log('Form is not valid');
    }
  }

}
