import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../enviroments/environment";
import {BehaviorSubject, map} from "rxjs";
import {DomainTodo, FilterType, Todo} from "../models/todos.models";
import {CommonResponse} from "../../core/models/core.models";

@Injectable({
  providedIn: 'root'
})

export class TodosService {

  todos$ = new BehaviorSubject<DomainTodo[]>([])

  constructor(private http: HttpClient) {
  }

  getTodos() {
    this.http.get<Todo[]>(`${environment.baseURL}/todo-lists`)
      .pipe(map( todos => {
        const newTodos: DomainTodo[] = todos.map(tl => ({...tl, filter: 'all'}))
        return newTodos
    }))
      .subscribe(
        (todos: DomainTodo[]) => {
        this.todos$.next(todos)
      }
    )
  }

  createTodo(title: string) {
    this.http.post<CommonResponse<{item: Todo}>>(`${environment.baseURL}/todo-lists`, {title}).pipe(
      map(res => {
      const stateTodos = this.todos$.getValue()
      const newTodo: DomainTodo = {...res.data.item, filter: 'all'}
      return [newTodo, ...stateTodos]
      })).subscribe(
      todos => {
          this.todos$.next(todos)
      }
    )
  }

  deleteTodo(id: string) {
    this.http.delete<CommonResponse<{item: Todo}>>(`${environment.baseURL}/todo-lists/${id}`).pipe(
      map(res => {
      const stateTodos = this.todos$.getValue()
      return stateTodos.filter(todo => todo.id !== id)
    })).subscribe(
      todos => {
          this.todos$.next(todos)
      }
    )
  }

  changeTodoTitle(data: {id: string, title: string}) {
    this.http.put<CommonResponse>(`${environment.baseURL}/todo-lists/${data.id}`, {title: data.title}).pipe(
      map(() => {
      const stateTodos = this.todos$.getValue()
      return stateTodos.map(todo => {
        if(todo.id === data.id) {
         return {...todo, title: data.title}
        } else {
          return todo
        }
      })
    })).subscribe(
      todos => {
          this.todos$.next(todos)
      }
    )
  }

  changeFilter(data: {filter: FilterType, todolistId: string}) {
    const stateTodos = this.todos$.getValue()
    const newTodos = stateTodos.map(todo => {
      if(todo.id === data.todolistId) {
        return {...todo, filter: data.filter}
      } else {
        return todo
      }
    })
    this.todos$.next(newTodos)
  }
}
