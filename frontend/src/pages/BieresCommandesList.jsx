import React, { useEffect, useState } from 'react';
import { fetchBieresCommandes, fetchBieres, fetchCommandes, removeBiereFromCommande, addBiereToCommande } from '../apiClient.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ROUTE_BIERECOMMANDEFORM_DYNAMIC } from '../constante';

const BieresCommandesList = () => {
    const [bieresCommandes, setBieresCommandes] = useState([]);
    const [bieresList, setBieres] = useState([]);
    const [commandesList, setCommandes] = useState([]);
    const [selectedBiere, setSelectedBiere] = useState('');
    const [selectedCommande, setSelectedCommande] = useState('');

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

    const handleDelete = async (id, e) => {
        e.preventDefault();
        try {
            await removeBiereFromCommande(id);
            setBieresCommandes(bieresCommandes.filter(biereCommande => biereCommande.id !== id));
        } catch (error) {
            console.error('Failed to delete biereCommande:', error);
        }
    };

    const handleAddBiereToCommande = async () => {
        try {
            await addBiereToCommande(selectedBiere, selectedCommande);
            const updatedBieresCommandes = await fetchBieresCommandes();
            setBieresCommandes(updatedBieresCommandes);
        } catch (error) {
            console.error('Failed to add biere to commande:', error);
        }
    };

    const handleAddBiereToExistingCommande = async (commandeId) => {
        try {
            await addBiereToCommande(selectedBiere, commandeId);
            const updatedBieresCommandes = await fetchBieresCommandes();
            setBieresCommandes(updatedBieresCommandes);
        } catch (error) {
            console.error('Failed to add biere to commande:', error);
        }
    };

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

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-end mb-4">
                <Link to={ROUTE_BIERECOMMANDEFORM_DYNAMIC} className="btn btn-primary">Ajouter une Commande de biere</Link>
            </div>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <h4>Sélectionner une bière :</h4>
                    <select
                        className="form-select"
                        value={selectedBiere}
                        onChange={(e) => setSelectedBiere(e.target.value)}
                    >
                        <option value="">Sélectionner une bière</option>
                        {bieresList.map(biere => (
                            <option key={biere.id} value={biere.id}>{biere.name} (ID: {biere.id})</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6 mb-4">
                    <h4>Sélectionner une commande existante :</h4>
                    <select
                        className="form-select"
                        value={selectedCommande}
                        onChange={(e) => setSelectedCommande(e.target.value)}
                    >
                        <option value="">Sélectionner une commande</option>
                        {commandesList.map(commande => (
                            <option key={commande.id} value={commande.id}>
                                {commande.name} (ID: {commande.id})
                            </option>
                        ))}
                    </select>
                    <button className="btn btn-primary" onClick={handleAddBiereToExistingCommande}>
                        Ajouter Bière à la Commande
                    </button>
                </div>
            </div>
            <div className="row mt-4">
                {bieresCommandes.map(biereCommande => (
                    <div className="col-md-3 mb-4" key={biereCommande.id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h3 className="card-title">Bière : {getBiereName(biereCommande.biere_id)}</h3>
                                <p className='description'>
                                    Nom de commande : {getCommandeName(biereCommande.commande_id)}<br />
                                </p>
                                <p className="card-text text-muted small">
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteBiereFromCommande(biereCommande.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BieresCommandesList;
