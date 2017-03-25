export default function auth() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Ryan',
        avatar: 'https://static.giantbomb.com/uploads/original/4/42381/1196379-gas_mask_respirator.jpg',
        uid: 'Ryan'
      });
    }, 2000)
  });
}

export function logout () {
  console.log('logged out');
}
export function checkIfAuthed(store) {
  return store.getState().isAuthed
}
