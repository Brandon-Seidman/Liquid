const initialState = {
    anchorEl: null,
    index: 1
};

const filterReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case "SET_ANCHOR_EL":
            return {...state, anchorEl: payload.anchorEl};
        case "SET_INDEX":
            return {...state, index: payload.index};
        default:
            return state;
    }
}

export default filterReducer;