import userTypes from "./user.types";
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { emailSignInStart, emailSignInSuccess, signInUser } from './user.action';
import { auth, getCurrentUser, handlUserProfile } from "../../firebase/ultils";

export function* getSnapshotFromUserAuth(user) {
    try {
        const userRef = yield call(handlUserProfile, { userAuth: user });
        const snapshot = yield userRef.get();
        yield put(
            emailSignInSuccess({
                id: snapshot.id,
            ...snapshot.data()
            })
        );
    } catch (error) {

    }
}

export function* emailSignIn({ payload: { email, password } }) {
    console.log('email', email, ', password:', password);
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
        // dispatch(signInSuccess);
    } catch (error) {
        // dispatch(singInError(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);

}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export default function* userSagas() {
    yield all([call(onEmailSignInStart), call(onCheckUserSession)]);
}