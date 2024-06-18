const express = require('express');
const { signUp,logIn,updateProfile } = require('../Controller/userController');
const uploadImage = require('../Middleware/multer');
const router = express.Router();

router.post('/signup',signUp);
router.post('/login',logIn);
router.post('/updateProfile',uploadImage,updateProfile);

module.exports = router;