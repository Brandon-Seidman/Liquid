const setLoading = (loading) => ({
    type: 'SET_LOADING',
    payload: {
        loading: loading
    }
});

const setData = (data) => ({
    type: 'SET_DATA',
    payload: {
        data: data
    }
});

const setError = (error) => ({
    type: 'SET_ERROR',
    payload: {
        error: error
    }
});

const setValues = (values) => ({
    type: 'SET_VALUES',
    payload: {
        values: values
    }
});

const updateValue = (target, value) => ({
    type: 'UPDATE_VALUE',
    payload: {
        target: target,
        value: value
    }
});

const setUser = (user) => ({
    type: 'SET_USER',
    payload: {
        user: user
    }
});

const setLiked = (liked) => ({
    type: 'SET_LIKED',
    payload: {
        liked: liked
    }
});

const setIngredientFields = (ingredientFields) => ({
    type: 'SET_INGREDIENT_FIELDS',
    payload: {
        ingredientFields: ingredientFields
    }
});

const setUnlock = (unlock) => ({
    type: 'SET_UNLOCK',
    payload: {
        unlock: unlock
    }
});

module.exports = {
    setLoading,
    setData,
    setError,
    setValues,
    updateValue,
    setUser,
    setLiked,
    setIngredientFields,
    setUnlock
};