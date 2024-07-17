const banco = require("./banco");

const Torneio = banco.sequelize.define("torneios", {
    descricao: {
        type: banco.Sequelize.STRING,
    },
    status: {
        type: banco.Sequelize.INTEGER,
    },
    data: {
        type: banco.Sequelize.DATE,
    },
    tipo:{
        type: banco.Sequelize.INTEGER,
    }
})

Torneio.sync()
module.exports = Torneio