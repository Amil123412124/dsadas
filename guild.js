const Sequelize = require ('sequelize')
const sequelize = require('../utils/database')
const { Faces } = require('discord.js')

const Guild = sequelize.define('guild', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  
  welcomeChannelId:{
    type: Sequelize.STRING,
    allowNull: true
  },
  welcomeRoleId: {
    type: Sequelize.STRING,
    allowNull: true

  },
  welcomeRoleId: {
    type: Sequelize.STRING,
    allowNull: true

  }

})







module.exports = Guild;