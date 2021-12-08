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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import {DropdownModule} from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthguardGuard } from '@nownthenfrontend/users';

export const ordersRoutes: Route[] = [
  { path: 'cart', component: CartPageComponent },
  { path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthguardGuard] },
  { path: 'thank-you', component: ThankYouComponent }
];

@NgModule({
  imports: [CommonModule, BadgeModule,ToastModule,InputNumberModule,ReactiveFormsModule, ButtonModule, FormsModule, RouterModule.forChild(ordersRoutes),DropdownModule,InputTextModule,InputMaskModule],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,


  ],
  exports: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent
  ],
  providers: [
    MessageService]
})
export class OrdersModule {
  
  constructor(cartService:CartService) {

    cartService.initCartLocalStorage();
  }
}
