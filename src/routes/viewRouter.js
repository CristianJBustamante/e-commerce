const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewController');

router.get('/home', viewsController.renderHome);
router.get('/realtimeproducts', viewsController.renderRealTimeProducts);

module.exports = router;
