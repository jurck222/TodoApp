import { HttpClientModule } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './Services/todo.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from './models/todo.model';
import { AddTodoComponent } from './components/add-todo/add-todo.component';

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
  todos: Todo[];
  showAdd = true;

  readonly #todoService = inject(TodoService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #modalService = inject(NgbModal);

  ngOnInit(): void {
    this.#fetch();
  }

  clickAdd(){
    const modalRef = this.#modalService.open(AddTodoComponent);
	
    modalRef.result.then((todo) => {
      if (todo) {
        this.#todoService.addTodo(todo)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe(() => this.#fetch());
      }
    });
    /*
    const todo: Todo = {
      title: "todo from frontend",
      description: "this todo was sent from frontend"
    }
    this.todoService.addTodo(todo)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(
      () => this.#fetch()
    );*/
  }

  deleteTodo(todo: Todo) {
    if(todo.id){
      this.#todoService.deleteTodo(todo.id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.#fetch());
    }
  }

  #fetch(){
    this.#todoService
    .getTodos()
    .pipe(takeUntilDestroyed(this.#destroyRef))
    .subscribe(
      (data) => { this.todos = data; }
    );
   }
}
