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
  	this.user_details=JSON.parse(localStorage.getItem('user_details'));
    //console.log(this.user_details);
	  
    this.profileForm = this.formBuilder.group({
	    firstName: this.user_details.fname,
	    lastName: this.user_details.lname,
	    gender:this.user_details.gender,
	    email:this.user_details.email,
	    phone_number:this.user_details.phone_number
	  });

    this.profileForm.disable();
  }

  editProfile() {
    if(!this.editable) {
      this.editable=true;
      console.log(this.editable);
      this.profileForm.enable();  
    } else {
      console.log("saving Details");
      this.editable=false;
      console.log(this.editable);
      this.profileForm.disable(); 

      //Api call for saving details of user
      console.log(this.profileForm.value);

    }
  }

}
