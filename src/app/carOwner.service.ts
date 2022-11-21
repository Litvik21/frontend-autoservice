import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CarOwner } from './carOwner';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class CarOwnerService {
  private ownersUrl = 'http://localhost:6868/car-owners';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET heroes from the server */
  getOrdersOfOwner(): Observable<CarOwner[]> {
    return this.http.get<CarOwner[]>(this.ownersUrl)
      .pipe(
        tap(_ => this.log('fetched mechanics')),
        catchError(this.handleError<CarOwner[]>('getOrdersOfOwner', []))
      );
  }

  /** PUT: update the hero on the server */
  updateCarOwner(owner: CarOwner): Observable<any> {
    const url = `${this.ownersUrl}/${owner.id}`
    return this.http.put(url, owner, this.httpOptions).pipe(
      tap(_ => this.log(`updated mechanic id=${owner.id}`)),
      catchError(this.handleError<any>('updateCarOwner'))
    );
  }

  /** POST: add a new hero to the server */
  addCarOwner(owner: CarOwner): Observable<CarOwner> {
    return this.http.post<CarOwner>(this.ownersUrl, owner, this.httpOptions).pipe(
      tap((newOwner: CarOwner) => this.log(`added owner w/ id=${newOwner.id}`)),
      catchError(this.handleError<CarOwner>('addCarOwner'))
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
