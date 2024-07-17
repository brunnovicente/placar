const express = require('express');
const router = express.Router();
const Torneio = require('../models/Torneio');
const Partida = require('../models/Partida');

router.get('/add', (req, res) => {
    res.render('torneio/add');
})

router.post('/add', (req, res) => {
    Torneio.create({
        descricao: req.body.descricao,
        data: req.body.data,
        tipo: req.body.tipo,
        status: 1,
    }).then(function(){
        req.flash('success_msg', 'Torneio cadastrado com sucesso!')
        res.redirect('/')
    }).catch(function(err){
        req.flash(err)
        res.redirect('/')
    })
})

router.get('/view/:id', (req, res) => {
    Torneio.findByPk(req.params.id).then(function(torneio){
        Partida.findAll({
            where: {
                torneio_id: req.params.id,
            },
            include: Torneio,
        }).then(function(partidas){
            res.render('torneio/view', {torneio: torneio, partidas: partidas});
        })
    })
})



module.exports = router;