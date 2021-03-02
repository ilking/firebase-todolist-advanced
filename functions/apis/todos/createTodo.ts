import { Request, Response } from 'express';
import { db } from '../../admin/admin';

export const createTodo = async (request: Request, response: Response) => {
  if (request.body.body.trim() === '') {
    return response.status(400).json({ body: 'Must not be empty' });
  }

  if (request.body.title.trim() === '') {
    return response.status(400).json({ title: 'Must not be empty' });
  }

  const newItem = {
    title: request.body.title,
    body: request.body.body,
    createdAt: new Date().toISOString(),
    username: request.body.user.username,
  };

  try {
    const { id } = await db.collection('todos').add(newItem);

    return response.json({ ...newItem, id });
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: err.message });
  }
};
