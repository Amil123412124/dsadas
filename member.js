const Sequelize = require ('sequelize')
const sequelize = require('../utils/database')
const { Faces } = require('discord.js')

const Member = sequelize.define('member', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  guildId: {
    type: Sequelize.STRING,
    primaryKey: true
  }
});

module.exports = Member;
