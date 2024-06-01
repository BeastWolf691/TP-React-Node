import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBiereCommande, addBiereToCommande, updateBiereCommande, fetchBieres, fetchCommandes } from '../apiClient.js';

const BieresCommandesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [biereCommande, setBiereCommande] = useState({
    biere_id: '',
    commande_id: '',
  });
  const [bieresList, setBieres] = useState([]);
  const [commandesList, setCommandes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (id) {
          const fetchedBiereCommande = await fetchBiereCommande(id);
          setBiereCommande({
            biere_id: fetchedBiereCommande.biere_id,
            commande_id: fetchedBiereCommande.commande_id,
          });
        }
        const bieresData = await fetchBieres();
        const commandesData = await fetchCommandes();
        setBieres(bieresData);
        setCommandes(commandesData);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
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
        <label className="form-label">Bière : </label>
        <select
          name="biere_id"
          className="form-select"
          value={biereCommande.biere_id}
          onChange={handleChange}
        >
          <option value="">Sélectionner une bière</option>
          {bieresList.map(biere => (
            <option key={biere.id} value={biere.id}>
              {biere.name} (ID: {biere.id})
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Commande : </label>
        <select
          name="commande_id"
          className="form-select"
          value={biereCommande.commande_id}
          onChange={handleChange}
        >
          <option value="">Sélectionner une commande</option>
          {commandesList.map(commande => (
            <option key={commande.id} value={commande.id}>
              {commande.name} (ID: {commande.id})
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Enregistrer</button>
      <button type="button" className="btn btn-secondary" onClick={handleBack}>Retour</button>
    </form>
  );
};

export default BieresCommandesForm;
