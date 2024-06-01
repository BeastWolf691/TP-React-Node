import React, { useEffect, useState } from 'react';
import { fetchBieresCommandes, addBiereToCommande, removeBiereFromCommande, fetchBieres, fetchCommandes } from '../apiClient.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const BieresCommandesList = () => {
  const [bieresCommandes, setBieresCommandes] = useState([]);
  const [bieresList, setBieres] = useState([]);
  const [commandesList, setCommandes] = useState([]);
  const [selectedBiere, setSelectedBiere] = useState('');
  const [selectedCommande, setSelectedCommande] = useState('');

  useEffect(() => {
    const loadBieresCommandes = async () => {
      const bieresCommandesData = await fetchBieresCommandes();
      const bieresData = await fetchBieres();
      const commandesData = await fetchCommandes();
      setBieresCommandes(bieresCommandesData);
      setBieres(bieresData);
      setCommandes(commandesData);
    };
    loadBieresCommandes();
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    await removeBiereFromCommande(id);
    setBieresCommandes(bieresCommandes.filter(biereCommande => biereCommande.id !== id));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const newBiereCommande = await addBiereToCommande(selectedCommande, selectedBiere);
    setBieresCommandes([...bieresCommandes, newBiereCommande]);
  };

  const getBiereName = (biereId) => {
    const biere = bieresList.find(biere => biere.id === biereId);
    return biere ? biere.name : 'Inconnu';
  };

  const getCommandeName = (commandeId) => {
    const commande = commandesList.find(commande => commande.id === commandeId);
    return commande ? commande.name : 'Inconnu';
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-end mb-4">
        <form onSubmit={handleAdd}>
          <div className="form-group">
            <label htmlFor="biereSelect">Sélectionnez une bière</label>
            <select
              id="biereSelect"
              className="form-control"
              value={selectedBiere}
              onChange={(e) => setSelectedBiere(e.target.value)}
            >
              <option value="">Choisissez une bière</option>
              {bieresList.map(biere => (
                <option key={biere.id} value={biere.id}>{biere.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="commandeSelect">Sélectionnez une commande</label>
            <select
              id="commandeSelect"
              className="form-control"
              value={selectedCommande}
              onChange={(e) => setSelectedCommande(e.target.value)}
            >
              <option value="">Choisissez une commande</option>
              {commandesList.map(commande => (
                <option key={commande.id} value={commande.id}>{commande.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary mt-2">Ajouter</button>
        </form>
      </div>
      <div className="row">
        {bieresCommandes.map(biereCommande => {
          return (
            <div className="col-md-3 mb-4" key={biereCommande.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">Bière : {getBiereName(biereCommande.biere_id)}</h3>
                  <p className='description'>
                    N° de commande : {getCommandeName(biereCommande.commande_id)}<br/>
                  </p>
                  <p className="card-text text-muted small">
                    <span className='position-absolute' style={{ right: 8, bottom: 8 }}>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={(event) => handleDelete(biereCommande.id, event)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BieresCommandesList;
