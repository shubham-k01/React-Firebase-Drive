// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, FieldValue,collection ,serverTimestamp} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER,
    appId: process.env.REACT_APP_FIREBASE_APP
  };
// const firebaseConfig = {
//     apiKey: "AIzaSyA6u6plR_sejnkZD1kL6Z8UlLWVOLKL6AE",
//     authDomain: "react-drive-clone-bcdfe.firebaseapp.com",
//     projectId: "react-drive-clone-bcdfe",
//     storageBucket: "react-drive-clone-bcdfe.appspot.com",
//     messagingSenderId: "185852387521",
//     appId: "1:185852387521:web:ccf1a8ef3864a6bd957440"
//   };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireS = getFirestore(app);

export const database = {
  folders : collection(fireS,'folders'),
  files : collection(fireS,'files'),
  getCurrentTimeStamp: serverTimestamp,
  formatDoc :(dos) => {
    return {...dos.data(),id:dos.id}
  }
}

export const auth =getAuth(app);
export default app;