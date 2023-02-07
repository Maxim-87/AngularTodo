import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodosRoutingModule} from "./todos-routing.module";
import { TodoComponent } from './todo/todo/todo.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TodoComponent
  ],
  exports: [
    TodoComponent
  ],
  imports: [
    CommonModule, TodosRoutingModule, FormsModule
  ]
})
export class TodosModule { }
