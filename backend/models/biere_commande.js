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
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Par défaut, la quantité est 1
    },
});

export default Biere_commande;
