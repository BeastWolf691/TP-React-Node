import React, { useEffect, useState } from 'react';
import { fetchBieresCommandes, deleteBiereFromCommande } from '../apiClient.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const BieresCommandesList = () => {
    const [bieresCommandes, setBieresCommandes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bieresCommandesData = await fetchBieresCommandes();
                setBieresCommandes(bieresCommandesData);
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

    return (
        <div className="container my-4">
            <div className="row">
                {bieresCommandes.map(biereCommande => (
                    <div className="col-md-3 mb-4" key={biereCommande.id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h3 className="card-title">Bière : {biereCommande.biere_id}</h3>
                                <p className='description'>
                                    {/* Ajoutez ici d'autres informations sur la bière */}
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
