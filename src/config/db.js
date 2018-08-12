const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db_employees');

var Schema = mongoose.Schema;

var personSchema = new Schema({
    name: String,
    mail: String,
    role: String
});


const Person = mongoose.model('Person', personSchema);
module.exports = Person;