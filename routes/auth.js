const express = require('express');
const router = express.Router();
const { signout, signup, signin, isSignedIn } = require('../controllers/auth')
const { check } = require('express-validator');
router.post('/signup', [
  check("name", "name should be 3 character").isLength({ min: 3 }),
  check("email", "email is required").isEmail(),
  check("password", "password must be atleast 6 char").isLength({ min: 6 })
], signup)

router.post('/signin', [
  check("email", "email is required").isEmail(),
  check("password", "password is required").isLength({ min: 1 })
], signin)

router.get('/signout', signout);

router.get("/testroute", isSignedIn, (req, res) => {
  res.send("a protected route")
})

module.exports = router
