// firebase.js (or whatever you named your Firebase configuration file)

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDhjOzUMn2YJ1Wgt8DDmDLYBGE6WYumzmw",
  authDomain: "test-2b2b0.firebaseapp.com",
  databaseURL: "https://test-2b2b0-default-rtdb.firebaseio.com",
  projectId: "test-2b2b0",
  storageBucket: "test-2b2b0.appspot.com",
  messagingSenderId: "343696759283",
  appId: "1:343696759283:web:b049e4293912f475125a86",
  measurementId: "G-B285ZSHFJY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
