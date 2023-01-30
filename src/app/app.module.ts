import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { LoginComponent } from './auth/components/login/login.component';
import { CoreComponent } from './core/core.component';
import { TodosComponent } from './todos/components/todos.component';
import { SharedComponent } from './shared/shared.component';
import {AuthModule} from "./auth/auth.module";
import {TodosModule} from "./todos/todos.module";
import { CoreModule } from './core/core.module';
import { HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoreComponent,
    TodosComponent,
    SharedComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, AuthModule, TodosModule, CoreModule, HttpClientModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
