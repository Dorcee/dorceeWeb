import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
	
  constructor() { }

  ngOnInit() {
  	$(document).foundation();
  	
  	
  }

}
