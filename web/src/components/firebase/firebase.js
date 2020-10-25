import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    this.serverValue = app.database.ServerValue;
  }
  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);
  questions = () => this.db.ref('questions');
  question = (id) => this.db.ref(`questions/${id}`);
  admins = () => this.db.ref('admin');
  admin = (id) => this.db.ref(`admin/${id}`);
  users = () => this.db.ref('user');
  user = (id) => this.db.ref(`user/${id}`);
  courses = () => this.db.ref('courses');
  course = (id) => this.db.ref(`courses/${id}`);
}

export default Firebase;
