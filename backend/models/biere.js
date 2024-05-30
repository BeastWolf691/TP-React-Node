import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Bar from './bar.js';

const Biere = sequelize.define('Biere',{
    name: {
        type: DataTypes.STRING,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull:false
    },

    degree: {
        type: DataTypes.FLOAT,
    },

    price: {
        type: DataTypes.FLOAT,
        min:(0),
    },

    bar_id: {
        type: DataTypes.INTEGER,
    },
    rating: {
        type: DataTypes.FLOAT,

    }

});
Biere.belongsTo(Bar, { foreignKey: 'bar_id' });//biere appartien a au moins 1 bar
Bar.hasMany(Biere, { foreignKey: 'bar_id' });//un bar a plusieurs biere

export default Biere;