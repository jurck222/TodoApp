import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-edit-todo',
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
      @if(editMode){ Title:
      <input [(ngModel)]="todo().title" class="form-control" type="text" />
      <br />
      Description:
      <input
        [(ngModel)]="todo().description"
        class="form-control"
        type="text"
      />
      <br />
      } 
      @else {
      <p>Title: {{ todo().title }}</p>
      <br />
      <p>Description: {{ todo().description }}</p>
      <br />
      }
    </div>
    <div class="modal-footer">
      @if(editMode){
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close()"
      >
        Close
      </button>
      <button type="submit" class="btn btn-primary" (click)="updateTodo()">
        Save todo
      </button>
      } 
      @else {
      <button type="submit" class="btn btn-primary" (click)="switchMode()">
        Edit todo
      </button>
      }
    </div>
  `,
  styles: ``,
})
export class EditTodoComponent {
  todo = input.required<Todo>();
  activeModal = inject(NgbActiveModal);

  editMode = false;

  updateTodo() {
    this.activeModal.close(this.todo());
  }

  switchMode() {
    this.editMode = !this.editMode;
  }
}
