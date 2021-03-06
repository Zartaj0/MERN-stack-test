const express = require('express');
const router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth');
const {getUserById, getuser,updateUser,userPurchaseList} = require('../controllers/user');

router.param('userId',getUserById)

router.get("/user/:userId" ,isSignedIn, isAuthenticated , getuser)

router.put('/user/:userId',isSignedIn, isAuthenticated,updateUser)
router.get('/orders/user/:userId',isSignedIn, isAuthenticated,userPurchaseList)



module.exports = router
