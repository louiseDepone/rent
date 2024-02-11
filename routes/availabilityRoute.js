const express = require("express");
const router = express.Router();

const availabilitysController = require("../controllers/availabilityController");
const {authenticateToken} = require('../middlewares/authMiddleware');

router.get('/availability/:id', authenticateToken, availabilitysController.Get.singleAvailability)
router.delete('/availability/:id', authenticateToken, availabilitysController.Delete.singleAvailability)
router.put('/availability/:id', authenticateToken, availabilitysController.Put.singleAvailability)

router.get('/availabilitys', authenticateToken, availabilitysController.Get.allAvailability)



module.exports = router