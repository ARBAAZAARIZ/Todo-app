import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {

  title: string = '';
  desc: string = '';


  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();

  onSubmit() {
    if (this.title.trim() && this.desc.trim()) {
      const todo: Todo = {
        sno: Date.now(),
        title: this.title.trim(),
        desc: this.desc.trim(),
        active: true
      };
      this.todoAdd.emit(todo);
    } else {
      console.error("Invalid todo: title or description missing");
    }
  }


}
