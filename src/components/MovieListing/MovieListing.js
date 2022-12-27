import React  from 'react'
import {   useSelector } from 'react-redux'
import Slider from 'react-slick';
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
    </div>
    {/* Для сериаов */}
    <div className="show-list">
      <h2>Сериалы</h2>
      <hr />
      <div className="movie-container">
      <Slider {...settings}>{renderShows}</Slider>
        </div>
    </div>
   </div>
   </>
  )
}
