import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/Residents/registerSlice";
import loginReducer from "../features/Residents/loginSlice";
import adminLoginReducer from "../features/Admin/adminloginSlice";
import adminRegisterReducer from "../features/Admin/adminregisterSlice"


const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    adminLogin: adminLoginReducer,
    adminRegister: adminRegisterReducer,
  },
});

export default store;
