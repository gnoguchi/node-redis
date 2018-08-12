'use strict';
const Person = require('../config/db');


module.exports = new class PersonModel {

    getAll() {
        return Person.find();
    }

    getById(id) {
        return Person.findById(id);
    }

    create(person) {
        return Person.create(person);
    }

    update(id, person) {
        return Person.findByIdAndUpdate(id, person, { new: true });
    }

    delete(id) {
        return Person.findByIdAndRemove(id);
    }

}
