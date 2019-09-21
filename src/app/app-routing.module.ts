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

const routes: Routes = [
	{ path: '', component: HomepageComponent },
	{ path: 'productDetail', component: ProductDetailComponent },
	{ path: 'productCategory', component: ProductCategoryComponent },
	{ path: 'checkout', component: CheckoutComponent },
	{ path: 'confirmOrder', component: ConfirmOrderComponent },
	{ path: 'aboutUs', component: AboutUsComponent },
	{ path: 'faq', component: FAQComponent },
	{ path: 'sizeGuide', component: SizeGuideComponent },
	{ path: 'shippingPolicy', component: ShippingComponent }
];

@NgModule({
	exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
