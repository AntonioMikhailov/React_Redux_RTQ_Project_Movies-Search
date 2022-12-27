import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MovieApi from "../../common/apis/MovieApi";
import { APIKey } from "../../common/apis/MovieApiKeys";
 
export const fetchAsyncMovies = createAsyncThunk( "movies/fetchAsyncMovies",
 // получаем как один аргумент и потом деструктурируем
  async (currentData ) => {
    // деструктурируем  и только теперь можно вставлять в URL два параметра
    const {currSearch,  currPageMovies} =  currentData
 console.log('currentPage', currPageMovies);
  const response = await MovieApi.get( `?apiKey=${APIKey}&s=${currSearch}&type=movie&page=${currPageMovies} `);
  // console.log('Movies', response.data.totalResults); // кол. фильмов в запросе 164
    return response.data;
  }
);
// для Сериалов
export const fetchAsyncShows = createAsyncThunk(  "movies/fetchAsyncShows",
  async (currentData2 ) => {
    const {currSearch,  currPageShows} =  currentData2
    const response = await MovieApi.get(`?apiKey=${APIKey}&s=${currSearch}&type=series&page=${currPageShows} `);
     return response.data;
  }
);
// для ShowsOrShowsDetail
export const fetchAsyncMovieOrShowDetail = createAsyncThunk(  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
   const response = await MovieApi.get( `?apiKey=${APIKey}&i=${id}&plot=full`);
 
 return response.data;
  }
);
const initialState = {
  movies: {},  
  shows: {},
  selectMovieOrShow: {},
  currentSearch: 'Mission',   // создали первичный запрос
  currentPageMovies:1, // первичная страница
 currentPageShows: 1, // первичная страница
};
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: { RemoveSelectedMovieOrShow: (state ) => {
    state.selectMovieOrShow = {};
    },
    // добавляем хранение запроса
    getCurrentSearch: (state, action ) => {
      state.currentSearch = action.payload;
      },
        // добавляем текущую страницу
    getCurrentPageMovies: (state, action ) => {
      state.currentPageMovies = action.payload;
 
      },
    getCurrentPageShows: (state, action ) => {
      state.currentPageShows = action.payload;
     
      },
  },
  //  extraReducers - в нем можем дополнительно определять action types
  extraReducers: {
    // Для ожидания - pending
    [fetchAsyncMovies.pending]: () => {
    },
    // Когда запрос выполнен  - fullfilled - тогда можем начать передачу в Store  через Payload
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
export const { RemoveSelectedMovieOrShow, getCurrentSearch, getCurrentPageMovies, getCurrentPageShows } = movieSlice.actions;
export default movieSlice.reducer;
