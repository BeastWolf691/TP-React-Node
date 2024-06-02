import React, { useEffect, useState } from 'react';
import { fetchCommandes, deleteCommande, updateCommandeStatus } from '../apiClient.js';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ROUTE_COMMANDEFORM_DYNAMIC } from '../constante';

const CommandesList = () => {
  const [commandesList, setCommandesList] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commandesData = await fetchCommandes();
        setCommandesList(commandesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCommande(id);
      setCommandesList(commandesList.filter(commande => commande.id !== id));
    } catch (error) {
      console.error('Failed to delete commande:', error);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'en cours' ? 'fini' : 'en cours';
    try {
      await updateCommandeStatus(id, newStatus);
      setCommandesList(commandesList.map(commande =>
        commande.id === id ? { ...commande, status: newStatus } : commande
      ));
    } catch (error) {
      console.error('Failed to update commande status:', error);
    }
  };

  const getBarName = (barId) => {
    const bar = barsList.find(bar => bar.id === barId);
    return bar ? bar.name : 'Unknown';
  };

  const filteredCommandes = statusFilter === 'all'
    ? commandesList
    : commandesList.filter(commande => commande.status === statusFilter);

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between mb-4">
        <div>
          <label className="form-label me-2">Filtrer par statut : </label>
          <select
            className="form-select d-inline-block w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous</option>
            <option value="en cours">En cours</option>
            <option value="fini">Fini</option>
          </select>
        </div>
        <Link to={ROUTE_COMMANDEFORM_DYNAMIC} className="btn btn-primary">Ajouter une Commande</Link>
      </div>
      <div className="row">
        {filteredCommandes.map(commande => (
          <div className="col-md-3 mb-4" key={commande.id}>
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Commande : {commande.id}</h3>
                <p className='description'>
                  Nom : {commande.name}<br />
                  Prix : {commande.price}€<br />
                  {/* Ajoutez ici le reste des informations */}
                  Status : {commande.status}<br />
                </p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleStatusToggle(commande.id, commande.status)}
                  >
                    Basculer statut
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(commande.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommandesList;
