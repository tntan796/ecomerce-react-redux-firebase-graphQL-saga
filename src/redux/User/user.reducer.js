import userTypes from './user.types';


const initialState = {
    currentUser: null,
    signInSuccess: false,
    signInError: [],
    signUpSuccess: false,
    signUpError: [],
    resetEmailSuccess: false,
    resetEmailError: [],
    signInWithGoogleSuccess: false,
    signInWithGoogleError: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userTypes.SET_CURRENT_USER:
            return { ...state, currentUser: action.payload };
        case userTypes.SIGN_IN_SUCCESS:
            return { ...state, signInSuccess: action.payload };
        case userTypes.EMAIL_SIGN_IN_SUCCESS:
            return { ...state, currentUser: action.payload };
        case userTypes.SING_IN_ERROR:
            return { ...state, signInError: action.payload };
        case userTypes.SIGN_UP_ERROR:
            return { ...state, signUpError: action.payload };
        case userTypes.SIGN_UP_SUCCESS:
            return { ...state, signUpSuccess: action.payload }
        case userTypes.SET_CURRENT_USER:
            return { ...state, currentUser: action.payload };
        case userTypes.RESET_EMAIL_SUCCESS:
            return { ...state, resetEmailSuccess: action.payload };
        case userTypes.RESET_EMAIL_ERROR:
            return { ...state, resetEmailError: action.payload };
        case userTypes.SIGN_IN_WITH_GOOGLE_SUCCESS:
            return { ...state, signInWithGoogleSuccess: action.payload };
        case userTypes.SIGN_IN_WITH_GOOGLE_ERROR:
            return { ...state, signInWithGoogleError: action.payload };
        default:
            return { ...state };
    }
}

export default userReducer;