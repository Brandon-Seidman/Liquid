const initialState = {
    userData: null
};

const userReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case "SET_USER":
            return {userData: payload.user};
        default:
            return state;
    }
}

export default userReducer;