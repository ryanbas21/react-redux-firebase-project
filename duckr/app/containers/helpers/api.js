import { ref } from '../../config/constants';

function saveToDucks(duck) {
  const duckId = ref.child('ducks').push().key;
  const duckPromise = ref.child(`ducks/${duckId}`).set({ ...duck, duckId });

  return {
    duckId,
    duckPromise
  };
}
export function listenToFeed(cb, errorCB) {
  ref.child('ducks').on(
    'value',
    snapshot => {
      const feed = snapshot.val() || {};
      const sortedIds = Object.keys(feed).sort((a, b) => feed[b].timestamp - feed[a].timestamp);
      cb({ feed, sortedIds });
    },
    errorCB
  );
}

function saveToUsersDucks(duck, duckId) {
  return ref.child(`usersDucks/${duck.uid}/${duckId}`).set({ ...duck, duckId });
}

function saveLikeCount(duckId) {
  return ref.child(`likeCount/${duckId}`).set(0);
}

export function saveDuck(duck) {
  const { duckId, duckPromise } = saveToDucks(duck);
  return Promise.all([
    duckPromise,
    saveLikeCount(duckId),
    saveToUsersDucks(duck, duckId)
  ]).then(() => ({ ...duck, duckId }));
}

export function fetchUsersLikes(uid) {
  return ref.child(`usersLikes/${uid}`).once('value').then(snapshot => snapshot.val() || {});
}

export function saveToUsersLikes(uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(true);
}
export function deleteFromUsersLikes(uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(null);
}
export function incrementNumberOfLikes(duckId) {
  return ref.child(`likeCount/${duckId}`).transaction((currentValue = 0) => currentValue + 1);
}
export function decrementNumberOfLikes(duckId) {
  return ref.child(`likeCount/${duckId}`).transaction((currentValue = 0) => currentValue - 1);
}

export function fetchUser(uid) {
  return ref.child(`users/${uid}`).once('value').then(snapshot => snapshot.val());
}
export const fetchUsersDucks = uid =>
  ref.child(`usersDucks/${uid}`).once('value').then(snapshot => snapshot.val() || {});
