import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MovieApi from "../../common/apis/MovieApi";
import { APIKey } from "../../common/apis/MovieApiKeys";
export const fetchAsyncMovies = createAsyncThunk( "movies/fetchAsyncMovies",
// вставляем из useState в Header первичный запрос поиска 
  async (term ) => {
    const response = await MovieApi.get( `?apiKey=${APIKey}&s=${term}&type=movie `);
    return response.data;
  }
);
// для Сериалов
export const fetchAsyncShows = createAsyncThunk(  "movies/fetchAsyncShows",
  async (term ) => {
    const response = await MovieApi.get(`?apiKey=${APIKey}&s=${term}&type=series`);
    return response.data;
  }
);
// для ShowsOrShowsDetail
export const fetchAsyncMovieOrShowDetail = createAsyncThunk(  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
   const response = await MovieApi.get( `?apiKey=${APIKey}&i=${id}&plot=full`);
    console.log(response.data);
 return response.data;
  }
);
const initialState = {
  movies: {},  
  shows: {},
  selectMovieOrShow: {},  
};
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    RemoveSelectedMovieOrShow: (state ) => {
    state.selectMovieOrShow = {};
    },
  },
  //  extraReducers - в нем можем дополнительно определять action types
  extraReducers: {
    // Для ожидания - pending
    [fetchAsyncMovies.pending]: () => {
    },
    // Когда запрос выполнен  - fullfilled - тогда можем начать передачу в Store  через PAyload
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      // добавляем в initial State  
      return { ...state, movies: payload };
    },
    // В случае Ошибки
    [fetchAsyncMovies.rejected]: () => {
      // console.log("Rejected");
    },
    //  для Сериалов - нужен только fulfilled
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
        return { ...state, shows: payload };
    },
    //  для Detail - 
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
    return { ...state, selectMovieOrShow: payload };
    },
  },
});
export const { RemoveSelectedMovieOrShow } = movieSlice.actions;
export default movieSlice.reducer;
