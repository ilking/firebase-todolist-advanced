import { Request, Response, NextFunction } from 'express';
import { adminApp, db } from './admin';

export const auth = async (request: Request, response: Response, next: NextFunction) => {
  if (!request.headers.authorization || !request.headers.authorization.startsWith('Bearer ')) {
    console.error('No token found');

    return response.status(403).json({ error: 'Unauthorized' });
  }

  const idToken = request.headers.authorization.split('Bearer ')[1];

  try {
    const decodedToken = await adminApp.auth().verifyIdToken(idToken);
    request.body.user = decodedToken;

    const userDocs = await db.collection('users').where('userId', '==', request.body.user.uid).limit(1).get();
    request.body.user = {
      ...request.body.user,
      username: userDocs.docs[0].data().username,
    };

    return next();
  } catch (err) {
    console.error('Error while verifying token: ', err);

    return response.status(403).json(err);
  }
};
