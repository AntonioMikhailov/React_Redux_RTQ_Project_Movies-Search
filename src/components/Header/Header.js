import React, { useRef, useState } from "react";
import { useDispatch,  } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchAsyncMovies, fetchAsyncShows, getCurrentSearch, } from "../../features/movies/movieSlice";
import user from "../../images/user.png";
import "./Header.scss";
export default function Header() {
  const placeholderText = useRef();
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  function submitHandler(e) {
    e.preventDefault();
    // проверка на заполнение
    if (term.length > 2) {
    // передаем данные запроса поиска
      dispatch(fetchAsyncMovies(term));
      //  для Сериалов
      dispatch(fetchAsyncShows(term));
      setTerm("");
      // добавляем dispatch и меняем  Запрос Поиска
      dispatch(getCurrentSearch(term))
      placeholderText.current.placeholder = "Поиск фильмов и сериалов";
    } else {
       placeholderText.current.placeholder = "Введите название фильма >2 символов";
    }
  }
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo">
              <NavLink to="/">Мои фильмы </NavLink>
              <NavLink to="/"> <div className='nav-link' >Главная</div></NavLink>
            </div>
            <div className="search-bar">
              <form onSubmit={(e) => submitHandler(e)}>
                <input
                  ref={placeholderText}
                  type="text"
                  onChange={(e) => setTerm(e.target.value)}
                  value={term}
                  placeholder="Поиск фильмов и сериалов"
                />
                <button className="search-button" type="submit">
                  Поиск
                </button>
              </form>
            </div>
            <div className="user-image">
              <img src={user} alt="user" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
