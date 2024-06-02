import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Commande from "./commande.js";

const Biere_commande = sequelize.define('Biere_Commande', {
    biere_id: {
        type: DataTypes.INTEGER,
    },
    commande_id: {
        type: DataTypes.INTEGER,
    },
});

export default Biere_commande;
