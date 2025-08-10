import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {

  @Input() todo : Todo | undefined
  @Output() todoDelete: EventEmitter<Todo>=new EventEmitter();
  @Output() todoStatusChange: EventEmitter<Todo> = new EventEmitter();

  constructor(){

  }

  onClick(todoitem:Todo | undefined){
    this.todoDelete.emit(todoitem);
    console.log("Delete button clicked for todo:", todoitem?.active);
    
  }

  checkBoxClick(todoitem: Todo | undefined){
      this.todoStatusChange.emit(todoitem);
      console.log("Checkbox clicked for todo:", todoitem?.active);
  }

}
