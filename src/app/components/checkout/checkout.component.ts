import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ProductDetailService } from '../../services/product-detail.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $:any;
@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {

	constructor(private productDetailService: ProductDetailService,
		private router: Router) { }
	cartItems = JSON.parse(localStorage.getItem('cart_items')) || [];
	products: any;
	contentLoaded = 0;
	getUserDetails: any;
	itemTotal = 0;
	shippingTotal = 0;
	grandTotal = 0;
	locType = localStorage.getItem('loc_type');
	@ViewChild('loading', {static:false}) loading:ElementRef;

	ngOnInit() {
		$(document).foundation();
		if(this.cartItems.length > 0) {
			this.setProductAndPrice();
		} else {
			this.contentLoaded = 1;
		}
	}

	ngAfterViewInit(){
		setTimeout(()=> {
			this.loading.nativeElement.className = 'hidingLoader' ;
		},500);
	}

	setProductAndPrice() {
		this.itemTotal = this.grandTotal = this.shippingTotal = 0;
		var ids = this.cartItems.map(function (el) { return el.product_id; });
		var postdata = {ids: ids, loc_type: this.locType};
		this.productDetailService.getCartProductsDetail(postdata).subscribe((data)=>{
      		console.log(data);
      		this.products = data.products;
    		this.shippingTotal = data.shipping_price;
			this.cartItems.forEach((cart_item, index) => {
    			var product = this.products.find(product_item => (product_item.id == cart_item.product_id) );
    			this.cartItems[index]['product'] = product;
    			this.itemTotal += product.price;
			});
			this.grandTotal = this.itemTotal + this.shippingTotal;
			this.contentLoaded = 1;
		});
	}

	removeFromCart(index) {
		var c = confirm('Are you sure you want to remove it?');
		if(c) {
			console.log(index);
			this.cartItems.splice(index, 1) ;
			localStorage.setItem('cart_items', JSON.stringify(this.cartItems));
			this.setProductAndPrice();
			//alert('Item removed successfully');
			// TODO : change cart icon quantity in header
		}
	}

	changeQty(event, index) {
		this.cartItems[index]['qty'] = event.target.value;
		localStorage.setItem('cart_items', JSON.stringify(this.cartItems));
		// TODO : change price section also, if change qty , 
		// TODO : Use loader if it takes time in updating price
	}

	goToPayment() {
		var getUserDetails = JSON.parse(localStorage.getItem('user_details'));
		if(getUserDetails) {
			this.router.navigate(['confirmOrder']);
		} else {
			$('#loginModal').foundation('open');
		}
	}
}
