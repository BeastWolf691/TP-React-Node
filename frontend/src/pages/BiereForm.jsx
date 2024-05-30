import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addBiere, updateBiere, fetchBiere } from '../apiClient.js';

const BiereForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [biere, setBiere] = useState({
    name: '',
    description: '',
    degree: '',
    price: '',
    bar_id: ''
  });

  useEffect(() => {
    if (id) {
      const loadBiere = async () => {
        const fetchedBiere = await fetchBiere(id);
        setBiere({
          name: fetchedBiere.name,
          description: fetchedBiere.description,
          degree: fetchedBiere.degree,
          price: fetchedBiere.price
        });
      };
      loadMovie();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prevMovie => ({
      ...prevMovie,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateMovie(id, movie);
    } else {
      await addMovie(movie);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          name="title"
          className="form-control"
          value={movie.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Type</label>
        <input
          name="type"
          className="form-control"
          value={movie.type}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Genre</label>
        <input
          name="genre"
          className="form-control"
          value={movie.genre}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Release Date</label>
        <input
          type="date"
          name="release_date"
          className="form-control"
          value={movie.release_date}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Rating</label>
        <input
          type="number"
          name="rating"
          className="form-control"
          value={movie.rating}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default MovieForm;
