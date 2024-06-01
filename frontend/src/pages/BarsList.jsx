import React, { useEffect, useState } from 'react';
import { fetchBars, deleteBar } from '../apiClient.js';
// import StarRating from '../components/StarRating.jsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { ROUTE_BARFORM_DYNAMIC } from '../constante';

const BarsList = () => {
  const [bars, setBars] = useState([]);

  useEffect(() => {
    const loadBars = async () => {
      try {
        const barsData = await fetchBars();
        setBars(barsData);
      } catch (error) {
        console.error('Failed to fetch bars:', error);
      }
    };

    loadBars();
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      await deleteBar(id);
      setBars(bars.filter(bar => bar.id !== id));
    } catch (error) {
      console.error('Failed to delete bar:', error);
    }
  };

  return (
    <div className="container my-4">
            <div className="d-flex justify-content-end mb-4">
        <Link to={ROUTE_BARFORM_DYNAMIC} className="btn btn-primary">Ajouter un Bar</Link>
      </div>
      <div className="row">
        {bars.map(bar => (
          <div className="col-md-3 mb-4" key={bar.id}>
            <div className="card h-100">
              <div className="text-center">
                {/* <StarRating rating={bar.rating} /> */}
              </div>
              <div className="card-body">
                <h3 className="card-title">{bar.name}</h3>
                <p className='description'>
                {bar.address}<br/>
                {bar.tel}<br/>
                {bar.email}<br/>
                {bar.description}</p>
                <p className="card-text text-muted small">
                  <br />
                  <span className='position-absolute' style={{ right: 8, bottom: 8 }}>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(event) => handleDelete(bar.id, event)}
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

export default BarsList;