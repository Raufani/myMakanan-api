const dataRestorant = require('./../models/restorant');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('./cors');

const restorantRouter = express.Router();
restorantRouter.use(bodyParser.json());

// localhost:3000/dish
restorantRouter.route('/')
.options(cors.corsWithOption, (req, res) => {res.sendStatus(200);})
.get(cors.cors,(req, res, next) => {
    dataRestorant.find({}).then(dataRestorant => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dataRestorant);
    }, error => next(error))
    .catch(err=> next(err));
})
.post(cors.corsWithOption,(req, res, next) => {
    let newdataRestorant = dataRestorant(req.body);
    newdataRestorant.save().then(dataRestorant => {
        console.log("data smk created");

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dataRestorant);
    }, error => next(error))
    .catch(err=> next(err));
})
.put(cors.corsWithOption,(req, res, next) => {
    res.statusCode = 403;
    res.end('Put not supported');
})
.delete(cors.corsWithOption,(req, res, next) => {
    dataRestorant.remove({})
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, error => next(error))
    .catch(err=> next(err));
})

// localhost:3000/dish/{id}
restorantRouter.route('/:makananId')
.get((req, res, next) => {
    dataRestorant.findById({_id: req.params.makananId})
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
    dataRestorant.findByIdAndUpdate(req.params.makananId, {
        $set: req.body
    }, {new: true})
    .then(dataRestorant => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dataRestorant);
    }, error => next(error))
    .catch(err=> next(err));
})
.delete((req, res, next) => {
    dataRestorant.findByIdAndRemove(req.params.makananId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, error => next(error))
    .catch(err=> next(err));
});

module.exports = restorantRouter;