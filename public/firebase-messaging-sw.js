// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js',
);

const firebaseConfig = {
  apiKey: 'AIzaSyB2MYfk6VJhWyRvRbK0JWv3yiFOoB5H96o',
  authDomain: 'logistics-smart-86cd4.firebaseapp.com',
  projectId: 'logistics-smart-86cd4',
  storageBucket: 'logistics-smart-86cd4.appspot.com',
  messagingSenderId: '345140081195',
  appId: '1:345140081195:web:259f59240c8bec9c85306e',
  measurementId: 'G-Z7EZ3CY049',
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  console.log(payload.data.data);

  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
