import firebase from 'firebase';

try {
  var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET,
  };

  firebase.initializeApp(config);
  console.log('firebase connection established');
} catch (e) {
	console.log('firebase connection error: ', e);
}


export var firebaseRef = firebase.database().ref();
export default firebase;
