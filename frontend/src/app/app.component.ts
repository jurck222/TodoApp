import { HttpClientModule } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from './Services/todo.service';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NgbModule, FormsModule],
  providers: [HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isDone: boolean = true;
  title = 'frontend';
  todos: Todo[];
  showAdd = true;

  readonly #todoService = inject(TodoService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #modalService = inject(NgbModal);

  ngOnInit(): void {
    this.#fetch();
  }

  clickAdd() {
    const modalRef = this.#modalService.open(AddTodoComponent);

    modalRef.result.then((todo) => {
      if (todo) {
        this.#todoService
          .addTodo(todo)
          .pipe(takeUntilDestroyed(this.#destroyRef))
          .subscribe(() => this.#fetch());
      }
    });
  }

  openTodo(todo: Todo) {
    const modalRef = this.#modalService.open(EditTodoComponent);
    modalRef.componentInstance.todo = input(todo);
    modalRef.result.then((todo) => {
      if (todo) {
        this.#todoService
          .updateTodo(todo.id, todo)
          .pipe(takeUntilDestroyed(this.#destroyRef))
          .subscribe(() => this.#fetch());
      }
    });
  }

  deleteTodo(todo: Todo) {
    if (todo.id) {
      this.#todoService
        .deleteTodo(todo.id)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe(() => this.#fetch());
    }
  }

  #fetch() {
    this.#todoService
      .getTodos()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        this.todos = data;
      });
  }
}
