import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addCommande, updateCommande, fetchCommande } from '../apiClient.js';

const CommandeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commande, setCommande] = useState({
    name: '',
    price: '',
    bar_id: '',
    date: '',
    status: ''
  });

  useEffect(() => {
    if (id) {
      const loadCommande = async () => {
        const fetchedCommande = await fetchCommande(id);
        setBiere({
          name: fetchedCommande.name,
          price: fetchedCommande.price,
          bar_id: fetchedCommande.bar_id,
          date: fetchedCommande.date.split('T')[0],// Convertir la date au format yyyy-MM-dd
          status: fetchedCommande.status
        });
      };
      loadCommande();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBiere(prevCommande => ({
      ...prevCommande,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateCommande(id, commande);
    } else {
      await addCommande(commande);
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
          value={commande.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Prix : </label>
        <input
          name="price"
          className="form-control"
          value={commande.price}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">bar_id : </label>
        <input
          name="bar_id"
          className="form-control"
          value={commande.bar_id}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Date : </label>
        <input
          name="date"
          className="form-control"
          value={commande.date}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">status : </label>
        <input
          name="status"
          className="form-control"
          value={commande.status}
          onChange={handleChange}
        />
        </div>
      <div className="mb-3">
        <label className="form-label">Rating</label>
        <input
          type="number"
          name="rating"
          className="form-control"
          value={commande.rating}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Enregistrement</button>
    </form>
  );
};

export default CommandeForm;
