import { useEffect, useState } from 'react';
import { addReview, updateReview, fetchReviews, fetchMovie } from '../apiClient';
import { useNavigate, useParams } from 'react-router-dom';

const ReviewForm = ({ review }) => {
  const navigate = useNavigate();
  const { id: movieId } = useParams();
  const [formData, setFormData] = useState({
    movie_id: movieId,
    user: review?.user ?? '',
    review: review?.review ?? '',
    rating: review?.rating ?? '',
    created_at: review?.created_at ?? ''
  });
  const [movie, setMovie] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (review.id) {
      await updateReview(review.id, formData);
    } else {
      await addReview(formData);
    }
    handleSave();
  };

  useEffect(() => {
    if (movieId) {
      fetchMovie(movieId).then(setMovie)
    }
  }, [movieId])

  const handleSave = async () => {
    await fetchReviews();
    navigate('/movies/' + id)
  };

  return (
    <form onSubmit={handleSubmit} className="container my-4">
      <div className="mb-3">
        <label className="form-label">Movie/Show</label>
        <input
          type="number"
          name="movie_id"
          className="form-control"
          value={movie.title ?? movieId ?? 'No ID'}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label className="form-label">User</label>
        <input
          type="text"
          name="user"
          className="form-control"
          value={formData.user}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Review</label>
        <textarea
          name="review"
          className="form-control"
          value={formData.review}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Rating</label>
        <input
          type="number"
          name="rating"
          className="form-control"
          value={formData.rating}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default ReviewForm;
