import React, { useEffect, useState }  from 'react'
import {   useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick';
import { fetchAsyncMovies,   fetchAsyncShows,   getCurrentPageMovies } from '../../features/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard';
import './MovieListing.scss'
export default function MovieListing() {
 const movies = useSelector((state)=> state.moviesReducer.movies) 
  // для сериалов
  const shows = useSelector((state)=> state.moviesReducer.shows) 
 let renderMovies; 
  // для сериалов
  let renderShows; 
  // в ответе с сервера есть параметр Response: "True" и мы можем его проверить перед циклом MAP
  // Сначала получаем в цикле БД и потом передаем renderMovies в отдельную карточку
  renderMovies = movies.Response === "True" ? (
    movies.Search.map((movie, index)=> {
   return <MovieCard  key={index} data={movie}/>
   // если запрос будет некорректный - мало символов например то вернет текст {Response: 'False', Error: 'Too many results.'} и вставится текст в тег h3
    })  ) : (<h3> ОШИБКА: {movies.Error}</h3>)
    // для сериалов 
    renderShows = shows.Response === "True" ? (
      shows.Search.map((shows, index)=> {
     return <MovieCard  key={index} data={shows}/>
      })  ) : (<h3> ОШИБКА: {shows.Error}</h3>)
      //  Подлючаем Slick Slider - setting можно вынести в отдельный файл
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        responsive : [
         {
              breakpoint: 900,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
        },
        ]
      };
      const currSearch = useSelector(state => state.moviesReducer.currentSearch )
      const currentPageMovies = useSelector(state => state.moviesReducer.currentPageMovies )
      const currentPageShows = useSelector(state => state.moviesReducer.currentPageShows )
      const numOfMovies = useSelector(state => state.moviesReducer.movies ) // это кол-во делим на 10  - сколько на странице за один раз и получим кол-во страниц
    // console.log(numOfMovies.totalResults);

      
      const dispatch = useDispatch()
      // передаем в State как начальное значение
      const [currPageMovies, setCurrentPageMovies] = useState(currentPageMovies)
      const [currPageShows, setCurrentPageShows] = useState(currentPageShows)
      //Важно! Диспатч будем делать внутри useEffect  - он будет следить  за сменой currPage
      useEffect( ()=> {
        // console.log(currPage);
        // передаем новую страницу в Store
        dispatch(getCurrentPageMovies(currPageMovies))
        dispatch(fetchAsyncMovies({currSearch,  currPageMovies}))
        dispatch(fetchAsyncShows({currSearch,  currPageShows}))
           // добавляем dispatch и меняем в Store Новое значение - теперь уже не Mission
       }, [ currSearch, dispatch, currPageMovies, currPageShows])

      function handleNextPageMovie() { 
        if(currPageMovies >= 20) {
         setCurrentPageMovies(1)
      } else {
          setCurrentPageMovies(currPageMovies + 1)
        
        }
    
     }
      function handlePrevPageMovie() { 
        console.log('handlePrevPage', currPageMovies);
        if(currPageMovies < 2 ) { // именно 2  т.к. один уже Ошибка
        setCurrentPageMovies(20)
      } else {
          setCurrentPageMovies((prev)=> {
            return prev - 1
          })
        }
      }

      // ДЛЯ  СЕРИАЛОВ
      function handleNextPageShows() { 
        if(currPageShows >= 10) {
          setCurrentPageShows(1)
      } else {
        setCurrentPageShows(currPageShows + 1)
        
        }
    
     }
      function handlePrevPageShows() { 
        console.log('handlePrevPage', currPageShows);
        if(currPageShows < 2 ) { // именно 2  т.к. один уже Ошибка
          setCurrentPageShows(10)
      } else {
        setCurrentPageShows((prev)=> {
            return prev - 1
          })
        }
      }

  return (
   <>
   <div className="movie-wrapper">
    <div className="movie-list">
      <h2>Фильмы</h2>
      <hr />
      {/* вызываем MovieCard  в цикле через renderMovies */}
      <div className="movie-container">
      <Slider {...settings}>
        {renderMovies}
        </Slider>
        </div>
        <div className="button-wrapper">
        <button className='page-button'  onClick={handlePrevPageMovie}>{'<< 10 фильмов '}</button>
        <button className='page-button'  onClick={handleNextPageMovie}> {' 10 фильмов >> '}</button>
</div>
       
    </div>
    {/* Для сериаов */}
    <div className="show-list">
      <h2>Сериалы</h2>
      <hr />
      <div className="movie-container">
      <Slider {...settings}>{renderShows}</Slider>
        </div>
      <div className="button-wrapper">
      <button className='page-button'  onClick={handlePrevPageShows}>{'<< 10 сериалов '}</button>
        <button className='page-button'  onClick={handleNextPageShows}>{'10 сериалов >> '}</button>
      </div>
     
    </div>
   </div>
   </>
  )
}
