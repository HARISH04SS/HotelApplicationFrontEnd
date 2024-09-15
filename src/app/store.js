import { configureStore } from "@reduxjs/toolkit";
import regsiterReducer from "../features/Residents/registerSlice"
const store = configureStore(
    {
        reducer:{
            register:regsiterReducer,
        }
    }
);

export default store;