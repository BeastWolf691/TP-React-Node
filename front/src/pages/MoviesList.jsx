// components/MoviesList.js
import { useEffect, useState } from 'react';
import { fetchMovies, deleteMovie } from '../apiClient.js';
import StarRating from '../components/StarRating.jsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const moviesData = await fetchMovies();
      setMovies(moviesData);
    };
    loadMovies();
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    await deleteMovie(id);
    setMovies(movies.filter(movie => movie.id !== id));
  };

  return (
    <div className="container my-4">
      <div className="row">
        {movies.map(movie => (
          <div className="col-md-3 mb-4" key={movie.id}>
            <Link to={'/movie/' + movie.id} className="card h-100">
              <img src={movie.imageUrl} className="card-img-top" alt={movie.title} />
              <div className="text-center"><StarRating rating={movie.rating} /></div>
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text text-muted small">
                  {new Date(movie.release_date).toLocaleDateString()}
                  <br />
                  {movie.genre}
                  <span className='position-absolute' style={{ right: 8, bottom: 8 }} >
                    <Link
                      className="btn btn-success btn-sm me-1"
                      to={'/reviews/movie/' + movie.id}
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(event) => handleDelete(movie.id, event)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
