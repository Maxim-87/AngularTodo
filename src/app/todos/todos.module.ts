import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodosRoutingModule} from "./todos-routing.module";
import { TodoComponent } from './todo/todo/todo.component';
import {FormsModule} from "@angular/forms";
import { TasksComponent } from './todo/todo/tasks/tasks.component';
import { TaskComponent } from './todo/todo/tasks/task/task.component';
import { TodoFiltersComponent } from './todo/todo/todo-filters/todo-filters.component';
import { TodoFooterComponent } from './todo/todo/todo-footer/todo-footer.component';

@NgModule({
  declarations: [
    TodoComponent,
    TasksComponent,
    TaskComponent,
    TodoFiltersComponent,
    TodoFooterComponent,
  ],
  exports: [
    TodoComponent
  ],
  imports: [
    CommonModule, TodosRoutingModule, FormsModule,
  ]
})
export class TodosModule { }
