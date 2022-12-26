import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
  return (
    <>
    <div className="content">
    <Header/>
    <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/movie/:imdbID' element={<MovieDetail/>} />
   
       <Route path='*'  element={<PageNotFound/>} />
      </Routes>
     </div>
    
      <Footer/>
   </>
  );
}
export default App;
