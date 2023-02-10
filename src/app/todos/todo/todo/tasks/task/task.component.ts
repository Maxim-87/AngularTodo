import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task, UpdateTaskModel} from "../../../../models/tasks.models";
import {TaskStatusEnam} from "../../../../../core/enams/taskStatus.enam";

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
   @Input() task!: Task
   @Output() deleteTaskEvent = new EventEmitter<string>()
   @Output() changeTaskEvent = new EventEmitter<{ todolistId: string, taskId: string, model: UpdateTaskModel }>()

   isEditTask = true;

   taskStatusEnum = TaskStatusEnam

  newTaskTitle = ''

  constructor() {
  }

  ngOnInit(): void {
  }

  deleteTask() {
     this.deleteTaskEvent.emit(this.task.id)
  }

  showEdit() {
    this.isEditTask = !this.isEditTask;
  }

  changeTaskTitle() {
    this.changeTask({title: this.newTaskTitle})
    this.isEditTask = !this.isEditTask;
   }

  changeTaskStatus(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked
    this.changeTask({status: newStatus ? this.taskStatusEnum.completed : this.taskStatusEnum.active})
  }

  changeTask(path: Partial<UpdateTaskModel>) {
    const model: UpdateTaskModel = {
      status: this.task.status,
      title:  this.task.title,
      description: this.task.description,
      completed: this.task.completed,
      priority: this.task.priority,
      startDate: this.task.startDate,
      deadline: this.task.deadline,
      ...path,
    }

    this.changeTaskEvent.emit({todolistId: this.task.todoListId, taskId: this.task.id, model})

  }
}
