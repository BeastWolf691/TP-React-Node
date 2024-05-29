import React from 'react';
// import { Link } from 'react-router-dom';

const Manager = () => {
    return (
        <>
        <div className="manager">
            <div className="mgrSide mgrBar">
                <div className="mgrBarHead">
                    <button className="btnPlus addBar" id="addBar">Ajouter un bar</button>
                    <span className="mgrDescr">Un nouveau lieu de rencontres...</span>
                </div>
                <div className="mgrBarForm" id="formBar">
                    <form>
                        <label htmlFor="barName">Nom du bar</label>
                        <br />
                        <input type="text" name="barName" id="barName" required />
                        <br />
                        <label htmlFor="barAddress">Adresse</label>
                        <br />
                        <input type="text" name="barAddress" id="barAddress" required />
                        <br />
                        <label htmlFor="barPhone">Téléphone</label>
                        <br />
                        <input type="tel" name="barPhone" id="barPhone" />
                        <br />
                        <label htmlFor="barEmail">E-mail</label>
                        <br />
                        <input type="email" name="barEmail" id="barEmail" required />
                        <br />
                        <label htmlFor="barDescr">Adresse</label>
                        <br />
                        <input type="text" name="barDescr" id="barDescr" />
                        <br />
                        <button className="validBtn" method="post">Valider</button>
                    </form>
                </div>
            </div>
            <div className="mgrSide mgrOrder">
                <div className="mgrOrderHead">
                    <button className="btnPlus addOrder" id="addOrder">Ajouter une commande</button>
                    <span className="mgrDescr">Une nouvelle expérience...</span>
                </div>
                <div className="mgrOrderForm" id="formOrder">
                    <form>
                        <label htmlFor="orderName">Nom du client</label>
                        <br />
                        <input type="text" name="orderName" id="orderName" required />
                        <br />
                        <label htmlFor="orderPrice">Bière</label>
                        <br />
                        <input type="text" name="orderPrice" id="orderPrice" required />
                        <br />
                        <label htmlFor="orderBarId">Identifiant du bar</label>
                        <br />
                        <input type="number" name="orderBarId" id="orderBarId" />
                        <br />
                        <button className="validBtn" method="post">Valider</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
};

export default Manager;