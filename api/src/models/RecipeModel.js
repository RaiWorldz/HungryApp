const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,      
      defaultValue: DataTypes.UUIDV4,    
      allowNull: false,
      primaryKey : true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    summary: {
      type : DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.STRING
    },
    analyzedInstructions: {
      type : DataTypes.TEXT,
    }, 
   }, {
      timestamps: false,
      created: true
  });
};
