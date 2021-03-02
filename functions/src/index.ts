import * as functions from 'firebase-functions';
import { getAllTodos, createTodo, deleteTodo, editTodo } from '../apis/todos';
import { loginUser, signupUser } from '../apis/users';
import express from 'express';
import { auth } from '../admin/auth';

const app = express();
app.get('/todos', auth, getAllTodos);
app.post('/todos', auth, createTodo);
app.delete('/todo/:todoId', auth, deleteTodo);
app.put('/todo/:todoId', auth, editTodo);

app.post('/login', loginUser);
app.post('/signup', signupUser);

export const api = functions.https.onRequest(app);
