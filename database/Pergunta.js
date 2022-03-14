//MODEL para perguntas
//model eh uma estrutura de dados que representa a tabela e se inicia com letra maiuscula

const Sequelize = require("sequelize");
const connection = require("./database");

/*
    tipo STRING = textos curtos
    tipo TEXT = textos longos
*/

//model Pergunta = 
const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false //impede que receba valores nulos ou vazios
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//passar o model para o banco de dados
//sync para sicronizar com o banco de dados
//force = se a tabela ja existe ela nao vai ser recriada
Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta;