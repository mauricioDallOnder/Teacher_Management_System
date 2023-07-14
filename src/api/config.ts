import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"; // Adicione esta linha

const firebaseConfig = {
  apiKey: "AIzaSyCyrZMzw1_25-_62oo0Hy-5N1ZL2zpTOtY",
  authDomain: "profs-database.firebaseapp.com",
  databaseURL: "https://profs-database-default-rtdb.firebaseio.com",
  projectId: "profs-database",
  storageBucket: "profs-database.appspot.com",
  messagingSenderId: "308952300207",
  appId: "1:308952300207:web:8a2811f7b8aab71c58f25a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
