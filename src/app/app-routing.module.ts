import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component'
import { ProductDetailComponent } from './components/product-detail/product-detail.component'
import { ProductCategoryComponent } from './components/product-category/product-category.component'
import { CheckoutComponent } from './components/checkout/checkout.component'
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component'

const routes: Routes = [
	{ path: '', component: HomepageComponent },
	{ path: 'productDetail', component: ProductDetailComponent },
	{ path: 'productCategory', component: ProductCategoryComponent },
	{ path: 'checkout', component: CheckoutComponent },
	{ path: 'confirmOrder', component: ConfirmOrderComponent }
];

@NgModule({
	exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
