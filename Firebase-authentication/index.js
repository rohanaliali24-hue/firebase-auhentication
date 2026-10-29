// import {signupHandler} from './firebase.js'

// let email = document.querySelector('email')
// let password = document.querySelector('password')
// let signupbtn = document.querySelector('signup')



// signupbtn.addEventListener('click',()=>{
//   // console.log('button click howaa')
//   signupHandler(email.value,password.value)
// });



console.log("Javascript has been loaded");
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyAgnZRfL04dJYUPp6wetOST0pSCIy4Uz6k",
  authDomain: "fir-auth-7e8b3.firebaseapp.com",
  projectId: "fir-auth-7e8b3",
  storageBucket: "fir-auth-7e8b3.firebasestorage.app",
  messagingSenderId: "193065646654",
  appId: "1:193065646654:web:ec2913718a02cdfc1d2f6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
let isAuthenticating = false;

onAuthStateChanged(auth, (user) => {
  if (isAuthenticating) {
    return;
  }

  if (user) {
    if (window.location.pathname !== "/dashboard.html") {
      window.location.href = "dashboard.html";
    }
  } else {
    console.log("User is signed out");
    if (window.location.pathname === "/dashboard.html") {
      window.location.href = "login.html";
    }
  }
});

const login = async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        console.log("Login successful:", userCredential.user.email);

        window.location.href = "dashboard.html";

    } catch (error) {
        console.error("Login Error:", error.code, error.message);
        alert(error.message);
    }
};

const register = (e) => {
  e.preventDefault();
  isAuthenticating = true;

  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: "",
        phone: "",
        uid: user.uid,
      });

      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    })
    .finally(() => {
      isAuthenticating = false;
    });
};

const logout = () => {
  signOut(auth);
};

document.getElementById("login-form")?.addEventListener("submit", login);
document.getElementById("register-form")?.addEventListener("submit", register);
document.getElementById("logout")?.addEventListener("click", logout);

console.log("Javascript has been loaded");