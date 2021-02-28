import { Request, Response } from 'express';
import { db } from '../admin/admin';
import { TodoItem } from './index';

export const getAllTodos = async (request: Request, response: Response) => {
  const todoDocs = await db.collection('todos').orderBy('createdAt', 'desc').get();

  const todos = todoDocs.docs.reduce((allTodos: TodoItem[], doc) => {
    allTodos.push({
      todoId: doc.id,
      title: doc.data().title,
      body: doc.data().body,
      createdAt: new Date(doc.data().createdAt),
      completed: doc.data().completed,
    });
    return allTodos;
  }, []);

  return response.json(todos);
};
