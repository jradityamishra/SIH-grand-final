import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from "./authSlice"
import {liveClassReducer} from './liveClassSlice'

const store=configureStore({
    reducer:{
        auth:authReducer,
        liveClass:liveClassReducer,
    }
})

export default store;