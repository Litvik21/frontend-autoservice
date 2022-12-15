import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Order } from '../model/order';
import { MessageService } from './message.service';
import {Product} from "../model/product";
import {Car} from "../model/car";
import {Task} from "../model/task";

@Injectable({ providedIn: 'root' })
export class OrderService {
  private ordersUrl = 'http://localhost:6868/orders';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl)
      .pipe(
        tap(_ => this.log('fetched orders')),
        catchError(this.handleError<Order[]>('getOrders', []))
      );
  }

  getOrder(id: number): Observable<Order> {
    const url = `${this.ordersUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Order>(`getOrder id=${id}`))
    );
  }

  updateOrder(order: Order): Observable<any> {
    const url = `${this.ordersUrl}/${order.id}`
    return this.http.put(url, order, this.httpOptions).pipe(
      tap(_ => this.log(`updated order id=${order.id}`)),
      catchError(this.handleError<any>('updateOrder'))
    );
  }

  updateStatus(id: number, status: String): Observable<any> {
    const url = `${this.ordersUrl}/update-status/${id}`
    return this.http.put(url, status, this.httpOptions).pipe(
      tap(_ => this.log(`updated order id=${id}`)),
      catchError(this.handleError<any>('updateOrder'))
    );
  }

  getTotalPrice(id: number): Observable<Number> {
    const url = `${this.ordersUrl}/price/${id}`;
    return this.http.get<Number>(url).pipe(
      tap(_ => this.log(`fetched order id=${id}`)),
      catchError(this.handleError<Number>(`getOrder id=${id}`))
    );
  }

  addOrder(order: { car: Car; dateFinished: Date; description: string; tasks: Task[]; products: Product[] }): Observable<Order> {
    return this.http.post<Order>(this.ordersUrl, order, this.httpOptions).pipe(
      tap((newOrder: Order) => this.log(`added order w/ id=${newOrder.id}`)),
      catchError(this.handleError<Order>('addOrder'))
    );
  }

  addProductToOrder(id: number, product: Product): Observable<Order> {
    return this.http.post<Order>(`${this.ordersUrl}/add-product/${id}`, product, this.httpOptions).pipe(
      tap((newOrder: Order) => this.log(`added order w/ id=${newOrder.id}`)),
      catchError(this.handleError<Order>('addOrder'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }
}
