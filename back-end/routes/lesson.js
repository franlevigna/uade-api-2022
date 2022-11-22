const express = require('express')
const router = express.Router()
const lessonsController = require('../controllers/lesson');
const Authorization = require('../helpers/auth');

//Public
router.get('/search', lessonsController.search);

//Private
router.post('/create', Authorization, lessonsController.create);
router.patch('/update/:id', Authorization, lessonsController.update);
router.delete('/delete/:id', Authorization, lessonsController.delete);
router.get('/user/:userId', Authorization, lessonsController.getLessonsByUser);
router.get('/:id', Authorization, lessonsController.getLessonByID);


module.exports = router;