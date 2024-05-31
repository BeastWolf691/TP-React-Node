import { useEffect, useState } from 'react';
import { fetchCommandes, deleteCommande } from '../apiClient.js';
// import StarRating from '../components/StarRating.jsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { ROUTE_COMMANDEFORM_DYNAMIC } from '../constante';

const CommandesList = () => {
  const [CommandesList, setCommandes] = useState([]);

  useEffect(() => {
    const loadCommandes = async () => {
      const commandesData = await fetchCommandes();
      setCommandes(commandesData);
    };
    loadCommandes();
  }, []);

  const handleDelete = async (id) => {
    e.preventDefault();
    await deleteCommande(id);
    setCommandes(CommandesList.filter(CommandesList => CommandesList.id !== id));
  };

  return (
    <div className="container my-4">
      <div className="row">
        {CommandesList.map(CommandesList => (
          <div className="col-md-3 mb-4" key={CommandesList.id}>
            <Link to={`${ROUTE_COMMANDEFORM_DYNAMIC.replace(':id',CommandesList.id)}`} className="card h-100">
              {/* <div className="text-center"><StarRating rating={commande.rating} /></div> */}
              <div className="card-body">
                <h5 className="card-title">{CommandesList.name}</h5>
                <p className="card-text text-muted small">
                  <br />
                  <span className='position-absolute' style={{ right: 8, bottom: 8 }} >
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(event) => handleDelete(CommandesList.id, event)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommandesList;
