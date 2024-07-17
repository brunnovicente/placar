const banco = require("./banco");
const Torneio = require("./Torneio");

const Partida = banco.sequelize.define("partidas", {
    time1: {
        type: banco.Sequelize.STRING,
    },
    time2: {
        type: banco.Sequelize.STRING,
    },
    ponto1: {
        type: banco.Sequelize.INTEGER,
    },
    ponto2: {
        type: banco.Sequelize.INTEGER,
    },
    status:{
        type: banco.Sequelize.INTEGER,
    },
    faltas1:{
        type: banco.Sequelize.INTEGER,
    },
    faltas2:{
        type: banco.Sequelize.INTEGER,
    },
    tempo:{
        type: banco.Sequelize.INTEGER,
    }
})

Partida.belongsTo(Torneio, {
    foreignKey: 'torneio_id',
    constraint: true,
})

Torneio.hasMany(Partida, {
    foreignKey: 'torneio_id',
})

Partida.sync()
module.exports = Partida