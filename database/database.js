const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas','root','skyweb7',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;