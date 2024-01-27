import { HttpClientModule } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './Services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  todoService = inject(TodoService);
  todos: any[] = [];
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.todoService
      .getTodos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (data) => {
          this.todos = data;
        },
        (error) => {
          console.error('Error fetching todos:', error);
        }
      );
  }
}
