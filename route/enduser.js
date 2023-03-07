const express = require("express");
const { signUp, login, getSingleUser } = require("../controller/endUserController");
const router = express.Router();

// getting the controller
const { auth } = require("../middleware/auth");

router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/get-single-user/:email').get(getSingleUser);
// router.route('/forgotPassword').post(forgotPassword);
// router.route('/password-reset/:token').post(passwordReset);

// router.route('/').get(auth, getUsers);
// router.route('/getloggedinuser').get(auth, getLoggedInUser);
// router.route('/updateuser/:id').post(auth, updateUser);
// router.route('/deleteuser/:id').get(auth, deleteUser);   

module.exports = router;