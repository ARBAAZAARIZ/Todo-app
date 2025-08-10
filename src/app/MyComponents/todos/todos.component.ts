import { Component } from '@angular/core';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {

  todos: Todo[] | undefined;

  constructor() {
    this.todos = []
    const storedTodos = localStorage.getItem("todos");
    this.todos = storedTodos ? JSON.parse(storedTodos) as Todo[] : undefined;


  }

  deleteTodo(todo: Todo | undefined) {
    console.log("Delete request received for todo:", todo);

    if (todo && this.todos) {
      this.todos = this.todos.filter(t => t.sno !== todo.sno);
    }
    localStorage.setItem("todos", JSON.stringify(this.todos));

    const storedTodos = localStorage.getItem("todos");
    this.todos = storedTodos ? JSON.parse(storedTodos) as Todo[] : undefined;

    console.log(todo);

  }

  addTodo(todo: Todo) {
    console.log("Add request received for todo:", todo);

    if (todo && this.todos) {
      todo.sno = this.todos.length + 1; // Assign a new sno based on the current length
      this.todos.push(todo);
      console.log("Todo added:", this.todos);
      localStorage.setItem("todos", JSON.stringify(this.todos));

      const storedTodos = localStorage.getItem("todos");
      this.todos = storedTodos ? JSON.parse(storedTodos) as Todo[] : undefined;
    } else {
      console.error("Invalid todo object received for addition.");
    }

  }

  changeTodoStatus(todo : Todo){

    if(todo && this.todos){
      const todoObj = this.todos.find(t => todo===t);
      if(todoObj){
        todoObj.active = !todoObj.active; // Toggle the active status
        console.log("Todo status changed:", todoObj);
        localStorage.setItem("todos", JSON.stringify(this.todos));

        const storedTodos = localStorage.getItem("todos");
        this.todos = storedTodos ? JSON.parse(storedTodos) as Todo[] : undefined;
      }
    }


  }



}
