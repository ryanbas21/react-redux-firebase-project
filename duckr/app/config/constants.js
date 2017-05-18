import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCMFOHIPVmrFknefzhAXpldZJgCo81x1bI',
  authDomain: 'duckr-3b94e.firebaseapp.com',
  databaseURL: 'https://duckr-3b94e.firebaseio.com',
  storageBucket: 'duckr-3b94e.appspot.com',
  messagingSenderId: '465368802444'
};
firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
export const usersDucksExpirationLength = 1000000;
export const userExpirationLength = 1000000;
