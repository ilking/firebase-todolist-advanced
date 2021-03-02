import { Request, Response } from 'express';
import { validateSignupData } from '../../validators';
import { db } from '../../admin/admin';
import { usersApp } from '../../admin/admin';

export const signupUser = async (request: Request, response: Response) => {
  const newUser = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    phoneNumber: request.body.phoneNumber,
    country: request.body.country,
    username: request.body.username,
  };

  const passwordCreds = { password: request.body.password, confirmPassword: request.body.confirmPassword };

  const { valid, errors } = validateSignupData({ ...newUser, ...passwordCreds });

  if (!valid) {
    return response.status(400).json(errors);
  }

  try {
    const userExists = await db.doc(`/users/${newUser.username}`).get();

    if (!userExists) {
      return response.status(400).json({ username: 'this username is already taken' });
    }

    const createdUser = await usersApp.auth().createUserWithEmailAndPassword(newUser.email, passwordCreds.password);

    if (!createdUser || !createdUser.user) {
      return response.status(400).json({ general: 'Something happened. Try again!' });
    }

    const userId = createdUser.user.uid;
    const idToken = await createdUser.user.getIdToken();

    await db.doc(`/users/${newUser.username}`).set({ ...newUser, userId, createdAt: new Date().toISOString() });

    return response.status(201).json({ idToken });
  } catch (err) {
    console.error(err);

    if (err.code === 'auth/email-already-in-use') {
      return response.status(400).json({ email: 'Email already in use' });
    }

    return response.status(500).json({ general: 'Something we wrong, please try again' });
  }
};
