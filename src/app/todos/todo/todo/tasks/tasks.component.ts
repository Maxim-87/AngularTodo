import {Component, Input, OnInit} from '@angular/core';
import {combineLatest, map, Observable} from "rxjs";
import {Task, UpdateTaskModel} from 'src/app/todos/models/tasks.models';
import {TasksService} from "../../../services/tasks.service";
import {TodosService} from "../../../services/todos.service";
import {TaskStatusEnum} from "../../../../core/enams/taskStatus.enam";

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Input() todolistId!: string

  tasks$?: Observable<Task[]>

  taskTitle = ''

  constructor(private tasksService: TasksService, private todosService: TodosService) {
  }

  ngOnInit(): void {
    this.tasks$ = combineLatest([this.tasksService.tasks$, this.todosService.todos$]).pipe(map(res => {
      const tasks = res[0]
      let tasksForTodo = tasks[this.todolistId]
      const todos = res[1]

      const activeTodo = todos.find(todo => todo.id === this.todolistId)

      if(activeTodo?.filter === 'completed') {
        tasksForTodo = tasksForTodo.filter(todo => todo.status === TaskStatusEnum.completed )
      }

      if(activeTodo?.filter === 'active') {
        tasksForTodo = tasksForTodo.filter(todo => todo.status === TaskStatusEnum.active )
      }
      return tasksForTodo
    }))

    this.tasksService.getTasks(this.todolistId)
  }

  addTask() {
    this.tasksService.createTask(this.todolistId, this.taskTitle)
    this.taskTitle = ''
  }

  deleteTask(taskId: string) {
    this.tasksService.deleteTask(this.todolistId, taskId)
  }

  changeTask(data: {todolistId: string, taskId: string, model: UpdateTaskModel}) {
    this.tasksService.changeTask(data)
  }

}
