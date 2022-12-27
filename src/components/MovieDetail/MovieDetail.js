import React, { useEffect } from 'react'
import { InfinitySpin  } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchAsyncMovieOrShowDetail, RemoveSelectedMovieOrShow } from '../../features/movies/movieSlice'
import './MovieDetail.scss'
export default function MovieDetail() {
  const {imdbID} = useParams()
  const data = useSelector((state)=> state.moviesReducer.selectMovieOrShow) 
 const dispatch = useDispatch();
  useEffect(()=> {
  dispatch(fetchAsyncMovieOrShowDetail(imdbID))
  //  надо очищать предыдущие данные со страницы Описания после каждого показа, иначе при повторном заходе будет сначала мелькать предыдущий контент а уже потом новый 
  // очищаем store
  return ()=> { dispatch(RemoveSelectedMovieOrShow()) }
  },[dispatch, imdbID])  
  return (
   <>
     <div className="container">
  {
    // Добавляем Loader - показываем пока не подгрузится БД
       Object.keys(data).length === 0 ?
<>
<div className="loader-wrapper">
<div className='loader'>
<InfinitySpin 
  height="50"  
  width="150"  
  color="white"
  ariaLabel="audio-loading"
  visible={true}
 /> 
   </div>
        <h3 className='loader-text'  style={{color: 'white'}}>Загружаю...</h3>
</div>
</>
       :
       <div className="move-section">
       <div className="section-left">
         <div className="movie-title">{data.Title}</div>
         <div className="movie-rating">
           <span>IMDB Rating <i className='fa fa-star' ></i> : {data.imdbRating} </span>
         </div>
           <span>IMDB Votes <i className='fa fa-thumbs-up' ></i> : {data.imdbVotes} </span>
           <span>Runtime <i className='fa fa-film' ></i> : {data.Runtime} </span>
           <span>Year <i className='fa fa-calendar' ></i> : {data.Year} </span>
         <div className="movie-plot">{data.Plot}</div>
         <div className="movie-info">
           <div>  <span>Director</span> :  
           <span> {data.Director}</span>
           </div>
           <div> <span>Stars</span> : 
           <span> {data.Actors}</span>
           </div>
           <div><span>Genres</span> : 
           <span> {data.Genre}</span>
           </div>
           <div><span>Languages</span> : 
           <span> {data.Language}</span>
           </div>
           <div> <span>Awards</span> : 
           <span> {data.Awards}</span>
           </div>
         </div>
       </div>
       <div className="section-right">
         <img src={data.Poster} alt={data.Title} />
       </div>
       </div> 
  }
   </div>
   </>
  )
}
