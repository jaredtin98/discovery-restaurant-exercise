import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyAaXev8usTsz5uBrxdYFr4OwBn1pYCMGCM",
    authDomain: "bt3103-week-6-e5c93.firebaseapp.com",
    projectId: "bt3103-week-6-e5c93",
    storageBucket: "bt3103-week-6-e5c93.appspot.com",
    messagingSenderId: "555887471556",
    appId: "1:555887471556:web:f78ec057386c499af55291",
    measurementId: "G-2EEM2V6LK1"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;