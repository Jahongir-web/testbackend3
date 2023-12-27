const express = require('express');
const router = express.Router();

const carCtrl = require('../controller/carCtrl')

router.post('/', carCtrl.addCar)
router.get('/:id', carCtrl.getCarById)
router.get('/', carCtrl.getCars)

module.exports = router