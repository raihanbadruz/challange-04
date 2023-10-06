import React from "react";

const MovieDetail = ({ movie, onClose }) => {
  const backgroundImageStyle = {
    backgroundImage: `url(${process.env.REACT_APP_BASEIMGURL}/${movie.backdrop_path})`,
  };

  return (
    <div className="movie-detail" style={backgroundImageStyle}>
      <div className="content-overlay">
        <div className="movie-title">{movie.title}</div>
        <div className="movie-overview">{movie.overview}</div>
        <div className="movie-date">Release : {movie.release_date}</div>
        <div className="movie-rate">
          Rating : {movie.vote_average.toFixed(2)}
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
