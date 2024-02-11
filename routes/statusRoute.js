const express = require("express");
const router = express.Router();

const statusController = require("../controllers/statusController");
const {authenticateToken} = require('../middlewares/authMiddleware');

router.post('/status', authenticateToken, statusController.Post.singleStatus)
router.put('/status/:id', authenticateToken, statusController.Put.singleStatus)
router.delete('/status/:id', authenticateToken, statusController.Delete.singleStatus)
router.get('/status/:id', authenticateToken, statusController.Get.singleStatus)

router.get('/statuss', authenticateToken, statusController.Get.allStatuss)


module.exports = router