import React, { useEffect } from 'react'
 
import MovieListing from '../MovieListing/MovieListing'
import { useDispatch, useSelector } from 'react-redux'
import {   fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice'

export default function Home() {
 const dispatch = useDispatch();
 const currSearch = useSelector(state => state.moviesReducer.currentSearch )
 
 useEffect(()=> {
  //  передаем currSearch
    dispatch(fetchAsyncMovies(currSearch))
    // добавляем для Сериалов
    dispatch(fetchAsyncShows(currSearch))
  
  },[dispatch, currSearch])  // важно добавить currSearch
  return (
<>
<div className="banner-image"></div>
<div className="container">
<MovieListing/>
</div>
</>
  )
}
