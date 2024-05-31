import { useEffect, useState } from 'react';
import { fetchBieres, deleteBiere } from '../apiClient.js';
// import StarRating from '../components/StarRating.jsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { ROUTE_BIEREFORM_DYNAMIC } from '../constante';

const BieresList = () => {
  const [BieresList, setBieres] = useState([]);

  useEffect(() => {
    const loadBieres = async () => {
      const bieresData = await fetchBieres();
      setBieres(bieresData);
    };
    loadBieres();
  }, []);

  const handleDelete = async (id) => {
    e.preventDefault();
    await deleteBiere(id);
    setBieres(BieresList.filter(BieresList => BieresList.id !== id));
  };

  return (
    <div className="container my-4">
      <div className="row">
        {BieresList.map(BieresList => (
          <div className="col-md-3 mb-4" key={BieresList.id}>
            <Link to={`${ROUTE_BIEREFORM_DYNAMIC.replace(':id',BieresList.id)}`} className="card h-100">
              {/* <div className="text-center"><StarRating rating={biere.rating} /></div> */}
              <div className="card-body">
                <h5 className="card-title">{BieresList.name}</h5>
                <p className="card-text text-muted small">
                  <br />
                  <span className='position-absolute' style={{ right: 8, bottom: 8 }} >
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(event) => handleDelete(BieresList.id, event)}
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

export default BieresList;
