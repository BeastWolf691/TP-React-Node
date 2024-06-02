import { useEffect, useState } from 'react';
import { fetchCommandes, deleteCommande, fetchBars } from '../apiClient.js';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ROUTE_COMMANDEFORM_DYNAMIC } from '../constante';

const CommandesList = () => {
  const [commandesList, setCommandesList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [commandesData, barsData] = await Promise.all([fetchCommandes(), fetchBars()]);
        setCommandesList(commandesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    loadData();
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      await deleteCommande(id);
      setCommandesList(commandesList.filter(commande => commande.id !== id));
    } catch (error) {
      console.error('Failed to delete commande:', error);
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-end mb-4">
        <Link to={ROUTE_COMMANDEFORM_DYNAMIC} className="btn btn-primary">Ajouter une commande</Link>
      </div>
      <div className="row">
          {commandesList.map(commande => (
            <div className="col-md-3 mb-4" key={commande.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">Nom : {commande.name}</h3>
                  <p className='description'>
                    Prix : {commande.price}€<br/>
                    Bar : {commande.bar_id}<br/>
                    Date : {commande.date}<br/>
                    Statut : {commande.status}<br/>
                  </p>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(event) => handleDelete(commande.id, event)}
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
