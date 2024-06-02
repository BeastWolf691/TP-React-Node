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
    status: 'en cours', // Définir la valeur par défaut du statut
  });

  useEffect(() => {
    if (id) {
      const loadCommande = async () => {
        const fetchedCommande = await fetchCommande(id);
        setCommande({
          name: fetchedCommande.name,
          price: fetchedCommande.price,
          bar_id: fetchedCommande.bar_id,
          date: fetchedCommande.date.split('T')[0],
          status: fetchedCommande.status,
        });
      };
      loadCommande();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommande(prevCommande => ({
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
    navigate('/commandelist');
  };

  const handleBack = () => {
    navigate('/commandelist'); // permet de revenir sur la page précédente
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
        <label className="form-label">Prix total: </label>
        <input
          name="price"
          type="number"
          className="form-control"
          value={commande.price}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">bar_id : </label>
        <input
          name="bar_id"
          type="number"
          className="form-control"
          value={commande.bar_id}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Date : </label>
        <input
          name="date"
          type="date"
          className="form-control"
          value={commande.date}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Status : </label>
        <select
          name="status"
          className="form-control"
          value={commande.status}
          onChange={handleChange}
        >
          <option value="en cours">En cours</option>
          <option value="fini">Fini</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Enregistrement</button>
      <button type="button" className="btn btn-secondary" onClick={handleBack}>Retour</button>
    </form>
  );
};

export default CommandeForm;
