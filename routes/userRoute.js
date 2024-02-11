const express = require("express");
const router = express.Router();

const usersController = require("../controllers/userController");
const {authenticateToken} = require('../middlewares/authMiddleware');

router.get('/user/:id', authenticateToken, usersController.Get.singleUser)
router.delete('/user/:id', authenticateToken, usersController.Delete.singleUser)
router.put('/user/:id', authenticateToken, usersController.Put.singleUser)

router.get('/users', authenticateToken, usersController.Get.allUser)



module.exports = router