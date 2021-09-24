import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyAMmXUYy2NV7mJTXJAkKpflVZvhWaYNNiY",
  authDomain: "creator-fes-2021-vote.firebaseapp.com",
  databaseURL: "https://creator-fes-2021-vote-default-rtdb.firebaseio.com",
  projectId: "creator-fes-2021-vote",
  storageBucket: "creator-fes-2021-vote.appspot.com",
  messagingSenderId: "829880593445",
  appId: "1:829880593445:web:118f7ec96c506bae6863cc"
};

export const app = firebase.initializeApp(firebaseConfig);
export const db = getDatabase();
