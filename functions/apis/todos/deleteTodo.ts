import { Request, Response } from 'express';
import { db } from '../admin/admin';

export const deleteTodo = async (request: Request, response: Response) => {
  try {
    const document = await db.doc(`/todos/${request.params.todoId}`).get();

    if (!document.exists) {
      return response.status(400).json({ error: 'Todo not found' });
    }

    await db.doc(`/todos/${request.params.todoId}`).delete();

    return response.json({ message: 'Successfully deleted' });
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: err.message });
  }
};
