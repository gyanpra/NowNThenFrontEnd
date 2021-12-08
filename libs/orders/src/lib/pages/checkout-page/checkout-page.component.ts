import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, Order, OrderItem, OrdersService } from '@nownthenfrontend/orders';
import { User, UsersService } from '@nownthenfrontend/users';
import { take } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private usersService:UsersService, private cartService:CartService, private orderService:OrdersService, private router:Router) { }

  checkOutform!: FormGroup;
  isSubmitted = false;
  orderItems : OrderItem[] = [];
  userId: string='61b113627a8fbf5cd3e279d5';


  ngOnInit(): void {
    this._initUserForm();
    this._getCartItems();
    // this._autofilledUserDetails();
  }

  private _initUserForm(){
    this.checkOutform = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      phone: ['',Validators.required],
      state: ['',Validators.required],
      address: ['',Validators.required],
      city: ['',Validators.required],
      pincode: ['',Validators.required]
    })
  }

  placeOrder(){
    this.isSubmitted = true;
    if(this.checkOutform.invalid){
      return;
    }
    const order: Order={
      orderItems: this.orderItems,
      shippingAddress: this.outputForm.address.value,
      city: this.outputForm.city.value,
      state: this.outputForm.state.value,
      PinCode: this.outputForm.pincode.value,
      phone: this.outputForm.phone.value,
      status: 0,
      user: this.userId,
    }

    console.log(this.userId)
    this.orderService.addOrder(order).subscribe(res => {
      this.router.navigate(['/thank-you']);
      this.cartService.clearCart();
    })
  }


  private _getCartItems(){
    const cart: Cart = this.cartService.getCart();
    // @ts-ignore
    this.orderItems = cart.items.map(item => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
    });
    console.log(this.orderItems);
  }

  // private _autofilledUserDetails(){
  //   this.usersService.observeCurrentUser().pipe().subscribe((user:User) => {
  //     this.userId = user.id;
  //     this.outputForm.name.setValue(user.name);
  //     this.outputForm.email.setValue(user.email);
  //     this.outputForm.phone.setValue(user.phone);
  //     this.outputForm.state.setValue(user.state);
  //     this.outputForm.address.setValue(user.address);
  //     this.outputForm.city.setValue(user.city);
  //     this.outputForm.pincode.setValue(user.pincode);


  //   })
  //   console.log(this.outputForm.name);
  // }
  

  get outputForm() {
    return this.checkOutform.controls;
  }




}

