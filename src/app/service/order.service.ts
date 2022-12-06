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
  private ordersUrl = 'http://localhost:6868/orders';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET orders from the server */
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl)
      .pipe(
        tap(_ => this.log('fetched orders')),
        catchError(this.handleError<Order[]>('getOrders', []))
      );
  }

  /** GET order by id. Will 404 if id not found */
  getOrder(id: number): Observable<Order> {
    const url = `${this.ordersUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Order>(`getOrder id=${id}`))
    );
  }

  /** PUT: update the order on the server */
  updateOrder(order: Order): Observable<any> {
    const url = `${this.ordersUrl}/${order.id}`
    return this.http.put(url, order, this.httpOptions).pipe(
      tap(_ => this.log(`updated order id=${order.id}`)),
      catchError(this.handleError<any>('updateOrder'))
    );
  }

  /** PUT: update the status of order on the server */
  updateStatus(id: number, status: String): Observable<any> {
    const url = `${this.ordersUrl}/update-status/${id}`
    return this.http.put(url, status, this.httpOptions).pipe(
      tap(_ => this.log(`updated order id=${id}`)),
      catchError(this.handleError<any>('updateOrder'))
    );
  }

  /** GET total price by id. Will 404 if id not found */
  getTotalPrice(id: number): Observable<Number> {
    const url = `${this.ordersUrl}/price/${id}`;
    return this.http.get<Number>(url).pipe(
      tap(_ => this.log(`fetched order id=${id}`)),
      catchError(this.handleError<Number>(`getOrder id=${id}`))
    );
  }

  /** POST: add a new order to the server */
  addOrder(order: { car: Car; dateFinished: Date; description: string; tasks: Task[]; products: Product[] }): Observable<Order> {
    return this.http.post<Order>(this.ordersUrl, order, this.httpOptions).pipe(
      tap((newOrder: Order) => this.log(`added order w/ id=${newOrder.id}`)),
      catchError(this.handleError<Order>('addOrder'))
    );
  }

  /** GET order by id. Will 404 if id not found */
  addProductToOrder(id: number, product: Product): Observable<Order> {
    return this.http.post<Order>(`${this.ordersUrl}/add-product/${id}`, product, this.httpOptions).pipe(
      tap((newOrder: Order) => this.log(`added order w/ id=${newOrder.id}`)),
      catchError(this.handleError<Order>('addOrder'))
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }
}
