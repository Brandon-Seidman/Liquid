import {combineReducers} from 'redux';
import formReducer from './formReducer';
import globalReducer from './globalReducer';
import postFormReducer from './postFormReducer';
import postReducer from './postReducer';
import storeReducer from './storeReducer';
import userReducer from './userReducer';
import signupReducer from './signupReducer';
import chatReducer from './chatReducer';
import filterReducer from './filterReducer';

const rootReducer = combineReducers({
    form: formReducer,
    global: globalReducer,
    postForm: postFormReducer,
    post: postReducer,
    store: storeReducer,
    user: userReducer,
    signup: signupReducer,
    chat: chatReducer,
    filter: filterReducer
});

export default rootReducer;