import { useEffect, useState } from 'react';
import { fetchBieres, deleteBiere } from '../apiClient';

const BieresList = () => {
  const [bieres, setBieres] = useState([]);

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
    setBieres(bieres.filter(biere => biere.id !== id));
  };

  return (
    <div className="container my-4">
      <div className="row">
        {bieres.map(biere => (
          <div className="col-md-3 mb-4" key={biere.id}>
            <Link to={'/biere/' + biere.id} className="card h-100">
              <div className="text-center"><StarRating rating={biere.rating} /></div>
              <div className="card-body">
                <h5 className="card-title">{biere.name}</h5>
                <p className="card-text text-muted small">
                  <br />
                  <span className='position-absolute' style={{ right: 8, bottom: 8 }} >
                    <Link>
                      <FontAwesomeIcon icon={faStar} />
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(event) => handleDelete(biere.id, event)}
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

export default ReviewsList;
