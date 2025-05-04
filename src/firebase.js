import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyApGghndeO82pXS3zHw4La6ZVg-O7MLbc4",
  authDomain: "e-commerce-55c84.firebaseapp.com",
  projectId: "e-commerce-55c84",
  storageBucket: "e-commerce-55c84.firebasestorage.app",
  messagingSenderId: "180805273299",
  appId: "1:180805273299:web:c7ae6a4a40aa3df0703626"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user; 
    await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: name,
        email: email,
        authProvider:"local",
        });
 } catch (error) {
    console.error("Error signing up:", error);
    alert(error.message);
  }
};

const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error logging in:", error);
    alert(error.message);
  }
}   

const logout = () => {
  signOut(auth);
};

export { auth, db, signup, login, logout };