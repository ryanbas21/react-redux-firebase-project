export default function auth() {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve({
      name: 'Ryan',
      avatar: 'http://google.com/images',
      uid: 'Ryan'
      });
    },2000)
  });
}
