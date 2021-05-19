const initialState = {
    values: {},
    formLoading: false
};

const formReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case "SET_VALUES":
            return {...state, values: payload.values};
        case "UPDATE_VALUE":
            return {...state, values: {...state.values, [payload.target]: payload.value}};
        case "SET_FORM_LOADING":
            return {...state, formLoading: payload.formLoading};
        default:
            return state;
    }
}

export default formReducer;