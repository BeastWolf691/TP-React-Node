import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addBiere, updateBiere, fetchBiere } from '../apiClient.js';

const BiereForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectBiere, setSelectedBiere] = useState(null);
  const [newbiere, setBiere] = useState({
    name: '',
    description: '',
    degree: '',
    price: '',
    bar_id: '',
    rating: ''
  });

  useEffect(() => {
    if (id) {
      const loadBiere = async () => {
        const fetchedBiere = await fetchBiere(id);
        setBiere({
          name: fetchedBiere.name,
          description: fetchedBiere.description,
          degree: fetchedBiere.degree,
          price: fetchedBiere.price,
          bar_id: fetchedBiere.bar_id,
          rating: fetchedBiere.rating
        });
      };
      loadBiere();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBiere(prevBiere => ({
      ...prevBiere,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateBiere(id, biere);
    } else {
      await addBiere(biere);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nom : </label>
        <input
          name="name"
          className="form-control"
          value={biere.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description : </label>
        <input
          name="description"
          className="form-control"
          value={biere.description}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Degrés : </label>
        <input
          name="degree"
          className="form-control"
          value={biere.degree}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Prix : </label>
        <input
          name="price"
          className="form-control"
          value={biere.price}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">bar_id : </label>
        <input
          name="bar_id"
          className="form-control"
          value={biere.bar_id}
          onChange={handleChange}
        />
        </div>
      <div className="mb-3">
        <label className="form-label">Rating</label>
        <input
          type="number"
          name="rating"
          className="form-control"
          value={biere.rating}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Enregistrement</button>
    </form>
  );
};

export default BiereForm;
