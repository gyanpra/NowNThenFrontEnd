import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@nownthenfrontend/orders';
import { ConfirmationService, MessageService } from 'primeng/api';




@Component({
  selector: 'adminapp-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];
  // orderStatus = ORDER_STATUS_OPTIONS;


  constructor(private ordersService: OrdersService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this._getOrders();

  }
  

  private _getOrders() {
    this.ordersService.getOrders().subscribe(orders => {
      this.orders = orders;
    });

  }




  displayOrder(orderid: any) {
    this.router.navigateByUrl(`orders/${orderid}`);
  }



  deleteOrder(orderid: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderid).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order deleted successfully' });
          this._getOrders();
        },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting category' });
          }
        );
      }
    });
  }




}
