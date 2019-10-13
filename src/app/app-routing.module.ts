import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component'
import { ProductDetailComponent } from './components/product-detail/product-detail.component'
import { ProductCategoryComponent } from './components/product-category/product-category.component'
import { CheckoutComponent } from './components/checkout/checkout.component'
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component'
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FAQComponent } from './components/faq/faq.component';
import { SizeGuideComponent } from './components/size-guide/size-guide.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { InstapageComponent } from './components/instapage/instapage.component';

const routes: Routes = [
	{ 
		path: '', 
		component: HomepageComponent 
	},
	{ 
		path: 'dorcee_official', 
		component: InstapageComponent 
	},
	{ 
		path: 'productDetail', 
		component: ProductDetailComponent 
	},
	{ 
		path: 'productCategory', 
		component: ProductCategoryComponent 
	},
	{ 
		path: 'checkout', 
		component: CheckoutComponent 
	},
	{ 
		path: 'confirmOrder', 
		component: ConfirmOrderComponent 
	},
	{ 
		path: 'aboutUs', 
		component: AboutUsComponent 
	},
	{ 
		path: 'faq', 
		component: FAQComponent 
	},
	{ 
		path: 'sizeGuide', 
		component: SizeGuideComponent 
	},
	{ 
		path: 'shippingPolicy', 
		component: ShippingComponent 
	},
	{ 
		path: 'addresses', 
		component: AddressesComponent 
	},
	{ 
		path: 'profile', 
		component: ProfileComponent 
	},
	{ 
		path: 'myOrders', 
		component: MyOrdersComponent
  }
];

@NgModule({
	exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
