const { DataTypes , Sequelize} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name:{

      type: DataTypes.STRING,
      allowNull: false,

    },
    description :{

      type: DataTypes.STRING,
      allowNull: false,

    },

    released:{

      type: DataTypes.DATE,
      allowNull: false,

    },

    rating : {

      type: DataTypes.DECIMAL,
      allowNull: false,

    },

    createInDb : {
      type: DataTypes.DATEONLY,
      allowNull: false,

    }

  });
};