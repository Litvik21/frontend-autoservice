import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CarOwner } from '../model/carOwner';
import { MessageService } from './message.service';
import {Order} from "../model/order";

@Injectable({ providedIn: 'root' })
export class CarOwnerService {
  private ownersUrl = 'http://localhost:6868/car-owners';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getCarOwners(): Observable<CarOwner[]> {
    return this.http.get<CarOwner[]>(this.ownersUrl)
      .pipe(
        tap(_ => this.log('fetched orders')),
        catchError(this.handleError<CarOwner[]>('getCarOwners', []))
      );
  }

  getCarOwner(id: number): Observable<CarOwner> {
    const url = `${this.ownersUrl}/${id}`;
    return this.http.get<CarOwner>(url).pipe(
      tap(_ => this.log(`fetched owner id=${id}`))
    );
  }

  getOrdersOfOwner(id: number): Observable<Order[]> {
    const url = `${this.ownersUrl}/orders/${id}`;
    return this.http.get<Order[]>(url).pipe(
      tap(_ => this.log(`fetched owner id=${id}`))
    );
  }

  updateCarOwner(owner: CarOwner): Observable<any> {
    const url = `${this.ownersUrl}/${owner.id}`
    return this.http.put(url, owner, this.httpOptions).pipe(
      tap(_ => this.log(`updated mechanic id=${owner.id}`)),
      catchError(this.handleError<any>('updateCarOwner'))
    );
  }

  addCarOwner(owner: CarOwner): Observable<CarOwner> {
    return this.http.post<CarOwner>(this.ownersUrl, owner, this.httpOptions).pipe(
      tap((newOwner: CarOwner) => this.log(`added owner w/ id=${newOwner.id}`)),
      catchError(this.handleError<CarOwner>('addCarOwner'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`CarOwnerService: ${message}`);
  }
}
