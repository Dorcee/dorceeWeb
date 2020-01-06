import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
	
  constructor() { }

  @ViewChild('loading', {static:false}) loading:ElementRef;
  
  ngOnInit() {
  }

  ngAfterViewInit(){
    setTimeout(()=> {
      this.loading.nativeElement.className = 'hidingLoader' ;
    },500);
  }

}
