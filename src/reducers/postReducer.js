const initialState = {
    liked: false,
    likes: 0
};

const postReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case "SET_LIKED":
            return {...state, liked: payload.liked};
        case "SET_LIKES":
            return {...state, likes: payload.likes};
        default:
            return state;
    }
}

export default postReducer;