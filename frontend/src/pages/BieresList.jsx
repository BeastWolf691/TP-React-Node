import { useEffect, useState } from 'react';
import { fetchBieres, deleteBiere, fetchBars } from '../apiClient.js'; // Assurez-vous d'avoir une fonction fetchBars
// import StarRating from '../components/StarRating.jsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { ROUTE_BIEREFORM_DYNAMIC } from '../constante';

const BieresList = () => {
  const [BieresList, setBieres] = useState([]);
  const [BarsList, setBars] = useState([]);

  useEffect(() => {
    const loadBieresAndBars = async () => {
      const bieresData = await fetchBieres();
      const barsData = await fetchBars();
      setBieres(bieresData);
      setBars(barsData);
    };
    loadBieresAndBars();
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    await deleteBiere(id);
    setBieres(BieresList.filter(biere => biere.id !== id));
  };

  const getBarName = (barId) => {
    const bar = BarsList.find(bar => bar.id === barId);
    return bar ? bar.name : 'Unknown';
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-end mb-4">
        <Link to={ROUTE_BIEREFORM_DYNAMIC} className="btn btn-primary">Ajouter une Bière</Link>
      </div>
      <div className="row">
        {BieresList.map(biere => (
          <div className="col-md-3 mb-4" key={biere.id}>
            <div className="card h-100">
              {/* <div className="text-center"><StarRating rating={biere.rating} /></div> */}
              <div className="card-body">
                <h3 className="card-title">Nom : {biere.name}</h3>
                <p className='description'>
                Description : {biere.description}<br/>
                Degrès : {biere.degree}% vol<br/>
                Prix : {biere.price}€<br/>
                Bar : {getBarName(biere.bar_id)}<br/>
                {/* permet d'avoir directement le nom du bar qui s'affiche dans le récap de la biere en fonction de l'ID du bar renseigné */}
                </p>
                <p className="card-text text-muted small">
                  <br />
                  <span className='position-absolute' style={{ right: 8, bottom: 8 }} >
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(event) => handleDelete(biere.id, event)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BieresList;
