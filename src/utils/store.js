import { configureStore } from "@reduxjs/toolkit";
import songSlice from "./songSlice";

const store=configureStore({

reducer:{
   song:songSlice
}



})

export default store;