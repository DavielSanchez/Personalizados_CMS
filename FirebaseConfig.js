import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAJfJG5DUfwUBF5EdNMsOkrwfIJ6uPejm0",
    authDomain: "personalizados-api.firebaseapp.com",
    projectId: "personalizados-api",
    storageBucket: "personalizados-api.appspot.com",
    messagingSenderId: "290418531981",
    appId: "1:290418531981:web:6ca73aa2bc005b74298cc4",
    measurementId: "G-1RZHZE2KNH"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };