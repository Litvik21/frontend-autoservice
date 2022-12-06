import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Task } from '../model/task';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private taskUrl = 'http://localhost:6868/tasks';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET heroes from the server */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl)
      .pipe(
        tap(_ => this.log('fetched tasks')),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  /** GET task by id. Will 404 if id not found */
  getTask(id: number): Observable<Task> {
    const url = `${this.taskUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  /** PUT: update the task on the server */
  updateTask(task: Task): Observable<any> {
    const url = `${this.taskUrl}/${task.id}`
    return this.http.put(url, task, this.httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  /** PUT: update the status of task on the server */
  updateStatus(id: number, status: String): Observable<any> {
    const url = `${this.taskUrl}/update-status/${id}`
    return this.http.put(url, status, this.httpOptions).pipe(
      tap(_ => this.log(`updated task id=${id}`)),
      catchError(this.handleError<any>('updateStatus'))
    );
  }

  /** POST: add a new task to the server */
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.taskUrl, task, this.httpOptions).pipe(
      tap((newTask: Task) => this.log(`added task w/ id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
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
