// Import the functions you need from the SDKs you need
//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js";
//import { getAnalytics } from "firebase/analytics";
//import { getFirestore, collection } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore-compat.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHSnODhZAlcuaEmOdrHgHt6s4wz1wc5pQ",
  authDomain: "restaurant-pos-47810.firebaseapp.com",
  projectId: "restaurant-pos-47810",
  storageBucket: "restaurant-pos-47810.appspot.com",
  messagingSenderId: "509910814482",
  appId: "1:509910814482:web:bedfe4bd55b264a4de2dcb",
  measurementId: "G-E4GN1V1HBK"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = app.firestore();
const tablesCol = db.collection('tableReservations');

const form = document.querySelector('#reservation-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  tablesCol.add({
    name: form.name.value,
    phoneNo: form.number.value,
    tableNo: form.tableNo.value,
    date: form.date.value,
    message: form.msg.value
  });
  form.name.value = '';
  form.number.value = '';
  form.tableNo.value = '';
  form.date.value = '';
  form.msg.value = '';
})