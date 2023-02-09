import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../../../models/tasks.models";

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
   @Input() task!: Task
   @Output() deleteTaskEvent = new EventEmitter<string>()


  constructor() {
  }

  ngOnInit(): void {
  }

  deleteTask() {
     this.deleteTaskEvent.emit(this.task.id)
  }


}
