import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../enviroments/environment";
import {BehaviorSubject, map, Observable} from "rxjs";
import {DomainTask, GetTasksResponse, Task, UpdateTaskModel} from "../models/tasks.models";
import {CommonResponse} from "../../core/models/core.models";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks$ = new BehaviorSubject<DomainTask>({}) // create state

  constructor(private http: HttpClient) {
  }

  getTasks(todolistId: string) {
    return this.http.get<GetTasksResponse>(`${environment.baseURL}/todo-lists/${todolistId}/tasks`).pipe(
      map(task => task.items))
      .subscribe((tasks) => {
        const stateTasks = this.tasks$.getValue()
        stateTasks[todolistId] = tasks
        this.tasks$.next(stateTasks)
      })
  }

  createTask(todolistId: string, title: string) {
    this.http.post<CommonResponse<{ item: Task }>>(`${environment.baseURL}/todo-lists/${todolistId}/tasks`, {title})
      .pipe(map((res) => {
        const stateTasks = this.tasks$.getValue()
        const newTask = res.data.item
        const newTasks = [newTask, ...stateTasks[todolistId]]
        stateTasks[todolistId] = newTasks
        return stateTasks
      }))
      .subscribe(
        (tasks) => this.tasks$.next(tasks)
      )
  }

  deleteTask(todolistId: string, taskId: string) {
    debugger
    this.http.delete<CommonResponse>(`${environment.baseURL}/todo-lists/${todolistId}/tasks/${taskId}`)
      .pipe(map((res) => {
        debugger
        const stateTasks = this.tasks$.getValue()
        stateTasks[todolistId] = stateTasks[todolistId].filter(task => task.id !== taskId)
        return stateTasks
      }))
      .subscribe(
        (tasks) => this.tasks$.next(tasks)
      )
  }

  changeTask(data: {todolistId: string, taskId: string, model: UpdateTaskModel}) {
    this.http.put<CommonResponse>(`${environment.baseURL}/todo-lists/${data.todolistId}/tasks/${data.taskId}`, data.model)
      .pipe(map(res => {
        debugger
        const stateTasks = this.tasks$.getValue()
        stateTasks[data.todolistId] = stateTasks[data.todolistId].map(task => {
          if (task.id === data.taskId) {
            return {...task, ...data.model}
          }
          else return task
        })
        return stateTasks
      }))
      .subscribe((tasks: DomainTask) => this.tasks$.next(tasks))
  }

}


