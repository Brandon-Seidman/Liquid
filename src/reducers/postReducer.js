const initialState = {
    liked: false
};

const postReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case "SET_LIKED":
            return {liked: payload.liked};
        default:
            return state;
    }
}

export default postReducer;