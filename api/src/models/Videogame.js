const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name:{

      type: DataTypes.STRING,
      allowNull: false,

    },
    image:{
      type: DataTypes.STRING,
      defaultValue: "https://w7.pngwing.com/pngs/162/799/png-transparent-the-sims-4-cats-dogs-the-sims-2-the-sims-social-others-miscellaneous-game-angle.png",
      allowNull: false,
    },
    description :{

      type: DataTypes.TEXT,
      allowNull: false,

    },
    
    released:{
      
      type: DataTypes.DATEONLY,
      allowNull: false,
      
    },
    
    rating : {
      
      type: DataTypes.DECIMAL,
      allowNull: false,
      
    },

    platform: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    
    createdByDB:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    }
    
  });

};