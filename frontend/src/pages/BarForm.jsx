import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addBar, updateBar, fetchBar } from '../apiClient.js';

const BarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bar, setBar] = useState({
    name: "",
    address: "",
    tel: "",
    email: "",
    description: "",
    rating: ""
  });

  useEffect(() => {
    if (id) {
      const loadBar = async () => {
        const fetchedBar = await fetchBar(id);
        setBar({
          name: fetchedBar.name,
          address: fetchedBar.address,
          tel: fetchedBar.tel,
          email: fetchedBar.email,
          description: fetchedBar.description,
          rating: fetchedBar.rating
        });
      };
      loadBar();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBar(prevBar => ({
      ...prevBar,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateBar(id, bar);
    } else {
      await addBar(bar);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nom du bar</label>
        <input
          name="name"
          className="form-control"
          value={bar.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">address</label>
        <input
          name="address"
          className="form-control"
          value={bar.address}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">tél</label>
        <input
          name="tel"
          className="form-control"
          value={bar.tel}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={bar.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description :</label>
        <input
          name="description"
          className="form-control"
          value={bar.description}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Rating</label>
        <input
          type="number"
          name="rating"
          className="form-control"
          value={bar.rating}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Enregistrement</button>
    </form>
  );
};

export default BarForm;
