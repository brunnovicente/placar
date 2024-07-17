const Sequelize = require('sequelize');

const sequelize = new Sequelize('placar', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
})

sequelize.authenticate().then(function (){
    console.log('Conectado ao banco com sucesso!.');
}).catch(function (error) {
    console.log('Falha na conexão: '+error);
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}