const initialState = {
    values: {}
};

const formReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case "SET_VALUES":
            return {values: payload.values};
        case "UPDATE_VALUE":
            return {values: {...state.values, [payload.target]: payload.value}};
        default:
            return state;
    }
}

export default formReducer;