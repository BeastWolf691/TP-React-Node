import React, { useEffect, useState } from 'react';
import { fetchBieresCommandes, fetchBieres, fetchCommandes, deleteBiereFromCommande } from '../apiClient.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ROUTE_BIERECOMMANDEFORM_DYNAMIC } from '../constante';

const BieresCommandesList = () => {
    const [bieresCommandes, setBieresCommandes] = useState([]);
    const [bieresList, setBieres] = useState([]);
    const [commandesList, setCommandes] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const bieresCommandesData = await fetchBieresCommandes();
                const bieresData = await fetchBieres();
                const commandesData = await fetchCommandes();
                setBieresCommandes(bieresCommandesData);
                setBieres(bieresData);
                setCommandes(commandesData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        loadData();
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
        const biere = bieresList.find(biere => biere.id === biereId);
        return biere ? biere.name : 'Inconnu';
    };

    const getCommandeName = (commandeId) => {
        const commande = commandesList.find(commande => commande.id === commandeId);
        return commande ? commande.name : 'Inconnu';
    };

    // Grouping bières by commande_id
    const groupedBieresCommandes = bieresCommandes.reduce((acc, biereCommande) => {
        if (!acc[biereCommande.commande_id]) {
            acc[biereCommande.commande_id] = [];
        }
        acc[biereCommande.commande_id].push(biereCommande);
        return acc;
    }, {});

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-end mb-4">
                <Link to={ROUTE_BIERECOMMANDEFORM_DYNAMIC} className="btn btn-primary">Ajouter une Commande de bière</Link>
            </div>
            <div className="row mt-4">
                {Object.keys(groupedBieresCommandes).map(commandeId => (
                    <div className="col-md-12 mb-4" key={commandeId}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h3 className="card-title">Commande : {getCommandeName(parseInt(commandeId, 10))}</h3>
                                <ul>
                                    {groupedBieresCommandes[commandeId].map(biereCommande => (
                                        <li key={biereCommande.id}>
                                            Bière : {getBiereName(biereCommande.biere_id)}
                                            <button
                                                className="btn btn-danger btn-sm ms-2"
                                                onClick={() => handleDeleteBiereFromCommande(biereCommande.id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BieresCommandesList;
