import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {

	constructor(private homeService: HomeService) { }
	cart_items = JSON.parse(localStorage.getItem('cart_items')) || [];
	fits: any;
	products: any;
	contentLoaded = 0;
	@ViewChild('loading', {static:false}) loading:ElementRef;

	ngOnInit() {
		if(this.cart_items) {
		//console.log(this.cart_items);
			this.homeService.getAllProducts().subscribe((data)=>{
	      		this.products = data;
				var types = {"type" : ["fits"]};
				this.homeService.getAllEntities(types).subscribe((data)=>{
					this.fits = data.fits;
					this.cart_items.forEach((cart_item, index) => {
		    			var product = this.products.find(product_item => (product_item.id == cart_item.id) );
		    			this.cart_items[index]['product'] = product;
					});
					this.contentLoaded = 1;
					//console.log(this.cart_items);
				});
			});
		} else {
			this.contentLoaded = 1;
		}
	}

	ngAfterViewInit(){
		setTimeout(()=> {
			this.loading.nativeElement.className = 'hidingLoader' ;
		},500);
	}

	removeFromCart(index) {
		console.log(index);
		this.cart_items.splice(index, 1) ;
		localStorage.setItem('cart_items', JSON.stringify(this.cart_items));
		//alert('Item removed successfully');
		// TODO : change price section also, if change qty , 
		// TODO : successfully remove message
	}

	changeQty(event, index) {
		this.cart_items[index]['qty'] = event.target.value;
		localStorage.setItem('cart_items', JSON.stringify(this.cart_items));
		// TODO : change price section also, if change qty , 
		// TODO : Use loader if it takes time in updating price
	}
}
