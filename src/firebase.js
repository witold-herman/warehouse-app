import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyAGZh14VInEwvwe1sllKbCYB-Z6-Xnk2UQ",
    authDomain: "warehouse-app-d9e48.firebaseapp.com",
    databaseURL: "https://warehouse-app-d9e48.firebaseio.com",
    projectId: "warehouse-app-d9e48",
    storageBucket: "warehouse-app-d9e48.appspot.com",
    messagingSenderId: "732502645834",
    appId: "1:732502645834:web:765306616935e1f50e5ab3"

});

export {firebaseConfig as firebase};
