import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:8080/api/v1/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getTodos`);
  }
}
