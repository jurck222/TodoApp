import { HttpClientModule } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './Services/todo.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from './models/todo.model';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NgbModule],
  providers: [HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  todoService = inject(TodoService);
  todos: any[] = [];
  destroyRef = inject(DestroyRef);
  showAdd = true;

  ngOnInit(): void {
    this.#fetch();
  }

  clickAdd(){
    this.showAdd = false;
    const todo: Todo = {
      title: "todo from frontend",
      description: "this todo was sent from frontend"
    }
    this.todoService.addTodo(todo)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(
      () => this.#fetch()
    );
  }
  
   #fetch(){
    this.todoService
    .getTodos()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(
      (data) => { this.todos = data; }
    );
   }
}
