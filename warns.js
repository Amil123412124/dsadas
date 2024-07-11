const Sequelize = require ('sequelize');
const sequelize = require ('../utils/database');

const Warn = sequelize.define('warns', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      guildId:{
        type: Sequelize.STRING,
        allowNull: false
      },
      userId:{
        type: Sequelize.STRING,
        allowNull: false
      }, 
      

      enforcerId:{
        type: Sequelize.STRING,
        allowNull: false
      }

});

module.exports = Warn;