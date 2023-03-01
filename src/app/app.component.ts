import {Component, OnInit} from '@angular/core';
import {AuthService} from "./core/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularTodo';

  constructor(private AuthService: AuthService) { }

  ngOnInit (): void {
    this.AuthService.me();
  }

}
