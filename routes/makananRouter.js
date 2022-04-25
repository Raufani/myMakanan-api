const dataMakanan = require('./../models/makanan');
const dataRestorant = require('./../models/restorant');
const dataWilayah = require('./../models/wilayah');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('./cors');

const makananRouter = express.Router();
makananRouter.use(bodyParser.json());

// localhost:3000/dish
makananRouter.route('/')
.options(cors.corsWithOption, (req, res) => {res.sendStatus(200);})
.get(cors.cors,(req, res, next) => {
    dataMakanan.find({})
    .populate({
        path: 'id_restorant',
        populate: {
            path: 'id_wilayah'
        }
    })

    .then(dataMakanan => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dataMakanan);
    }, error => next(error))
    .catch(err=> next(err));
})
.post(cors.corsWithOption,(req, res, next) => {
    let newdataMakanan = dataMakanan(req.body);
    newdataMakanan.save().then(dataMakanan => {
        console.log("data smk created");

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dataMakanan);
    }, error => next(error))
    .catch(err=> next(err));
})
.put(cors.corsWithOption,(req, res, next) => {
    res.statusCode = 403;
    res.end('Put not supported');
})
.delete(cors.corsWithOption,(req, res, next) => {
    dataMakanan.remove({})
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, error => next(error))
    .catch(err=> next(err));
})

// localhost:3000/dish/{id}
makananRouter.route('/:makananId')
.get((req, res, next) => {
    dataMakanan.findById({_id: req.params.makananId})
    .then(dish => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, error => next(error))
    .catch(err=> next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST not supported');
})
.put((req, res, next) => {
    dataMakanan.findByIdAndUpdate(req.params.makananId, {
        $set: req.body
    }, {new: true})
    .then(dataMakanan => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dataMakanan);
    }, error => next(error))
    .catch(err=> next(err));
})
.delete((req, res, next) => {
    dataMakanan.findByIdAndRemove(req.params.makananId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, error => next(error))
    .catch(err=> next(err));
});

module.exports = makananRouter;