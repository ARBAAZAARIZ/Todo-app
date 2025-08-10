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
    try {
      const storedTodos = localStorage.getItem("todos");
      this.todos = storedTodos ? JSON.parse(storedTodos) as Todo[] : [];
      console.log("Loaded todos from localStorage:", this.todos);
    } catch (error) {
      console.error("Error parsing todos from localStorage:", error);
      this.todos = [];
    }
  }

  deleteTodo(todo: Todo) {
    console.log("Delete request received for todo:", todo);

    this.todos = this.todos.filter(t => t.sno !== todo.sno);
    this.saveTodos();
    console.log("Todo deleted. Updated list:", this.todos);
  }

  addTodo(todo: Todo) {
    console.log("Add request received for todo:", todo);

    if (todo != null) {
      console.log("Todo is not null");

      if (typeof todo.title === 'string') {
        console.log("Title is a string:", todo.title);
      } else {
        console.warn("Title is not a string:", todo.title);
      }

      if (typeof todo.desc === 'string') {
        console.log("Description is a string:", todo.desc);
      } else {
        console.warn("Description is not a string:", todo.desc);
      }

      if (todo.title && todo.title.trim()) {
        console.log("Title is valid and not empty:", todo.title.trim());
      } else {
        console.warn("Title is empty or invalid");
      }

      if (todo.desc && todo.desc.trim()) {
        console.log("Description is valid and not empty:", todo.desc.trim());
      } else {
        console.warn("Description is empty or invalid");
      }

      if (
        typeof todo.title === 'string' &&
        typeof todo.desc === 'string' &&
        todo.title.trim() &&
        todo.desc.trim()
      ) {
        this.todos.push(todo);
        console.log("Todo added successfully:", todo);
        this.saveTodos();
        console.log("Todos saved to localStorage:", this.todos);
      } else {
        console.error("Todo object failed validation. Not added.");
      }

    } else {
      console.error("Todo object is null. Cannot add.");
    }
  }

  changeTodoStatus(todo: Todo) {
    console.log("Status change requested for todo:", todo);

    const todoObj = this.todos.find(t => t.sno === todo.sno);
    if (todoObj) {
      todoObj.active = !todoObj.active;
      console.log("Todo status toggled:", todoObj);
      this.saveTodos();
    } else {
      console.warn("Todo not found for status change:", todo);
    }
  }

  private saveTodos() {
    try {
      localStorage.setItem("todos", JSON.stringify(this.todos));
      console.log("Todos successfully saved to localStorage.");
    } catch (error) {
      console.error("Error saving todos to localStorage:", error);
    }
  }
}
