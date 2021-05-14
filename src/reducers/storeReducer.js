const initialState = {
    unlock: false
};

const storeReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case "SET_UNLOCK":
            return {unlock: payload.unlock};
        default:
            return state;
    }
}

export default storeReducer;