import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      Title:
      <input [(ngModel)]="todo.title" class="form-control" type="text" /> <br />
      Description:
      <input [(ngModel)]="todo.description" class="form-control" type="text" />
      <br />
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close('Close click')"
      >
        Close
      </button>
      <button type="submit" class="btn btn-primary" (click)="addTodo()">
        Add todo
      </button>
    </div>
  `,
  styleUrl: './add-todo.component.css',
})
export class AddTodoComponent {
  @Output() todoEmitter = new EventEmitter<Todo>();

  todo: Todo = {
    title: '',
    description: '',
  };

  activeModal = inject(NgbActiveModal);

  addTodo() {
    this.activeModal.close(this.todo);
  }
}
