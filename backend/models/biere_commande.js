import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Commande from "./commande.js";

const Biere_commande = sequelize.define('Biere_Commande',{
    biere_id: {
        type: DataTypes.INTEGER,
    },

    commande_id: {
        type: DataTypes.INTEGER,
    },

});
Biere_commande.belongsTo(Commande, { foreignKey: 'commande_id' }); // 'commande_id' est la clé étrangère dans la table BiereCommande

export default Biere_commande;