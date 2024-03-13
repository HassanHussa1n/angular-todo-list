import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  private todoList: Todo[] = [
    {
      id: this.todoId++,
      title: 'serve the app',
      completed: true,
    },
    {
      id: this.todoId++,
      title: 'familiarise yourself with the codebase',
      completed: false,
    },
    {
      id: this.todoId++,
      title: 'start talking to the api',
      completed: false,
    },
  ];
   
  http = inject(HttpClient)

  
  //Value goes here:
  // TODO replace with a get request
  get todos(): Promise<Todo[]> {
    
    const result = firstValueFrom(this.http.get(`${environment.apiUrl}/hassanhussa1n/todo`))
    console.log(result)
    // @ts-ignore
    return result
    
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(this.http.post(`${environment.apiUrl}/hassanhussa1n/todo`, { title: title}));
    console.log(todo)
    // @ts-ignore
    return todo;
  }

  async updateTodo(id: number): Promise<Todo> {   
    const todo = await firstValueFrom(this.http.get<Todo>(`${environment.apiUrl}/hassanhussa1n/todo/${id}`));
    const updatedTodo = { ...todo, completed: !todo.completed };
    const updatedTodoResponse = await firstValueFrom(this.http.put<Todo>(`${environment.apiUrl}/hassanhussa1n/todo/${id}`, updatedTodo));
    return updatedTodoResponse;

  }

 
  
}