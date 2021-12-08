import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import {BadgeModule} from 'primeng/badge';
import { MessageService } from 'primeng/api';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import {ToastModule} from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

export const ordersRoutes: Route[] = [
  { path: 'cart', component: CartPageComponent }
];

@NgModule({
  imports: [CommonModule, BadgeModule,ToastModule,InputNumberModule, ButtonModule, FormsModule, RouterModule.forChild(ordersRoutes)],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,


  ],
  exports: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent
  ],
  providers: [
    MessageService]
})
export class OrdersModule {
  
  constructor(cartService:CartService) {

    cartService.initCartLocalStorage();
  }
}
