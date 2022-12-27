import React, { useEffect } from 'react'
 
import MovieListing from '../MovieListing/MovieListing'
import { useDispatch, useSelector } from 'react-redux'
import {   fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice'

export default function Home() {
 const dispatch = useDispatch();
 const currSearch = useSelector(state => state.moviesReducer.currentSearch )
 
 const currPageMovies = useSelector(state => state.moviesReducer.currentPageMovies )
 const currPageShows = useSelector(state => state.moviesReducer.currentPageShows )
 useEffect(()=> {
  //  передаем currSearch
  // console.log(currPage);
  // console.log(currSearch);
  //Важно! передаем как объект
  console.log(currPageMovies);
    dispatch(fetchAsyncMovies({currSearch, currPageMovies }))
    // добавляем для Сериалов
    dispatch(fetchAsyncShows({currSearch, currPageShows }))
  
  },[dispatch, currSearch, currPageMovies, currPageShows ])  // важно добавить currSearch
  return (
<>
<div className="banner-image"></div>
<div className="container">
<MovieListing/>
</div>
</>
  )
}
