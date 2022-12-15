import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Task } from '../model/task';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private taskUrl = 'http://localhost:6868/tasks';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl)
      .pipe(
        tap(_ => this.log('fetched tasks')),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.taskUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  updateTask(task: Task): Observable<any> {
    const url = `${this.taskUrl}/${task.id}`
    return this.http.put(url, task, this.httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  updateStatus(id: number, status: String): Observable<any> {
    const url = `${this.taskUrl}/update-status/${id}`
    return this.http.put(url, status, this.httpOptions).pipe(
      tap(_ => this.log(`updated task id=${id}`)),
      catchError(this.handleError<any>('updateStatus'))
    );
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.taskUrl, task, this.httpOptions).pipe(
      tap((newTask: Task) => this.log(`added task w/ id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
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
    this.messageService.add(`ProductService: ${message}`);
  }
}
