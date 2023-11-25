import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ITodo } from 'interfaces/ITodo'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  add = () => {
    this.isAdd = !this.isAdd
  }
  isAdd = false;
  isEdit?: ITodo
  title = 'todo-app';
  todoList: ITodo[] = []

  addItem(newItem: ITodo) {
    const index = this.todoList.findIndex(o => o.id === newItem.id)
    if (index !== -1) {
      this.todoList.splice(index, 1,newItem)
    } else {
      this.todoList.push(newItem)
    }
    this.isAdd = false
    this.isEdit = undefined
  }

  editItem(todo: ITodo) {
    this.isEdit = todo

  }
}
