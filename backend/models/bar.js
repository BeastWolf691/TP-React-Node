import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
 
const Bar = sequelize.define('Bar',{
    name: {
        type: DataTypes.STRING,
        unique:true,
    },

    address: {
        type: DataTypes.STRING, 
    },

    tel: {
        type: DataTypes.STRING,
        allowNull:false
    },

    email: {
        type: DataTypes.STRING,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    rating: {
        type: DataTypes.FLOAT,

    }

});
 
export default Bar;