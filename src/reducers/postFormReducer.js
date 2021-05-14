const initialState = {
    ingredientFields: []
};

const postFormReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case "SET_INGREDIENT_FIELDS":
            return {ingredientFields: payload.ingredientFields};
        default:
            return state;
    }
}

export default postFormReducer;