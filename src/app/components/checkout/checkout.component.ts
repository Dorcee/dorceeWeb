import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
	indexToRemove: number;
	@ViewChild('loading', {static:false}) loading:ElementRef;

	ngOnInit() {
		if(this.cartItems.length > 0) {
			this.getUserDetails = JSON.parse(localStorage.getItem('user_details'));
      		
      		if(this.getUserDetails) {
				this.setProductAndPrice();
			} else {
		        this.router.navigate(['/']);
		    }	
		} else {
			this.contentLoaded = 1;
			setTimeout(()=>{
				this.loading.nativeElement.className = 'hidingLoader' ;
			},1500);
		}
		$('.confirmClass').on('click', function () {
            console.log('222222');
        })
	}

	ngAfterViewInit() {
		setTimeout(()=> {
			$('#modalOfConfirmationForRemove').foundation();
		},1000);
	}

	setProductAndPrice() {
		this.itemTotal = this.grandTotal = this.shippingTotal = 0;
		var ids = this.cartItems.map(function (el) { return el.product_id; });
		var postdata = {ids: ids, loc_type: this.locType};
		this.productDetailService.getCartProductsDetail(postdata).subscribe((data)=>{
      		//console.log(data);
      		this.products = data.products;
    		this.shippingTotal = data.shipping_price;
			this.cartItems.forEach((cart_item, index) => {
    			var product = this.products.find(product_item => (product_item.id == cart_item.product_id) );
    			this.cartItems[index]['product'] = product;
    			this.itemTotal += product.price;
			});
			this.grandTotal = this.itemTotal + this.shippingTotal;
			this.contentLoaded = 1;

			this.loading.nativeElement.className = 'hidingLoader' ;
		});
	}

	openModalForRemove(index) {
		this.indexToRemove = index;
		console.log(this.indexToRemove);
		$('#modalOfConfirmationForRemove').foundation('open');
	}

	removeFromCart() {
		console.log('12');
		console.log(this.indexToRemove);
		this.cartItems.splice(this.indexToRemove, 1) ;
		localStorage.setItem('cart_items', JSON.stringify(this.cartItems));
		if(this.cartItems.length > 0) {
			this.setProductAndPrice();
		}
		//alert('Item removed successfully');
		// TODO : change cart icon quantity in header
	}

}

