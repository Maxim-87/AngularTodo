import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TodosComponent} from "./components/todos.component";
import {AuthGuard} from "../core/guard/auth.guard";


const routes: Routes = [{path: '', component: TodosComponent, pathMatch: "full", canActivate: [AuthGuard]}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {}
