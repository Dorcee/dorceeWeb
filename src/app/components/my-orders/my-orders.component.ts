import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { environment } from '../../../../src/environments/environment';
import { OrderService } from '../../services/order.service';

declare var $:any;

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
	userAccessToken: any;
  myOrdersArray:any=[];
  indian_location = environment.india_location;

  constructor(private orderService : OrderService) { }

  @ViewChild('loading', {static:false}) loading:ElementRef;
  
  ngOnInit() {
    var userDetails = JSON.parse(localStorage.getItem('user_details'));
    if(userDetails) {
      this.userAccessToken = userDetails.access_token;
    }
    //console.log(this.userAccessToken);
    this.orderService.getPlacedOrderDetailsOfUser(this.userAccessToken).subscribe(data=> {
      //console.log(data);
      var myOrdersResponse = data.data
      //console.log(myOrdersResponse);
      var currentId;
      myOrdersResponse.forEach((element) => {
        if(element.id == currentId) {
          this.myOrdersArray.forEach((insideSameId,index) => {
            if(this.myOrdersArray[index][0].id==element.id){
              this.myOrdersArray[index].push(element);
            }            
          });
        } else {
          this.myOrdersArray.push(Array(element));
          currentId = element.id;
        }  
        //console.log(currentId);
      });
     // console.log(this.myOrdersArray);

      this.loading.nativeElement.className = 'hidingLoader' ;
    },
    (error) => {
      //console.log(error);
      localStorage.removeItem('user_details');
      $('#loginModal').foundation('open');
      this.loading.nativeElement.className = 'hidingLoader' ;
    });
  }

}
