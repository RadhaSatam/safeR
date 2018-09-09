import firebase from "firebase";

var config = {
    apiKey: "AIzaSyAPBZ3Ouh-ReYdU6tYdmKt5tAi27X98_uo",
    authDomain: "saferzone-1536415964354.firebaseapp.com",
    databaseURL: "https://saferzone-1536415964354.firebaseio.com",
    storageBucket: "saferzone-1536415964354.appspot.com",
  };

firebase.initializeApp(config);

export const firebaseDb = firebase.database();