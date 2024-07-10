import { combineReducers } from "redux";
import serviceReducer from "./reducers";

const rootReducer = combineReducers({
    services: serviceReducer
});

export default rootReducer;

