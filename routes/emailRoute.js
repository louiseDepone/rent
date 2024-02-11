const express = require("express");
const router = express.Router();

const emailController = require("../controllers/emailController");
const {authenticateToken} = require('../middlewares/authMiddleware');

router.get('/emailApproval', authenticateToken, emailController.sendEmail)



module.exports = router