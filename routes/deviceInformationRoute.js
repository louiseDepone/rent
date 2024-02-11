const express = require("express");
const router = express.Router();

const deviceInfromationController = require("../controllers/deviceInfromationController");
const {authenticateToken} = require('../middlewares/authMiddleware');

router.get('/deviceInfromations', authenticateToken, deviceInfromationController.Get.getallDeviceInformation)
router.get('/deviceInfromation/:id', authenticateToken, deviceInfromationController.Get.getSingleDeviceInformation)



module.exports = router