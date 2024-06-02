import React, { useEffect, useState } from 'react';
import { fetchBieresCommandes, deleteBiereFromCommande, fetchBiere } from '../apiClient.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const BieresCommandesList = () => {
    const [bieresCommandes, setBieresCommandes] = useState([]);
    const [bieresDetails, setBieresDetails] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bieresCommandesData = await fetchBieresCommandes();
                setBieresCommandes(bieresCommandesData);

                // Fetch details for each biere in the bieresCommandesData
                const bieresIds = bieresCommandesData.map(biereCommande => biereCommande.biere_id);
                const bieresDetailsPromises = bieresIds.map(id => fetchBiere(id));
                const bieresDetailsData = await Promise.all(bieresDetailsPromises);

                // Create a dictionary with biere_id as the key and biere details as the value
                const bieresDetailsDict = bieresDetailsData.reduce((acc, biere) => {
                    acc[biere.id] = biere;
                    return acc;
                }, {});

                setBieresDetails(bieresDetailsDict);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteBiereFromCommande = async (biereCommandeId) => {
        try {
            await deleteBiereFromCommande(biereCommandeId);
            setBieresCommandes(bieresCommandes.filter(biereCommande => biereCommande.id !== biereCommandeId));
        } catch (error) {
            console.error('Failed to delete biere from commande:', error);
        }
    };

    const getBiereName = (biereId) => {
        console.log(bieresDetails);
        return bieresDetails[biereId] ? bieresDetails[biereId].name : 'Loading...';
    };

    return (
        <div className="container my-4">
            <div className="row">
                {bieresCommandes.map(biereCommande => (
                    <div className="col-md-3 mb-4" key={biereCommande.id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h3 className="card-title">Bière : {getBiereName(biereCommande.biere_id)}</h3>
                                
                                <p className='description'>
                                    {/* Vous pouvez ajouter d'autres détails de la bière ici */}
                                </p>
                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteBiereFromCommande(biereCommande.id)}
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

export default BieresCommandesList;
