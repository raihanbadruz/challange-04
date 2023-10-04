import "./App.css";
import { getMovieList, searchMovie } from "./api";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Navbar, Button } from "react-bootstrap";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    const handleMovieClick = (movie) => {
      setSelectedMovie(movie);
    };

    return popularMovies.map((movie) => {
      return (
        <div className="movie-wrapper" key={movie.id}>
          <div className="movie-title">{movie.title}</div>
          <img
            className="movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            onClick={() => handleMovieClick(movie)}
          />
        </div>
      );
    });
  };

  const MovieDetail = ({ movie, onClose }) => {
    return (
      <div className="movie-detail">
        <div className="movie-title">{movie.title}</div>
        <img
          className="movie-image"
          src={`${process.env.REACT_APP_BASEIMGURL}/${movie.backdrop_path}`}
        />
        <div className="movie-date">Release: {movie.release_date}</div>
        <div className="movie-rate">{movie.vote_average.toFixed(1)}</div>
        <div className="movie-overview">{movie.overview}</div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    );
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  console.log({ popularMovies: popularMovies });

  return (
    <div className="App">
      <div className="navbar">
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand className="logo">Movielist</Navbar.Brand>
            <input
              placeholder="Search..."
              className="search-movie"
              onChange={({ target }) => search(target.value)}
            />
            <Button className="login-button">Login</Button>
            <Button className="register-button">Register</Button>
          </Container>
        </Navbar>
      </div>
      <header className="App-header">
        <div className="movie-container">
          {selectedMovie ? (
            <MovieDetail
              movie={selectedMovie}
              onClose={() => setSelectedMovie()}
            />
          ) : (
            <PopularMovieList />
          )}
        </div>
      </header>
    </div>
  );
};

export default App;
