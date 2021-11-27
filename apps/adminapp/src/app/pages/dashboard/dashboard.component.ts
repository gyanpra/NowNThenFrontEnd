import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@nownthenfrontend/orders';
import { ProductsService } from '@nownthenfrontend/products';
import { User, UsersService } from '@nownthenfrontend/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'adminapp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats= Array<number>();

  constructor(private usersService: UsersService, private productsService: ProductsService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    combineLatest([this.usersService.getUserCount(),this.productsService.getProductCount(),this.ordersService.getTotalOrders(),this.ordersService.getRevenue()]).subscribe(results => {
      this.stats = results;
      console.log(this.stats[3]);
  }
  );
}




}
