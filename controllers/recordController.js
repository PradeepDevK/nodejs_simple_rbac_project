const faker = require('faker');
const Records = require('../models/records');
const { Types } = require('mongoose');


exports.getAllRecords = async (req, res, next) => {
    try {
        const records = await Records.find();
        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createRecord = async (req, res, next) => {
    try {
        let { productName, price } = req.body;
        const newRecord = new Records({
            productName,
            price,
        });
        await newRecord.save();

        res.status(201).json(newRecord);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateRecord = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { productName, price } = req.body;
        const record = await Records.findOneAndUpdate({ _id: id }, {
            $set: {
                productName,
                price
            }
        }, { new: true });

        res.status(200).json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteRecord = async (req, res, next) => {
    let { id } = req.params;
    await Records.findOneAndDelete({ _id: id });

    res.status(200).json({ message: 'Record deleted' });
}

const generateRandomRecords = () => {
    const records = [];
    for (let i = 0; i < 10; i++) {
        const productName = faker.commerce.productName();
        const price = faker.commerce.price();
        records.push({ productName, price });
    }

    return records;
}

const insertRecords = async () => {
    try {
        const records = generateRandomRecords();
        await Records.insertMany(records);

        return true;
    } catch (err) {
        throw new Error(err);
    }
}

exports.init = async (req, res, next) => {
    try {
        await insertRecords();
        res.status(200).json({ message: 'Records inserted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}