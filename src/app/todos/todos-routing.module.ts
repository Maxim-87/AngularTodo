import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TodosComponent} from "./components/todos.component";


const routes: Routes = [{path: '', component: TodosComponent, pathMatch: "full"}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {}
