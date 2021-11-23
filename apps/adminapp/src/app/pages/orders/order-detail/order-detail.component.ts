import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderItem, OrdersService } from '@nownthenfrontend/orders';
import { MessageService } from 'primeng/api';

const ORDER_STATUS_OPTION: any = {
  0: {
    label: 'pending',
    color: 'primary'
  },
  1: {
    label: 'Processing',
    color: 'info'
  },
  2: {
    label: 'Shipped',
    color: 'warning'
  },
  3: {
    label: 'Delivered',
    color: 'success'
  },
  4: {
    label: 'Cancelled',
    color: 'danger'
  },
  5: {
    label: 'Refunded',
    color: 'secondary'
  },
  6: {
    label: 'Failed',
    color: 'danger'
  }
}

@Component({
  selector: 'adminapp-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  
  order!: Order;
  orderItem!: undefined | OrderItem;
  orderStatuses:any =[];
  selectedStatus: any = {};

  constructor(private ordersService: OrdersService, private activatedRoute: ActivatedRoute, private messageService: MessageService,) { }

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS_OPTION).map(key => {
      return {
        id: key,
        name: ORDER_STATUS_OPTION[key].label,
      }
    });
  }

  onStatusChange(status: any) {

    this.ordersService.updateOrder({status: this.selectedStatus}, this.order.id).subscribe(order => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `status Changed to ${this.selectedStatus}`,
      });

      this.order = order;
    }
    );
  }

  _getOrder() {
    this.activatedRoute.params.subscribe(params => {
      if(params.id) {
        this.ordersService.getOrder(params.id).subscribe(order => {
          this.order = order;
          console.log(order);
        });
      }
    });
  }




}
