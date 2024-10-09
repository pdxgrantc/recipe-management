import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDe4VkR2k0A_Q2cgdYfY3v8ItUWiNCtIig",
    authDomain: "recipes-892b3.firebaseapp.com",
    projectId: "recipes-892b3",
    storageBucket: "recipes-892b3.appspot.com",
    messagingSenderId: "721563538878",
    appId: "1:721563538878:web:210e1b54294e6a1963d5ef",
    measurementId: "G-J28R5CXYHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Items For Export
const auth = getAuth(app);
const db = getFirestore(app);

// My Helper Functions For Export
const SignIn = async () => {
    console.log('signing in');

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const db = getFirestore();
        const userRef = doc(db, 'users', result.user.uid);
        const userDocSnap = await getDoc(userRef);

        if (!userDocSnap.exists()) {
            await setDoc(userRef, {
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                uid: result.user.uid,
                accountCreated: new Date(),
                userVersion: 1,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const SignOut = () => {
    signOut(auth);
}

export { auth, db, SignIn, SignOut };
