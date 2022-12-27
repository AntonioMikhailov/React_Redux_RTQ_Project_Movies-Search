import {  configureStore } from "@reduxjs/toolkit"; 
import MovieSlice from "./movies/movieSlice";
export const store = configureStore({
  reducer:{
    moviesReducer:MovieSlice,
  }
})
 