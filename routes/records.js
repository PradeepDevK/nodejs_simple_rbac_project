const express = require('express');
const router = express.Router();
const { checkPermission } = require('../middlewares/rbacMiddleware');
const { init, getAllRecords, createRecord, updateRecord, deleteRecord } = require('../controllers/recordController');
const Permissions = require('../models/permissions');

//Controller
router.get('/init', init);
router.get('/', checkPermission('read_record'), getAllRecords);
router.post('/', checkPermission('create_record'), createRecord);
router.put('/:id', checkPermission('update_record'), updateRecord);
router.delete('/:id', checkPermission('delete_record'), deleteRecord);

module.exports = router;