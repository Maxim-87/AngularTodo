import {Component, OnInit} from '@angular/core';
import {TodosService} from "../services/todos.service";

@Component({
  selector: 'tl-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit{
  constructor(private todosService: TodosService) {
  }
  ngOnInit(): void {
    this.todosService.getTodos()
  }
}
