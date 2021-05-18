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

const setLikes = (likes) => ({
    type: 'SET_LIKES',
    payload: {
        likes: likes
    }
});

const setIsFriend = (isFriend) => ({
    type: 'SET_IS_FRIEND',
    payload: {
        isFriend: isFriend
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

const setPasswordError = (error) => ({
    type: 'SET_PASSWORD_ERROR',
    payload: {
        error: error
    }
});

const setPasswordLengthError = (error) => ({
    type: 'SET_PASSWORD_LENGTH_ERROR',
    payload: {
        error: error
    }
});

const setUsernameTakenError = (error) => ({
    type: 'SET_USERNAME_TAKEN_ERROR',
    payload: {
        error: error
    }
});

const clearSignupErrors = () => ({
    type: 'CLEAR_SIGNUP_ERRORS',
    payload: {}
});

module.exports = {
    setLoading,
    setData,
    setError,
    setValues,
    updateValue,
    setUser,
    setLiked,
    setLikes,
    setIsFriend,
    setIngredientFields,
    setUnlock,
    setPasswordError,
    setPasswordLengthError,
    setUsernameTakenError,
    clearSignupErrors
};