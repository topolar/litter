// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged, NextOrObserver
} from 'firebase/auth';
import {User} from "@firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBu1Iu9a6p3gt3RNifW-LLyaKewxeUH80U",
	authDomain: "litter-app-ade72.firebaseapp.com",
	projectId: "litter-app-ade72",
	storageBucket: "litter-app-ade72.appspot.com",
	messagingSenderId: "807623703962",
	appId: "1:807623703962:web:98b7ee8cb92bc77d03ce23"
};

const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account',});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const onAuthStateChangedListener = (callback:NextOrObserver<User>) => onAuthStateChanged(auth, callback);