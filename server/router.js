const express = require('express');
var router = require('express').Router();
var controller = require('./controller.js')

router.get('/reviews', controller.getAll)

router.get('/reviews/meta', controller.getMeta)

router.post('/reviews', controller.post)

router.put('/reviews/:review_id/helpful', controller.helpful)

router.put('/reviews/:review_id/report', controller.report)

module.exports = router