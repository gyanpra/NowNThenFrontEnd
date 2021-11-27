import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { OrderItem } from '../models/orderitem';
import { map, Observable } from 'rxjs';
import { environment } from 'environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orderAPI = environment.apiURL + 'orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderAPI);
  }

  getOrder(orderid: string): Observable<Order> {
    return this.http.get<Order>(`${this.orderAPI}/${orderid}`);
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.orderAPI, order);
  }

  deleteOrder(orderid: string): Observable<any> {
    return this.http.delete<Order>(`${this.orderAPI}/${orderid}`);
  }

  updateOrder(orderStatus: {status: any}, orderId: any): Observable<Order> {
    return this.http.put<Order>(`${this.orderAPI}/${orderId}`, orderStatus);
  }

  getTotalOrders(): Observable<number> {
    return this.http.get<number>(`${this.orderAPI}/get/count`).pipe(map((objectValue: any) => objectValue.count));
  }

  getRevenue():Observable<number>{
    return this.http.get<number>(`${this.orderAPI}/get/totalsales`).pipe(map((objectValue: any) => objectValue.totalsales));
  }

}













