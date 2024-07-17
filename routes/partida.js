const express = require('express');
const router = express.Router();
const Partida = require('../models/Partida');
const Torneio = require('../models/Torneio');

router.get('/add/:id', (req, res) => {
    res.render('partida/add', {id: req.params.id});
})

router.post('/add', (req, res) => {
    Partida.create({
        time1: req.body.time1,
        time2: req.body.time2,
        status: 0,
        ponto1: 0,
        ponto2: 0,
        faltas1: 0,
        faltas2: 0,
        tempo: 15,
        qtd: req.body.qtd,
        torneio_id: req.body.torneio_id,
    }).then(function(){
        req.flash('success_msg', 'Partida criada com sucesso.');
        res.redirect('/torneio/view/'+req.body.torneio_id);
    })
})

router.get('/gerenciar/:id', (req, res) => {
    Partida.findByPk(req.params.id, {
        include:{
                model: Torneio
            }
    }).then(function(partida){
        //partida.status = 1;
        //partida.save().then(function(){
        //req.flash('danger_msg', 'Já existe uma partida em andamento.');
        res.render('partida/gerenciar', {partida: partida});
        //})
    })
})

router.post('/pontuar', (req, res) => {
    Partida.findByPk(req.body.id).then(function(partida){
        partida.ponto1 = req.body.ponto1;
        partida.ponto2 = req.body.ponto2;
        partida.faltas1 = req.body.faltas1;
        partida.faltas2 = req.body.faltas2;
        partida.tempo = req.body.tempo;

        partida.save().then(()=>{
            req.flash('success_msg', 'Placar alterado com sucesso')
            res.redirect('/partida/gerenciar/'+partida.id);
        })
    })
})

router.get('/iniciar/:id', (req, res) => {
    Partida.findOne({
        where: {
            status: 1
        }
    }).then(function(partida){
        if(!partida){
            Partida.findByPk(req.params.id, {
                include:{
                    model: Torneio
                }
            }).then(function(partida){
                partida.status = 1
                partida.save().then(function () {
                    res.redirect('/partida/gerenciar/'+partida.id);
                })
            })
        }else{
            req.flash('success_msg', 'Já existe uma partida em andamento!')
            res.redirect('/partida/gerenciar/'+req.params.id);
        }
    })

})

router.get('/pausar/:id', (req, res) => {
    Partida.findByPk(req.params.id, {
        include:{
            model: Torneio,
        }
    }).then(function(partida){
        partida.status = 2
        partida.save().then(function () {
            res.redirect('/partida/gerenciar/'+partida.id);
        })
    })
})

router.get('/atualizar/:id', (req, res) => {
    Partida.findByPk(req.params.id).then(partida => {
        res.json(partida);
    })
})


module.exports = router;