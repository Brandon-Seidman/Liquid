const initialState = {
    liked: false,
    likes: 0,
    isFriend: false
};

const postReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case "SET_LIKED":
            return {...state, liked: payload.liked};
        case "SET_LIKES":
            return {...state, likes: payload.likes};
        case "SET_IS_FRIEND":
            return {...state, isFriend: payload.isFriend};
        default:
            return state;
    }
}

export default postReducer;