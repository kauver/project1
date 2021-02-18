const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();


router.get('/', adminController.getIndex);

router.get('/add-share', adminController.getAddShare);

router.get('/edit-share/:shareId', adminController.getEditShare);

router.post('/add-share', adminController.postShare);

router.post('/edit-share', adminController.postEditShare);

router.get('/:shareId', adminController.getShare);

router.post('/delete', adminController.postDelete);

module.exports = router;
