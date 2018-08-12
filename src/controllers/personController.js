'use strict';

const PersonModel = require('../model/personModel')

const redis = require('redis')
const client = redis.createClient()

exports.get = (req, res, next) => {

    client.get('allpersons', (err, reply) => {
        if (reply) {
            console.log('redis')
            res.send(reply)
        } else {
            console.log('db')
            PersonModel.getAll()
                .then((result) => {
                    client.set('allpersons', JSON.stringify(result))
                    client.expire('allpersons', 20)
                    res.status(200).send(result);
                }).catch(err => res.status(500).send(err))
        }
    })

};

exports.getById = (req, res, next) => {

    PersonModel.getById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        }).catch(err => res.status(500).send(err))
};

exports.post = (req, res, next) => {
    const person = req.body;

    PersonModel.create(person)
        .then((result) => {
            res.status(201).send(result);
        }).catch(err => res.status(500).send(err))
};

exports.put = (req, res, next) => {
    const person = req.body;

    PersonModel.update(req.params.id, person)
        .then((result) => {
            res.status(201).send(result);
        }).catch(err => res.status(500).send(err))
};

exports.delete = (req, res, next) => {
    PersonModel.delete(req.params.id)
        .then((result) => {
            res.status(200).send('delete succeeded!')
        }).catch(err => res.status(500).send(err))
};