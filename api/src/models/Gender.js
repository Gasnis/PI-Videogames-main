const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('gender', {
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name:{
  
        type: DataTypes.STRING,
        allowNull: false,
  
      },
  
  })
  }