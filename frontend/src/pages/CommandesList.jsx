import { useEffect, useState } from 'react';
import { fetchCommandes, deleteCommande, fetchBieres, fetchBars } from '../apiClient.js';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ROUTE_COMMANDEFORM_DYNAMIC } from '../constante';

const CommandesList = () => {
  const [commandesList, setCommandes] = useState([]);
  const [bieresList, setBieres] = useState([]);
  const [barsList, setBars] = useState([]);

  useEffect(() => {
    const loadCommandesAndBieresAndBars = async () => {
      const commandesData = await fetchCommandes();
      const bieresData = await fetchBieres();
      const barsData = await fetchBars();
      setCommandes(commandesData);
      setBieres(bieresData);
      setBars(barsData);
    };
    loadCommandesAndBieresAndBars();
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    await deleteCommande(id);
    setCommandes(commandesList.filter(commande => commande.id !== id));
  };

  const getBiereDetails = (biereId) => {
    const biere = bieresList.find(biere => biere.id === biereId);
    if (biere) {
      return { name: biere.name, price: biere.price };
    }
    console.error(`Bière avec ID ${biereId} non trouvée`);
    return { name: 'Unknown', price: 'Unknown' };
  };

  const getBarName = (barId) => {
    const bar = barsList.find(bar => bar.id === barId);
    return bar ? bar.name : 'Unknown';
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-end mb-4">
        <Link to={ROUTE_COMMANDEFORM_DYNAMIC} className="btn btn-primary">Ajouter une Commande</Link>
      </div>
      <div className="row">
        {commandesList.map(commande => {
          const biereDetails = getBiereDetails(commande.biere_id);
          return (
            <div className="col-md-3 mb-4" key={commande.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">Commande : {commande.id}</h3>
                  <p className='description'>
                    Nom de la Bière : {biereDetails.name}<br/>
                    Prix : {biereDetails.price}€<br/>
                    Nom du Bar : {getBarName(commande.bar_id)}<br/>
                  </p>
                  <p className="card-text text-muted small">
                    <br />
                    <span className='position-absolute' style={{ right: 8, bottom: 8 }} >
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={(event) => handleDelete(commande.id, event)}
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

export default CommandesList;
