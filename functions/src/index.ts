import * as functions from 'firebase-functions';
import { getAllTodos, createTodo, deleteTodo, editTodo } from '../apis';
import express from 'express';

const app = express();
app.get('/todos', getAllTodos);
app.post('/todos', createTodo);
app.delete('/todo/:todoId', deleteTodo);
app.put('/todo/:todoId', editTodo);

export const api = functions.https.onRequest(app);
