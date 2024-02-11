const express = require("express");
const router = express.Router();

const roleController = require("../controllers/roleController");
const {authenticateToken} = require('../middlewares/authMiddleware');

router.post('/role', authenticateToken, roleController.Post.singleRole)
router.put('/role/:id', authenticateToken, roleController.Put.singleRole)
router.delete('/role/:id', authenticateToken, roleController.Delete.singleRole)
router.get('/role/:id', authenticateToken, roleController.Get.singleRole)

router.get('/roles', authenticateToken, roleController.Get.allRoles)


module.exports = router