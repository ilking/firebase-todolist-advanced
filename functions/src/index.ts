import * as functions from 'firebase-functions';
import { getAllTodos, createTodo, deleteTodo, editTodo } from '../apis/todos';
import { loginUser } from '../apis/users';
import express from 'express';

const app = express();
app.get('/todos', getAllTodos);
app.post('/todos', createTodo);
app.delete('/todo/:todoId', deleteTodo);
app.put('/todo/:todoId', editTodo);

app.post('/login', loginUser);

export const api = functions.https.onRequest(app);
