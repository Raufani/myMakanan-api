const dataWilayah = require('./../models/wilayah');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('./cors');

const wilayahRouter = express.Router();
wilayahRouter.use(bodyParser.json());

// localhost:3000/dish
wilayahRouter.route('/')
.options(cors.corsWithOption, (req, res) => {res.sendStatus(200);})
.get(cors.cors,(req, res, next) => {
    dataWilayah.find({}).then(dataWilayah => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dataWilayah);
    }, error => next(error))
    .catch(err=> next(err));
})
.post(cors.corsWithOption,(req, res, next) => {
    let newdataWilayah = dataWilayah(req.body);
    newdataWilayah.save().then(dataWilayah => {
        console.log("data smk created");

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dataWilayah);
    }, error => next(error))
    .catch(err=> next(err));
})
.put(cors.corsWithOption,(req, res, next) => {
    res.statusCode = 403;
    res.end('Put not supported');
})
.delete(cors.corsWithOption,(req, res, next) => {
    dataWilayah.remove({})
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, error => next(error))
    .catch(err=> next(err));
})

// localhost:3000/dish/{id}
wilayahRouter.route('/:makananId')
.get((req, res, next) => {
    dataWilayah.findById({_id: req.params.makananId})
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
    dataWilayah.findByIdAndUpdate(req.params.makananId, {
        $set: req.body
    }, {new: true})
    .then(dataWilayah => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dataWilayah);
    }, error => next(error))
    .catch(err=> next(err));
})
.delete((req, res, next) => {
    dataWilayah.findByIdAndRemove(req.params.makananId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, error => next(error))
    .catch(err=> next(err));
});

module.exports = wilayahRouter;