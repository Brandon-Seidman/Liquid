const initialState = {
    anchorEl: null,
    option: "all"
};

const filterReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case "SET_ANCHOR_EL":
            return {...state, anchorEl: payload.anchorEl};
        case "SET_OPTION":
            return {...state, option: payload.option};
        default:
            return state;
    }
}

export default filterReducer;