import { configureStore } from "@reduxjs/toolkit";
import regsiterReducer from "../features/Residents/registerSlice"
import loginReducer from "../features/Residents/loginSlice"
const store = configureStore(
    {
        reducer:{
            register:regsiterReducer,
            login:loginReducer,
        }
    }
);

export default store;