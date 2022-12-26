import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAsyncMovies, fetchAsyncShows, } from "../../features/movies/movieSlice";
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
              <Link to="/">Мои фильмы </Link>
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
