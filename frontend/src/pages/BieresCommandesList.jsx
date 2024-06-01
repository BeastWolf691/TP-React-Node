// import React, { useEffect, useState } from 'react';
// import { fetchBieresCommandes, deleteBiere_commande, fetchBieresc, fetchCommandes } from '../apiClient.js';
// // import StarRating from '../components/StarRating.jsx';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
// import { ROUTE_COMMANDEFORM_DYNAMIC } from '../constante';

// const BieresCommandesList = () => {
//     const [bieres_commandes, setBieresCommandes] = useState([]);
//     const [BieresList, setBieres] = useState([]);
//     const [CommandesList, setCommandes] = useState([]);

//     useEffect(() => {
//         const loadBieresCommandes = async () => {
//             const biere_commandesData = await fetchBieresCommandes();
//             const bieresData = await fetchBieresc();
//             const commandesData = await fetchCommandes();
//             setBieresCommandes(biere_commandesData);
//             setBieres(bieresData);
//             setCommandes(commandesData);
//         };

//         loadBieresCommandes();
//     }, []);

//     const handleDelete = async (id, e) => {
//         e.preventDefault();
//         await deleteBiere_commande(id);
//         setBieresCommandes(bieres_commandes.filter(biere => biere.id !== id));
//     };

//     const getBiereName = (biere_id) => {
//         const biere = BieresList.find(biere => biere.id === biere_id);
//         return biere ? biere.name : 'Unknown';
//     };

//     const getCommandeName = (commande_id) => {
//         const commande = CommandesList.find(commande => commande.id === commande_id);
//         return commande ? commande.name : 'Unknown';
//     };

//     return (
//         <div className="container my-4">
//             <div className="d-flex justify-content-end mb-4">
//             </div>Suivi des bières
//             <div className="row">
//                 {bieres_commandes.map(biere_commande => (
//                     <div className="col-md-3 mb-4" key={biere_commande.id}>
//                         <div className="card h-100">
//                             <div className="text-center">
//                                 {/* <StarRating rating={bar.rating} /> */}
//                             </div>
//                             <div className="card-body">
//                                 <h3 className="card-title"></h3>
//                                 <p className='description'>
//                                     Nom : {getBiereName(biere_commande.biere_id)}<br />
//                                     N° de commande : {getCommandeName(biere_commande.commande_id)}<br /></p>
//                                 <p className="card-text text-muted small">
//                                     <br />
//                                     <span className='position-absolute' style={{ right: 8, bottom: 8 }}>
//                                         <button
//                                             className="btn btn-danger btn-sm"
//                                             onClick={(event) => handleDelete(biere_commande.id, event)}
//                                         >
//                                             <FontAwesomeIcon icon={faTrash} />
//                                         </button>
//                                     </span>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default BieresCommandesList;