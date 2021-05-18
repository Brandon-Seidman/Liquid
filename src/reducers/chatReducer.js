const initialState = {
    yourID: null,
    messages: [],
    message: ""
};

const chatReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case "SET_YOUR_ID":
            return {...state, yourID: payload.yourID};
        case "CLEAR_MESSAGES":
            return {...state, messages: []};
        case "ADD_MESSAGE":
            const new_messages = [...state.messages];
            new_messages.push(payload.message);
            return {...state, messages: new_messages}
        case "SET_MESSAGE":
            return {...state, message: payload.message};
        default:
            return state;
    }
}

export default chatReducer;