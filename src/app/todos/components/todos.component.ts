import {Component, Injectable, OnInit} from '@angular/core';
import {TodosService} from "../services/todos.service";
import {Observable} from "rxjs";
import {DomainTodo, Todo} from '../models/todos.models';

@Component({
  selector: 'tl-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit{
  todos$?: Observable<DomainTodo[]>

  todoTitle = '';

  constructor(private todosService: TodosService) {
  }

  ngOnInit(): void {
    this.todos$ = this.todosService.todos$
    this.todosService.getTodos()
  }

  createTodo() {
    this.todosService.createTodo(this.todoTitle)
    this.todoTitle = '';
  }

  deleteTodo(id: string) {
  this.todosService.deleteTodo(id)
  }

  editTodoTitle(data: {id: string, title: string}) {
  this.todosService.changeTodoTitle(data)
  }


}
