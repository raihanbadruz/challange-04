import React, { useEffect, useState } from "react";

function Movie() {
  const [movieList, setMovieList] = useState([]);

  const getMovie = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=a3a22845e640c4d14e12f64c9de1107d"
    )
      .then((res) => res.json())
      .then((json) => setMovieList(json.results));
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {movieList.map((movie) => (
        <img
          style={{ width: "300px", heght: "250px" }}
          key={movie.id}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />
      ))}
    </div>
  );
}

export default Movie;
