const userTypes = {
    // Redux saga
    EMAIL_SIGN_IN_START: 'EMAIL_SIGN_IN_START',
    EMAIL_SIGN_IN_SUCCESS: 'EMAIL_SIGN_IN_SUCCESS',
    CHECK_USER_SESSION: 'CHECK_USER_SESSION',

    // Redux thunk
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
    SING_IN_ERROR: 'SIGN_IN_ERROR',
    SIGN_UP_ERROR: 'SIGN_UP_ERROR',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    RESET_EMAIL_SUCCESS: 'SIGN_UP_EMAIL_SUCCESS',
    RESET_EMAIL_ERROR: 'SIGN_UP_EMAIL_ERROR',
    SIGN_IN_WITH_GOOGLE_SUCCESS: 'SIGN_IN_WITH_GOOGLE_SUCCESS',
    SIGN_IN_WITH_GOOGLE_ERROR: 'SIGN_IN_WITH_GOOGLE_ERROR'
};

export default userTypes;