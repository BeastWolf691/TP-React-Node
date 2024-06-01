import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Commande = sequelize.define('Commande',{
    name: {
        type: DataTypes.STRING,
    },

    price: {
        type: DataTypes.FLOAT,
    },

    bar_id: {
        type: DataTypes.INTEGER,
    },

    date: {
        type: DataTypes.DATEONLY, // Utilisation de DATEONLY pour stocker uniquement la date sans l'heure
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('date');
            return rawValue ? rawValue.toISOString().split('T')[0] : null; // Formater la date en YYYY-MM-DD
        },
        set(value) {
            if (value) {
                this.setDataValue('date', value); // Stocker la date directement au format YYYY-MM-DD
            }
        }
    },

    status: {
        type: DataTypes.ENUM,
        values: ['en cours', 'fini'],
        allowNull: false,
        defaultValue: 'en cours',
    }

});
 
export default Commande;