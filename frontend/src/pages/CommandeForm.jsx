// CommandeForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addCommande, updateCommande, fetchCommande } from '../apiClient.js';
import BiereCommandeList from './BieresCommandesList.jsx';

const CommandeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commande, setCommande] = useState({
    name: '',
    price: '',
    bar_id: '',
    date: '',
    status: '',
    beers: [], // Tableau des bières commandées avec leurs quantités
  });

  useEffect(() => {
    if (id) {
      const loadCommande = async () => {
        const fetchedCommande = await fetchCommande(id);
        setCommande(fetchedCommande);
      };
      loadCommande();
    }
  }, [id]);

  // Fonction pour calculer le prix total en fonction des bières commandées
  const calculateTotalPrice = () => {
    return commande.beers.reduce((total, beer) => {
      return total + (beer.quantity * beer.price);
    }, 0);
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
    navigate('/commandelist');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nom : </label>
        <input
          name="name"
          className="form-control"
          value={commande.name}
          onChange={(e) => setCommande({ ...commande, name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">bar_id : </label>
        <input
          name="bar_id"
          className="form-control"
          value={commande.bar_id}
          onChange={(e) => setCommande({ ...commande, bar_id: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Date : </label>
        <input
          name="date"
          type="date"
          className="form-control"
          value={commande.date}
          onChange={(e) => setCommande({ ...commande, date: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Status : </label>
        <input
          name="status"
          className="form-control"
          value={commande.status}
          onChange={(e) => setCommande({ ...commande, status: e.target.value })}
        />
      </div>
      {/* Composant pour sélectionner les bières commandées */}
      <BiereCommandeList updateBeers={beers => setCommande(prevCommande => ({ ...prevCommande, beers }))} selectedBeers={commande.beers} />
      {/* Champ de prix total */}
      <div className="mb-3">
        <label className="form-label">Prix total : </label>
        <input
          name="price"
          className="form-control"
          value={calculateTotalPrice()}
          readOnly
        />
      </div>
      {/* Boutons de soumission et de retour */}
      <button type="submit" className="btn btn-primary">Enregistrement</button>
      <button type="button" className="btn btn-secondary" onClick={handleBack}>Retour</button>
    </form>
  );
};

export default CommandeForm;
