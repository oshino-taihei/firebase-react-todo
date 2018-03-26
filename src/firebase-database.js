import firebase from 'firebase'
import { firebaseConfig } from './firebase-config';

export const app = firebase.initializeApp(firebaseConfig);
export const database = app.database();
