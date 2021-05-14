const initialState = {
    loading: false,
    data: null,
    error: false
};

const globalReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case "SET_LOADING":
            return {...state, loading: payload.loading};
        case "SET_DATA":
            return {...state, data: payload.data};
        case "SET_ERROR":
            return {...state, error: payload.error};
        default:
            return state;
    }
}

export default globalReducer;