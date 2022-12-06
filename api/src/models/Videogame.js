const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name:{

      type: DataTypes.STRING,
      allowNull: false,

    },
    description :{

      type: DataTypes.TEXT,
      allowNull: false,

    },

    release_date:{

      type: DataTypes.DATE,
      allowNull: false,

    },

    rating : {

      type: DataTypes.INTEGER,
      allowNull: false,

    },
    plataforms: {

      type: DataTypes.STRING,
      allowNull: false,

    },

  });
};