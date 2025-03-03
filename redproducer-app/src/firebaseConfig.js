// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBydOm4TxYyFD87oSCxN0mbjsxT-bhjMOQ",
  authDomain: "redproduce-app.firebaseapp.com",
  projectId: "redproduce-app",
  storageBucket: "redproduce-app.appspot.com", 
  messagingSenderId: "945822873251",
  appId: "1:945822873251:web:55081419b54178f223f116"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
