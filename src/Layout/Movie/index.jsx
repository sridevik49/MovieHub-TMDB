import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import { fetchMovieDetails} from "../../api";
import Trailer from "./Trailer";
import Cast from "./Cast"


const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
 
  useEffect(() => {
    fetchMovieDetails(id)
      .then(data => setMovie(data));
  }, [id]);

  

  return (
    <div className="movie-details">
      <div className="movie-container">
      

      <img
        className="movie-image"
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
      />

      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p className="movie-meta">{movie.overview}</p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
      </div>
     
        <Trailer id={id} />
        <Cast id={id}/>
      </div>
    </div>
  );
};

export default MovieDetails;