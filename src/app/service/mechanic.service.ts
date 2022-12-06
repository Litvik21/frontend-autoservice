import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Mechanic } from '../model/mechanic';
import { MessageService } from './message.service';
import {Order} from "../model/order";
import {Car} from "../model/car";

@Injectable({ providedIn: 'root' })
export class MechanicService {
  private mechanicsUrl = 'http://localhost:6868/mechanics';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET heroes from the server */
  getMechanics(): Observable<Mechanic[]> {
    return this.http.get<Mechanic[]>(this.mechanicsUrl)
      .pipe(
        tap(_ => this.log('fetched mechanics')),
        catchError(this.handleError<Mechanic[]>('getMechanics', []))
      );
  }

  /** GET mechanic by id. Will 404 if id not found */
  getMechanic(id: number): Observable<Mechanic> {
    const url = `${this.mechanicsUrl}/${id}`;
    return this.http.get<Mechanic>(url).pipe(
      tap(_ => this.log(`fetched mechanic id=${id}`)),
      catchError(this.handleError<Mechanic>(`getMechanic id=${id}`))
    );
  }

  /** GET mechanic's finished orders by id. Will 404 if id not found */
  getFinishedOrders(id: number): Observable<Order[]> {
    const url = `${this.mechanicsUrl}/${id}/finished-orders`;
    return this.http.get<Order[]>(url).pipe(
      tap(_ => this.log(`fetched mechanic id=${id}`)),
      catchError(this.handleError<Order[]>(`getMechanic id=${id}`))
    );
  }

  /** GET mechanic's salary by id. Will 404 if id not found */
  getSalary(id: number): Observable<Number> {
    const url = `${this.mechanicsUrl}/${id}`;
    return this.http.get<Number>(url).pipe(
      tap(_ => this.log(`fetched mechanic id=${id}`)),
      catchError(this.handleError<Number>(`getMechanic id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateMechanic(mechanic: Mechanic): Observable<any> {
    const url = `${this.mechanicsUrl}/${mechanic.id}`
    return this.http.put(url, mechanic, this.httpOptions).pipe(
      tap(_ => this.log(`updated mechanic id=${mechanic.id}`)),
      catchError(this.handleError<any>('updateMechanic'))
    );
  }

  /** POST: add a new hero to the server */
  addMechanic(mechanic: Mechanic): Observable<Mechanic> {
    return this.http.post<Mechanic>(this.mechanicsUrl, mechanic, this.httpOptions).pipe(
      tap((newMechanic: Mechanic) => this.log(`added mechanic w/ id=${newMechanic.id}`)),
      catchError(this.handleError<Mechanic>('addMechanic'))
    );
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
