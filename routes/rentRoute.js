const express = require("express");
const router = express.Router();

const rentsController = require("../controllers/rentController");
const {authenticateToken} = require('../middlewares/authMiddleware');

router.get('/rent/:id', authenticateToken, rentsController.Get.singleRent)
router.delete('/rent/:id', authenticateToken, rentsController.Delete.singleRent)
router.put('/rent/:id', authenticateToken, rentsController.Put.singleRent)

router.get('/rents', authenticateToken, rentsController.Get.allRent)
router.post('/rents', authenticateToken, rentsController.Post.allRent)



module.exports = router