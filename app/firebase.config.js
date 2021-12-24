// Your web app's Firebase configuration
let id;

if (process.env.NODE_ENV === 'development') {
  id = 'demo-remix-blog-10685';
} else {
  id = 'remix-blog-10685';
}

export const firebaseConfig = {
  apiKey: 'AIzaSyCd3FosGAPPHFX1lLYoXciB5t5PN8ec9kg',
  authDomain: 'remix-blog-10685.firebaseapp.com',
  projectId: id,
  storageBucket: 'remix-blog-10685.appspot.com',
  messagingSenderId: '631701105591',
  appId: '1:631701105591:web:27c60d4440532495cf9632',
};
