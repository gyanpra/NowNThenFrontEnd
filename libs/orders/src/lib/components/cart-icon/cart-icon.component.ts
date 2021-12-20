import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css'],
  
})
export class CartIconComponent implements OnInit {

  cartCount:number = 0;
  cartCountString : string ="0";
  constructor(private cartService:CartService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.messageService.add({severity:'success', summary:'Success', detail:"Item Updated"});
      console.log("cart icon component: ", cart);

      //if cartcount is there show that else 0.
      this.cartCount = cart?.items?.length??0;
      this.cartCountString = this.cartCount.toString();
      
    });
    // this.cartCount = this.cartService.getCart().items.length;
    
  }

}
