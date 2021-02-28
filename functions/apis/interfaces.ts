export interface TodoItem {
  todoId: string;
  title: string;
  body: string;
  createdAt: Date;
  completed?: Date;
}
