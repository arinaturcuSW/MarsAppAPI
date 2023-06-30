const express = require('express');
const roversController = require('../controllers/rovers.controller');

const router = express.Router();

router.get('/', roversController.getRovers);
router.get('/:roverName/photos/:cameraType', roversController.getRoverPhotos);

module.exports = router;
