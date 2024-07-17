const express = require('express');
const {sequelize, Op} = require('sequelize');
const router = express.Router();
const Torneio = require('../models/Torneio');
const Partida = require('../models/Partida');

router.get('/', (req, res) => {

    Torneio.findAll().then(function(torneios){
        res.render('principal/index', {torneios: torneios});
    })

})

router.get('/placar/:id', (req, res) => {
    Partida.findByPk(req.params.id, {
        include:{
            model: Torneio
        }
    }).then(function(partida){
        res.render('principal/placar',{layout: 'placar', partida: partida});
    })

})

module.exports = router;