import { Request, Response } from 'express';
import { TodoItem } from '.';
import { db } from '../../admin/admin';

export const editTodo = async (request: Request, response: Response) => {
  if (request.body.todoId || request.body.createdAt) {
    response.status(403).json({ message: 'not allowed to edit ID or createdAt' });
  }

  try {
    const savedTodo = await db.doc(`/todos/${request.params.todoId}`).get();

    if (!savedTodo || !savedTodo.exists || !savedTodo.data()) {
      return response.status(400).json({ error: 'Todo not found' });
    }

    const updatedTodo: TodoItem = {
      todoId: savedTodo.data()!.todoId,
      createdAt: savedTodo.data()!.createdAt,
      title: request.body.title || savedTodo.data()!.title,
      body: request.body.body || savedTodo.data()!.body,
      completed: request.body.completed || savedTodo.data()!.completed,
    };

    await db.collection('todos').doc(`${request.params.todoId}`).update(updatedTodo);

    return response.status(200).json({ message: 'Updated' });
  } catch (err) {
    console.error(err);
    return response.status(500).json({ message: err.msg });
  }
};
