const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    productName: { type: 'string', required: true },
    price: { type: 'number', required: true}
});


const Record = new mongoose.model('Record', recordSchema);

module.exports = Record;