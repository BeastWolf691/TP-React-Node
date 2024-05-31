import React, { useEffect, useState } from 'react';
import { fetchBars, deleteBar } from '../apiClient.js';
import StarRating from '../components/StarRating.jsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons';

const BarsList = () => {
  const [bars, setBars] = useState([]);

  useEffect(() => {
    const loadBars = async () => {
      try {
        const barsData = await fetchBars(); // Correction mineure: `barsData` instead of `barsdata`
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
      <div className="row">
        {bars.map(bar => (
          <div className="col-md-3 mb-4" key={bar.id}>
            <Link to={'/bars/' + bar.id} className="card h-100">
              <div className="text-center">
                <StarRating rating={bar.rating} />
              </div>
              <div className="card-body">
                <h5 className="card-title">{bar.name}</h5>
                <p className="card-text text-muted small">
                  <br />
                  {bar.name}
                  <span className='position-absolute' style={{ right: 8, bottom: 8 }}>
                    <Link to={'/bars/' + bar.id}>
                      <FontAwesomeIcon icon={faStar} />
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(event) => handleDelete(bar.id, event)}
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

export default BarsList;