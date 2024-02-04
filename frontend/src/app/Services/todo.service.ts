import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:8080/api/v1/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getTodos`);
  }

  addTodo(todo: Todo): any{
    return this.http.post(`${this.apiUrl}/addTodo`, todo);
  }

  deleteTodo(id:number): any{
    return this.http.delete(`${this.apiUrl}/deleteTodo/${id}`);
  }

  updateTodo(id:number, todo: Todo): any{
    return this.http.put(`${this.apiUrl}/updateTodo/${id}`, todo);
  }
}
