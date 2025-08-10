import { Component } from '@angular/core';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  todos: Todo[] = [];

  constructor() {
    const storedTodos = localStorage.getItem("todos");
    this.todos = storedTodos ? JSON.parse(storedTodos) as Todo[] : [];
  }

  deleteTodo(todo: Todo) {
    console.log("Delete request received for todo:", todo);

    this.todos = this.todos.filter(t => t.sno !== todo.sno);
    this.saveTodos();
  }

  addTodo(todo: Todo) {
    console.log("Add request received for todo:", todo);

    if (
      todo !=null 
    ) {
      this.todos.push(todo);
      console.log("Todo added:", this.todos);
      this.saveTodos();
    } else {
      console.error("Invalid todo object received for addition.");
    }
  }

  changeTodoStatus(todo: Todo) {
    const todoObj = this.todos.find(t => t.sno === todo.sno);
    if (todoObj) {
      todoObj.active = !todoObj.active;
      console.log("Todo status changed:", todoObj);
      this.saveTodos();
    }
  }

  private saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}
