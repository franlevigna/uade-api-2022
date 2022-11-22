const express = require('express')
const router = express.Router()
const subscriptionsController = require('../controllers/subscription');
const Authorization = require('../helpers/auth');


router.post('/create', Authorization, subscriptionsController.create);
router.patch('/update/:id', Authorization, subscriptionsController.update);

module.exports = router;