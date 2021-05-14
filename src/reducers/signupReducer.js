const initialState = {
    passwordError: false,
    passwordLengthError: false,
    usernameTakenError: false
};

const signupReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case "SET_PASSWORD_ERROR":
            return {...state, passwordError: payload.error};
        case "SET_PASSWORD_LENGTH_ERROR":
            return {...state, passwordLengthError: payload.error};
        case "SET_USERNAME_TAKEN_ERROR":
            return {...state, usernameTakenError: payload.error};
        case "CLEAR_SIGNUP_ERRORS":
            return initialState;
        default:
            return state;
    }
}

export default signupReducer;