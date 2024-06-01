import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBiereCommande, addBiereToCommande, updateBiereCommande } from '../apiClient.js';

const BieresCommandesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [biereCommande, setBiereCommande] = useState({
    biere_id: '',
    commande_id: '',
  });

  useEffect(() => {
    if (id) {
      const loadBiereCommande = async () => {
        try {
          const fetchedBiereCommande = await fetchBiereCommande(id);
          setBiereCommande({
            biere_id: fetchedBiereCommande.biere_id,
            commande_id: fetchedBiereCommande.commande_id,
          });
        } catch (error) {
          console.error('Failed to load biere commande:', error);
        }
      };
      loadBiereCommande();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBiereCommande(prevBiereCommande => ({
      ...prevBiereCommande,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateBiereCommande(id, biereCommande);
      } else {
        await addBiereToCommande(biereCommande.commande_id, biereCommande.biere_id);
      }
      navigate('/bierecommandelist');
    } catch (error) {
      console.error('Failed to save biere commande:', error);
    }
  };

  const handleBack = () => {
    navigate('/bierecommandelist');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">ID de la bière : </label>
        <input
          name="biere_id"
          className="form-control"
          value={biereCommande.biere_id}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">ID de la commande : </label>
        <input
          name="commande_id"
          className="form-control"
          value={biereCommande.commande_id}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Enregistrer</button>
      <button type="button" className="btn btn-secondary" onClick={handleBack}>Retour</button>
    </form>
  );
};

export default BieresCommandesForm;
