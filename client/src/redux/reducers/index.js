import { combineReducers } from 'redux';
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";

const reducer = combineReducers({
    userReducer,
    searchReducer
});

export default reducer;
