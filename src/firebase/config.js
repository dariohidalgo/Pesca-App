import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpZ8wGHoSTThXKtLkRKILpakWyco1F0j8",
  authDomain: "pesca-app-cordoba-pro.firebaseapp.com",
  projectId: "pesca-app-cordoba-pro",
  storageBucket: "pesca-app-cordoba-pro.firebasestorage.app",
  messagingSenderId: "907542620530",
  appId: "1:907542620530:web:5d0b401cfa5ddc244ad5eb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
