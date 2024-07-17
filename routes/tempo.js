const express = require('express');
const {sequelize, Op} = require('sequelize');
const router = express.Router();
const Torneio = require('../models/Torneio')
const Partida = require('../models/Partida')

router.get('/add/:id', (req, res) => {
    Partida.findByPk(req.params.id,{
        include:{
            model:Torneio
        }
    }).then((partida) => {
        res.render('tempo/add',{partida: partida});
    })
})

router.post('/add', (req, res) => {
    Tempo.create({
        descricao: req.body.descricao,
        tempo: req.body.tempo,
        partida_id: req.body.partida_id,
        status:0
    }).then(function () {
        Partida.findByPk(req.body.partida_id, {
            include:{
                model:Torneio
            }
        }).then(function (partida) {
            req.flash('success_add', 'Tempo adicionado com sucesso!');
            res.redirect('/partida/gerenciar/'+partida.id)
        })
    })
})

router.get('/iniciar/:id', (req, res) => {
    Tempo.findOne({
        where:{
            status: {
                [Op.in]:[1,2]
            }
        },
        include:{
            model:Partida
        }
    }).then(function (tempo) {
        if(tempo){
            req.flash('error_msg', 'Já existe um tempo em andamento');
            res.redirect('/torneio/view/'+tempo.partida.torneio_id);
        }else{
            Tempo.findByPk(req.params.id, {
                include:{
                    model: Partida,
                }
            }).then(function(tempo){
                tempo.status = 1
                tempo.save().then(function () {
                    req.flash('success_add', 'Tempo iniciado com sucesso!');
                    res.redirect('/partida/gerenciar/'+tempo.partida.id);
                })
            })
        }
    })
})

router.get('/pausar/:id', (req, res) => {
    Tempo.findByPk(req.params.id, {
        include:{
            model: Partida,
        }
    }).then(function(tempo){
        tempo.status = 2
        tempo.save().then(function () {
            res.redirect('/partida/gerenciar/'+tempo.partida.id);
        })
    })
})

router.get('/reiniciar/:id', (req, res) => {
    Tempo.findByPk(req.params.id, {
        include:{
            model: Partida,
        }
    }).then(function(tempo){
        tempo.status = 1
        tempo.save().then(function () {
            res.redirect('/partida/gerenciar/'+tempo.partida.id);
        })
    })
})

router.get('/finalizar/:id', (req, res) => {
    Tempo.findByPk(req.params.id).then(function(tempo){
        tempo.save({
            status: 2
        }).then(function () {
            res.redirect('/principal/placar');
        })
    })
})

router.get('/atualizar/:id', (req, res) => {
    Tempo.findOne({
        where:{
            status:{
                [Op.in]:[1,2]
            }
        },
        include:{
            model:Partida,
            include:{
                model:Torneio
            }
        }
    }).then(function(tempo){
        res.json(tempo)
    })
})

module.exports = router;