import { Component, OnInit } from '@angular/core';
import {Order} from "../order";
import {OrderService} from "../order.service";
import {Car} from "../car";
import {Task} from "../task";
import {Product} from "../product";
import {types} from "@angular/compiler-cli/linker/babel/src/babel_core";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {


  orders: ORder[] | undefined;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders()
      .subscribe(orders => this.orders = orders);
  }

  add(car: Car, description: string, dateReceived: Date, tasks: Array<Task>, products: Array<Product>,
      status: types, totalPrice: number, dateFinished: Date): void {
    description = description.trim();
    totalPrice = totalPrice.valueOf();
    this.orderService.addOrder({ car, description, dateReceived, tasks, products, status, totaalPrice, dateFinished } as Order)
      .subscribe(order => {
        // @ts-ignore
        this.orders.push(order);
      });
  }

}
