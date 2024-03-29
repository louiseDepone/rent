const express = require("express");
const router = express.Router();

const deviceController = require("../controllers/deviceController");
const {authenticateToken} = require('../middlewares/authMiddleware');

router.get('/device/:id', authenticateToken, deviceController.Get.singleDevice)
router.delete('/device/:id', authenticateToken, deviceController.Delete.singleDevice)
router.put('/device/:id', authenticateToken, deviceController.Put.singleDevice)

router.get('/devices', authenticateToken, deviceController.Get.allDevice)
router.post('/device', authenticateToken, deviceController.Post.singleDevice)



module.exports = router