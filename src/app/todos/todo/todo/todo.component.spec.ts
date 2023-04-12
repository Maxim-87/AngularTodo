import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { TodoComponent } from './todo.component';
import {TasksComponent} from "./tasks/tasks.component";
import {TodoFiltersComponent} from "./todo-filters/todo-filters.component";
import {TodoFooterComponent} from "./todo-footer/todo-footer.component";

describe('TodoComponent', () => {
  let fixture: ComponentFixture<TodoComponent>;
  let component: TodoComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        CommonModule,
        FormsModule,
      ],
      declarations: [TodoComponent,
        TasksComponent,
        TodoFiltersComponent,
      TodoFooterComponent
      ],
      providers: [ ],
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    component.todo = {
      id: '1',
      title: 'test',
      addedDate: '21',
      order: 1,
      filter: "active",
    };
    fixture.detectChanges();
  })

   it('should create the todo component', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteTodoHandler when clicked', fakeAsync(() => {
    spyOn(component, 'deleteTodoHandler');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    tick();

    expect(component.deleteTodoHandler).toHaveBeenCalled();
  }));

  it('should call changeTodoHandler when clicked', fakeAsync(() => {
    spyOn(component, 'changeTodoHandler');

    let button = fixture.debugElement.nativeElement.querySelector('#changeTodo');
    button.click();

    tick();

    expect(component.changeTodoHandler).toHaveBeenCalled();
  }));

});
