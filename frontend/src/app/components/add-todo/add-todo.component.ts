import { Component, EventEmitter, OnInit, Output, inject, input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../../models/todo.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="modal-header">
			<h4 class="modal-title">Hi there!</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
    Title: <input [(ngModel)]="todo.title" type="text"> <br>
    Description:  <input [(ngModel)]="todo.description" type="text"> <br>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
      <button type="submit" class="btn btn-primary" (click)="addTodo()">Add todo</button>
		</div>
  `,
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent implements OnInit {
  ngOnInit(): void {
    console.log("here")
  }
  name = input<string>();
  @Output() todoEmitter = new EventEmitter<Todo>();
  todo: Todo = {
    title:'',
    description: ''
  }
  activeModal = inject(NgbActiveModal);
  
  addTodo() {
    this.activeModal.close(this.todo);
  }
}
