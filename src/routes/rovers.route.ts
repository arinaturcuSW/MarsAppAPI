const express = require('express');
const roversController = require('../controllers/rovers.controller');

const router = express.Router();

router.get('/', roversController.getRovers);
router.get('/cameras', roversController.getCameras);
router.get('/names', roversController.getRoverNames);
router.get('/:roverName/photos/:cameraType?', roversController.getRoverPhotos);

const db = require('../queries');
router.get('/users', db.getUsers)

module.exports = router;
