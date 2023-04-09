import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {TodosComponent} from './todos.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import { TodosService } from '../services/todos.service';
import {CommonModule} from "@angular/common";

describe('TodosComponent', () => {
  let fixture: ComponentFixture<TodosComponent>;
  let component: TodosComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        CommonModule,
        FormsModule
      ],
      declarations: [TodosComponent],
      providers: [TodosComponent, TodosService,]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  })

   it('should create the todos component', () => {
    expect(component).toBeTruthy();
  });

  it('should have input element with add todo', () => {
    const element = fixture.debugElement.nativeElement.querySelector('input')
    expect(element).toBeTruthy();
  });

  it('should call createTodo when clicked', fakeAsync(() => {
    spyOn(component, 'createTodo');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    tick();

    expect(component.createTodo).toHaveBeenCalled();
  }));

  it('should have <h1> with "Angular todo"', () => {
    const element: HTMLElement = fixture.nativeElement;
    const h1 = element.querySelector('h1')!;
    expect(h1.textContent).toEqual('Angular todo');
  });

});
