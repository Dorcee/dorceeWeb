import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';
import { PaymentFooterComponent } from './components/payment-footer/payment-footer.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FAQComponent } from './components/faq/faq.component';
import { SizeGuideComponent } from './components/size-guide/size-guide.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { HomePageHeaderComponent } from './components/home-page-header/home-page-header.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { InstapageComponent } from './components/instapage/instapage.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    ProductDetailComponent,
    ProductCategoryComponent,
    LoginComponent,
    SignUpComponent,
    CheckoutComponent,
    ConfirmOrderComponent,
    PaymentFooterComponent,
    AboutUsComponent,
    FAQComponent,
    SizeGuideComponent,
    ShippingComponent,
    HomePageHeaderComponent,
    MyOrdersComponent,
    ProfileComponent,
    AddressesComponent,
    InstapageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSliderModule,
    MatInputModule,
    MatRadioModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
