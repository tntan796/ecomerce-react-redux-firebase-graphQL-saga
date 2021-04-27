import firebase from 'firebase';
import { firebaseConfig } from './config';
import 'firebase/firestore';
import 'firebase/auth';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);



export const handlUserProfile = async(userAuth, additionalData) => {
    if (!userAuth) return;
    const {uid} = userAuth;
    const userRef = firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const {displayName, email} = userAuth;
        const timestamp = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdDate: timestamp,
                ...additionalData
            })
        } catch (error) {
            console.log(error);
        }
    }
    return userRef;
};
