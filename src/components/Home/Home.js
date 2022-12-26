import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing'
import { useDispatch } from 'react-redux'
import {   fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice'

export default function Home() {
 const dispatch = useDispatch();
 useEffect(()=> {
  //  для первой загрузки чтобы не пустая страница передаем данные запроса
    dispatch(fetchAsyncMovies('Mission'))
    // добавляем для Сериалов
    dispatch(fetchAsyncShows('Mission'))
  
  },[dispatch])  
  return (
<>
<div className="banner-image"></div>
<div className="container">
<MovieListing/>
</div>
</>
  )
}
