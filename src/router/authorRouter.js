const express = require('express');
const router = express.Router();

const authorCtrl = require('../controller/authorCtrl')

router.post('/', authorCtrl.addAuthor)
router.get('/', authorCtrl.getAuthors)

module.exports = router