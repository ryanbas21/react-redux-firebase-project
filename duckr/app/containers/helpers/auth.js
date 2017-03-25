import firebase from 'firebase';
import { ref, firebaseAuth } from 'config/constants';

export default function auth() {
  return firebaseAuth().signInWithPopup(
    new firebase.auth.FacebookAuthProvider()
  );
}

export function logout () {
  return firebaseAuth().signInWithPopup(
    new firebase.signout()
  )
}
export function checkIfAuthed(store) {
  return store.getState().isAuthed
}

export function saveUser(user) {
  return ref.child(`users/${user.uid}`) //ref is our root url, child is nesting itself in the database
    .set(user).then(() => user);

}
