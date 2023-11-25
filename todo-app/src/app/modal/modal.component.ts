import { Component, Input, Output, EventEmitter } from '@angular/core'
import { STATUS, STATUSES } from 'enums'
import { FormBuilder } from '@angular/forms'
import { ITodo } from 'interfaces/ITodo'
import { v4 } from 'uuid'
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  constructor(
    private formBuilder: FormBuilder,
  ) {
  }
  ngOnInit() {
    console.log('123', this.editItem)
    if (this.editItem) {
      const editValue = JSON.parse(JSON.stringify(this.editItem)) as Omit<ITodo, 'id'> & { id?: string }
      delete editValue.id
      this.form.setValue({ ...editValue, date: `${this.editItem.date.getFullYear()}-${this.editItem.date.getMonth() + 1}-${this.editItem.date.getDate()}` })
    }
  }
  form = this.formBuilder.group<Omit<ITodo, 'date' | 'id'> & { date: string }>({
    title: '',
    description: '',
    date: '',
    status: STATUS.COMPLETE
  })
  onSubmit = () => {
    const { title, description, date, status } = this.form.value
    if (!title || !description || !date || !status) {
      return
    }
    this.addTodo({ id: v4(), title, description, date: new Date(date), status })
  }
  addTodo(todo: ITodo) {
    this.newItemEvent.emit({ ...todo, id: this.editItem ? this.editItem.id : todo.id })
  }
  @Output() newItemEvent = new EventEmitter<ITodo>();
  statuses = STATUSES
  @Input() name: string = ''
  @Input() editItem?: ITodo
}
