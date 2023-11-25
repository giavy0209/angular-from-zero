import { STATUS } from "enums"

export interface ITodo {
  id: string,
  title: string
  description: string
  date: Date
  status: STATUS
}