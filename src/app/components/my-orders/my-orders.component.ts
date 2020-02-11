import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { OrderService } from '../../services/order.service';

declare var $:any;

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
	userAccessToken: any;
  constructor(private orderService : OrderService) { }

  @ViewChild('loading', {static:false}) loading:ElementRef;
  
  ngOnInit() {
    var userDetails = JSON.parse(localStorage.getItem('user_details'));
    if(userDetails) {
      this.userAccessToken = userDetails.access_token;
    }
    //console.log(this.userAccessToken);
    this.orderService.getPlacedOrderDetailsOfUser(this.userAccessToken).subscribe(data=> {
      console.log(data);
   
      this.loading.nativeElement.className = 'hidingLoader' ;
    });
  }

}
