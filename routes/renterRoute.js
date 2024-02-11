const express = require("express");
const router = express.Router();

const renterController = require("../controllers/renterController");
const {authenticateToken} = require('../middlewares/authMiddleware');

router.get('/renters', authenticateToken, renterController.Get.getallRenter)



module.exports = router