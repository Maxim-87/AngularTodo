import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../enviroments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) {
  }
  getTodos() {
    this.http.get(`${environment.baseURL}/todo-lists`).subscribe(
      res => {
        debugger
      }
    )
  }
}
