import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {}

  todos = this.todoService.todos;
  filteredTodos: Todo[] = [];
  showCompleted = false;

  async ngOnInit() {
    await this.loadTodos();
  }

  async loadTodos() {
    const todos = await this.todoService.todos;
    this.filteredTodos = todos.filter(todo => !todo.completed || this.showCompleted);
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo.id).then(() => {
      this.loadTodos(); 
    });
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    await this.loadTodos(); 
  }

  toggleCompleted() {
    this.showCompleted = !this.showCompleted;
    this.loadTodos();
  }
}
