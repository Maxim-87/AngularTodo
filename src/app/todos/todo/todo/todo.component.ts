import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DomainTodo, FilterType, Todo} from "../../models/todos.models";
import {TodosService} from "../../services/todos.service";

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
   @Input() todo!: DomainTodo
   @Output () deleteTodoEvent = new EventEmitter<string>()
   @Output () editTitleEvent = new EventEmitter<{id: string, title: string}>()

  constructor(private todosService: TodosService) {
  }

  isTitleEdit = false;

  newTitle = '';

  deleteTodoHandler() {
     this.deleteTodoEvent.emit(this.todo.id)
  }

  changeTodoHandler() {
     this.isTitleEdit = true;
  }

  toggleEditMode() {
     this.isTitleEdit = !this.isTitleEdit;
  }

  editTitleHandler() {
    this.isTitleEdit = false;
     this.editTitleEvent.emit({id: this.todo.id, title: this.newTitle});
      }

  changeFilter(filter: FilterType) {
     this.todosService.changeFilter({filter, todolistId: this.todo.id})
  }

}
