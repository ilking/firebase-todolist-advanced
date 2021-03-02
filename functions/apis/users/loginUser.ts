import { Request, Response } from 'express';
import { usersApp } from '../../admin/admin';
import { validateLoginData } from '../../validators';

export const loginUser = async (request: Request, response: Response) => {
  const user = {
    email: request.body.email,
    password: request.body.password,
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) {
    return response.status(400).json(errors);
  }

  try {
    const signinData = await usersApp.auth().signInWithEmailAndPassword(user.email, user.password);

    if (!signinData || !signinData.user) {
      return response.status(403).json({ general: 'Faied to authenticate' });
    }

    const idToken = await signinData.user.getIdToken();

    return response.json({ idToken });
  } catch (err) {
    console.error(err);

    return response.status(403).json({ general: 'Wrong credentials. Please try again!' });
  }
};
