import admin from 'firebase-admin';
import firebase from 'firebase';
import { firebaseConfig, fireusersConfig } from './config';

const adminApp = admin.initializeApp(firebaseConfig);
const usersApp = firebase.initializeApp(fireusersConfig);

const db = admin.firestore();

export { adminApp, db, usersApp };
