import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	$(document).foundation();
  }
  addressFormControl = new FormControl('', [
    //Validators.required,
    //Validators.email,
  ]);
}
