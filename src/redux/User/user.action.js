import userTypes from './user.types';
import { auth, handlUserProfile, signInWithGoogle } from '../../firebase/ultils';

// Redux Saga
export const emailSignInStart = userCredential => ({
    type: userTypes.EMAIL_SIGN_IN_START,
    payload: userCredential
});

export const emailSignInSuccess = user => ({
    type: userTypes.EMAIL_SIGN_IN_SUCCESS,
    payload: user
});



export const checkUserSession = () => ({
    type: userTypes.CHECK_USER_SESSION,
})



// Redux thunk
export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
});

const signInSuccess = {
    type: userTypes.SIGN_IN_SUCCESS,
    payload: true
};

const singInError = error => ({
    type: userTypes.SING_IN_ERROR,
    payload: [error.message]
});


export const signInUser = ({ email, password }) => async dispatch => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        dispatch(signInSuccess);
    } catch (error) {
        dispatch(singInError(error));
    }
}

const signUpSuccess = {
    type: userTypes.SIGN_UP_SUCCESS,
    payload: true
}

const signUpError = error => ({
    type: userTypes.SIGN_UP_ERROR,
    payload: [error.message]
});

export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        if (password !== confirmPassword) {
            const err = ['Pass word dont\' match'];
            dispatch(signUpError({message: err}));
            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await handlUserProfile(user, { displayName });
            dispatch(signUpSuccess);
        } catch (error) {
            dispatch(signUpError(error));
        }
    } catch (error) {
        dispatch(signUpError(error));
    }
}


const resetEmailSuccess = {
    type: userTypes.RESET_EMAIL_SUCCESS,
    payload: true
}

const resetEmailError = error => ({
    type: userTypes.RESET_EMAIL_ERROR,
    payload: [error.message]
});

export const resetEmail = ({email}) => async dispatch => {
    try {
        const config = {
            url: 'http://localhost:3000/login'
        }
        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                dispatch(resetEmailSuccess);
            })
            .catch(error => {
                dispatch(resetEmailError(error));
            });
    } catch (error) {
        dispatch(resetEmailError(error));
    }
}

const signInWithGoogleSuccess = {
    type: userTypes.SIGN_IN_WITH_GOOGLE_SUCCESS,
    payload: true
}

const signInWithGoogleError = error => ({
    type: userTypes.SIGN_IN_WITH_GOOGLE_ERROR,
    payload: [error.message]
})

export const signInWithGoogleRequest = () => async dispatch => {
    try {
        await signInWithGoogle().then(() => {
            dispatch(signInWithGoogleSuccess)
        })
        .catch(error => {
            dispatch(signInWithGoogleError(error))
        });
    } catch (error) {
        dispatch(signInWithGoogleError(error))
    }
}