import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './MovieCard.scss'

export default function MovieCard({data}) {
 
  return (
 <>

<div className="card-item">
<NavLink to={`/movie/${data.imdbID}`} >
      <div className="card-inner">
        <div className="card-top">
          <img src={data.Poster} alt={data.Title} />
        </div>
        <div className="card-bottom">
          <div className="card-info">
            <h4>{data.Title}</h4>
            <h4>{data.Year}</h4>
          </div>
        </div>
      </div>
      </NavLink>
    </div>

 </>
  )
}


