const express = require("express");
const { getNewArrival } = require("../controller/homeController");
const router = express.Router();

// getting the controller
const { signUp, getUsers, login, forgotPassword, passwordReset, getLoggedInUser, updateUser, deleteUser, updateProfile } = require("../controller/userController");
const { auth } = require("../middleware/auth");
const { shipping, getAllShipping, getSingleShippingDetails } = require("../controller/shippingController");

router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/forgotPassword').post(forgotPassword);
router.route('/password-reset/:token').post(passwordReset);

router.route('/').get(auth, getUsers);
router.route('/getloggedinuser').get(auth, getLoggedInUser);
router.route('/updateuser/:id').post(auth, updateUser);
router.route('/updateprofile/:id').post(auth, updateProfile);
router.route('/deleteuser/:id').get(auth, deleteUser);
router.route('/shipping').post(shipping);
router.route('/getallorders').get(getAllShipping);
router.route('/getsingleorder/:id').get(getSingleShippingDetails);

module.exports = router;